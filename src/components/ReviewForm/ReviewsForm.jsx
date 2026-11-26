import React, { useState } from 'react';
import '../../styles/journal.css';
import './ReviewsForm.css';
import useInViewOnce from '../../hooks/useInViewOnce';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ReviewsForm = () => {
    const [sectionRef, inView] = useInViewOnce();
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !comment) return;

        try {
            setSubmitting(true);
            setSubmitError(false);
            await addDoc(collection(db, 'reviews'), {
                rating,
                text: comment,               
                displayName: name,           
                userId: auth.currentUser?.uid || "anon",
                createdAt: serverTimestamp() 
            });

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);

            // limpiar formulario
            setName('');
            setRating(5);
            setComment('');
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
            setSubmitError(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section ref={sectionRef} className={`review-form-section journal-reveal ${inView ? "is-inview" : ""}`}>
            <div className="review-form-intro">
                <p className="reviews-script reveal-up">pull up a chair</p>
                <h2 className="reveal-up" style={{ "--rd": "0.1s" }}>Now it’s your turn.</h2>
                <p className="reveal-up" style={{ "--rd": "0.2s" }}>
                    Tried something from SOURAW? Leave a little note for the next
                    curious person at the table.
                </p>
            </div>

            {/* Paper card with washi tape; it settles in like the notes above. */}
            <div className="review-form-card journal-polaroid journal-polaroid--tilt-right journal-polaroid--yellow-tape" style={{ "--rd": "0.2s" }}>
                <form className="review-form" onSubmit={handleSubmit}>
                    <label htmlFor="review-name">Your name</label>
                    <input
                        id="review-name"
                        className="review-input"
                        type="text"
                        placeholder="Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="review-rating">Your rating</label>
                    <div className="selectWrap">
                        <select
                            id="review-rating"
                            className="select-stars"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            <option value={5}>★★★★★</option>
                            <option value={4}>★★★★☆</option>
                            <option value={3}>★★★☆☆</option>
                            <option value={2}>★★☆☆☆</option>
                            <option value={1}>★☆☆☆☆</option>
                        </select>
                    </div>

                    <label htmlFor="review-comment">Your love note</label>
                    <textarea
                        id="review-comment"
                        className="review-textarea"
                        placeholder="Review *"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />

                    <button className='review-button' type="submit" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Share my note'} <span aria-hidden="true">↗</span>
                    </button>
                </form>

                {submitted && (
                    <p className="review-success">Thank you for sharing your experience with us!</p>
                )}

                {submitError && (
                    <p className="review-error">Your note could not be sent. Please try again.</p>
                )}
            </div>
        </section>
    );
};

export default ReviewsForm;
