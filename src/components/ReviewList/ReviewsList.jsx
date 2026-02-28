import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import './ReviewsList.css';
import PageBanner from '../PageBanner/PageBanner';
import reviewImage from '../../assets/reviews.jpg'

const ReviewsList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(data);
        });

        return () => unsubscribe();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString('es-VE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <PageBanner image={reviewImage} kicker="Love notes..." title="FROM OUR COMMUNITY" />
            <section className="reviews-section">
                <div className="reviews-container">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card" data-aos="zoom-in-up" data-aos-delay="100">
                            <h3 className="review-name">
                                {review.displayName || review.name || "Anónimo"}
                            </h3>
                            <div className="review-stars">
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <p className="review-comment">
                                {review.text || review.comment}
                            </p>
                            {review.createdAt && (
                                <p className="review-date">{formatDate(review.createdAt)}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>

    );
};

export default ReviewsList;