import React, { useState } from 'react';
import './ReviewsForm.css';
import { db, auth } from '../firebase';
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
                text: comment,               // 👈 el comentario se guarda en "text"
                displayName: name,           // 👈 el nombre se guarda en "displayName"
                userId: auth.currentUser?.uid || "anon", // 👈 UID del usuario anónimo
                createdAt: serverTimestamp() // 👈 fecha del servidor
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
            <h2>¿y tú?... ¿Qué piensas?</h2>
            <form className="review-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tu nombre"
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
                    placeholder="Tu comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />

                <button type="submit">enviar</button>
            </form>

            {submitted && (
                <p className="review-success">¡Gracias por tu reseña!</p>
            )}
        </section>
    );
};

export default ReviewsForm;