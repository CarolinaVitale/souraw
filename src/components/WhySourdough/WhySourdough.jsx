import React from 'react';
import './WhySourdough.css';
import image2 from '../../assets/back1.jpeg';
import image1 from '../../assets/back2.PNG';

const WhySourdough = () => {
    return (
        <section className="why-sourdough">
            {/* Desktop images */}
            <div className="image image-left desktop-only" style={{ backgroundImage: `url(${image1})` }}></div>
            <div className="image image-right desktop-only" style={{ backgroundImage: `url(${image2})` }}></div>

            {/* Mobile background */}
            <div className="mobile-image mobile-only" style={{ backgroundImage: `url(${image1})` }}></div>

            <div className="text-overlay">
                <h2>¿Por qué masa madre?</h2>
                <p>
                    Porque es más fácil de digerir, tiene menos gluten, respeta el tiempo natural de fermentación,
                    y sus bacterias beneficiosas ayudan a descomponer los antinutrientes.
                    Elegirla es volver al origen.
                </p>
            </div>
        </section>
    );
};

export default WhySourdough;