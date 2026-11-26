import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/journal.css';
import './ReviewsList.css';
import reviewImage from '../../assets/reviews.jpg'
import JournalMasthead from '../JournalMasthead/JournalMasthead';
import useInViewOnce from '../../hooks/useInViewOnce';

/* One review as a paper note: tilted left/right alternately, washi tape pink/yellow.
   It settles into place once, the first time it scrolls into view (journal.css). */
function ReviewNote({ review, index, formatDate, renderStars }) {
    const [ref, inView] = useInViewOnce();
    const even = index % 2 === 0;

    return (
        <div ref={ref} className={`review-note-scope journal-reveal ${inView ? 'is-inview' : ''}`}>
            <article
                className={`review-card journal-polaroid ${even ? 'journal-polaroid--tilt-left' : 'journal-polaroid--tilt-right journal-polaroid--yellow-tape'}`}
                style={{ '--rd': '0.05s' }}
            >
                <span className="review-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="review-stars" aria-label={`${review.rating || 0} out of 5 stars`}>
                    {renderStars(review.rating)}
                </div>
                <p className="review-comment">
                    “{review.text || review.comment}”
                </p>
                <p className="review-name">
                    {review.displayName || review.name || "Anónimo"}
                </p>
                {review.createdAt && (
                    <p className="review-date">{formatDate(review.createdAt)}</p>
                )}
            </article>
        </div>
    );
}

const ReviewsList = () => {
    const [headRef, headInView] = useInViewOnce();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReviews(data);
                setLoading(false);
                setLoadError(false);
            },
            () => {
                setLoading(false);
                setLoadError(true);
            }
        );

        return () => unsubscribe();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const renderStars = (rating) => {
        const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));
        return `${'★'.repeat(safeRating)}${'☆'.repeat(5 - safeRating)}`;
    };

    return (
        <>
            <section className="reviews-hero">
                <div className="reviews-hero-word" aria-hidden="true">LOVE</div>

                <div className="reviews-hero-copy">
                    <p className="reviews-script">love notes from the table</p>
                    <h1>
                        Baked. Tasted.
                        <span>Remembered.</span>
                    </h1>
                    <a href="#community-notes" className="reviews-pill reviews-pill-red">
                        Read the love notes <span aria-hidden="true">↓</span>
                    </a>
                </div>

                <div className="reviews-hero-visual">
                    <div className="reviews-photo-frame">
                        <img src={reviewImage} alt="A SOURAW community moment" />
                    </div>
                    <span className="reviews-sticker reviews-sticker-pink">made with love</span>
                    <span className="reviews-sticker reviews-sticker-yellow">community approved</span>
                </div>
            </section>

            <p className="photo-banner-summary">
                Real words from people who brought SOURAW home, shared it,
                and came back for another slice.
            </p>

            <section className="reviews-community" id="community-notes">
                <JournalMasthead
                    className="reviews-masthead"
                    left="Love notes"
                    center="Straight from the community"
                    right="Tampa"
                />

                <header ref={headRef} className={`reviews-community-header journal-reveal ${headInView ? 'is-inview' : ''}`}>
                    <p className="reviews-script reveal-up">straight from the community</p>
                    <h2 className="reveal-up" style={{ '--rd': '0.1s' }}>What people are saying.</h2>
                    <p className="reveal-up" style={{ '--rd': '0.2s' }}>No polished scripts. Just honest bites, feelings, and favorites.</p>
                </header>

                <div className="reviews-container">
                    {loading && (
                        <p className="reviews-status">Gathering the love notes...</p>
                    )}

                    {loadError && (
                        <p className="reviews-status">The love notes are resting. Please try again soon.</p>
                    )}

                    {!loading && !loadError && reviews.length === 0 && (
                        <p className="reviews-status">Be the first to leave a little love note.</p>
                    )}

                    {/* Newest first, flowing down the left column, then the right one (see CSS). */}
                    {reviews.map((review, index) => (
                        <ReviewNote
                            key={review.id}
                            review={review}
                            index={index}
                            formatDate={formatDate}
                            renderStars={renderStars}
                        />
                    ))}
                </div>
            </section>
        </>

    );
};

export default ReviewsList;
