import React, { useState } from 'react';
import './ReviewsForm.css';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ReviewsForm = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !comment) return;

        try {
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
        }
    };

    return (
        <section className="reviews-section">
            <h2>Now it’s your turn — what do you think?</h2>
            <form className="review-form" onSubmit={handleSubmit}>
                <input
                    className="review-input"
                    type="text"
                    placeholder="Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={5}>★★★★★</option>
                    <option value={4}>★★★★☆</option>
                    <option value={3}>★★★☆☆</option>
                    <option value={2}>★★☆☆☆</option>
                    <option value={1}>★☆☆☆☆</option>
                </select>

                <textarea
                    className="review-textarea"
                    placeholder="Review *"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />

                <button className='review-button' type="submit">submit</button>
            </form>

            {submitted && (
                <p className="review-success">Thank you for sharing your experience with us</p>
            )}
        </section>
    );
};

export default ReviewsForm;