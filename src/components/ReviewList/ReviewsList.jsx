import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import './ReviewsList.css';
import reviewImage from '../../assets/reviews.jpg'

const ReviewsList = () => {
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

            <div className="reviews-ribbon" aria-hidden="true">
                <div>
                    <span>GOOD BREAD • KIND WORDS • FULL HEARTS • PASS THE SOURAW • </span>
                    <span>GOOD BREAD • KIND WORDS • FULL HEARTS • PASS THE SOURAW • </span>
                    <span>GOOD BREAD • KIND WORDS • FULL HEARTS • PASS THE SOURAW • </span>
                    <span>GOOD BREAD • KIND WORDS • FULL HEARTS • PASS THE SOURAW • </span>
                    <span>GOOD BREAD • KIND WORDS • FULL HEARTS • PASS THE SOURAW • </span>
                </div>
            </div>

            <section className="reviews-community" id="community-notes">
                <div className="reviews-outline-word" aria-hidden="true">NOTES</div>
                <header className="reviews-community-header">
                    <p className="reviews-script">straight from the community</p>
                    <h2>What people are saying.</h2>
                    <p>No polished scripts. Just honest bites, feelings, and favorites.</p>
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

                    {reviews.map((review, index) => (
                        <article key={review.id} className={`review-card review-card-${(index % 4) + 1}`}>
                            <span className="review-number">{String(index + 1).padStart(2, '0')}</span>
                            <h3 className="review-name">
                                {review.displayName || review.name || "Anónimo"}
                            </h3>
                            <div className="review-stars" aria-label={`${review.rating || 0} out of 5 stars`}>
                                {renderStars(review.rating)}
                            </div>
                            <p className="review-comment">
                                “{review.text || review.comment}”
                            </p>
                            {review.createdAt && (
                                <p className="review-date">{formatDate(review.createdAt)}</p>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </>

    );
};

export default ReviewsList;
