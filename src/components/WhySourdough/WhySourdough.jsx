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
                <h2>¿Why Sourdough?</h2>
                <p>
                    Because it’s gentler on your body, lower in gluten, and honors the natural rhythm of fermentation. Its beneficial bacteria help break down antinutrients, making it easier to absorb what truly nourishes you.
                    Choosing it is choosing a return to the origin.
                </p>
            </div>
        </section>
    );
};

export default WhySourdough;