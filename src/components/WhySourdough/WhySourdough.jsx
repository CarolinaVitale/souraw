import React from 'react';
import './WhySourdough.css';
import image2 from '../../assets/back1.jpeg';
import image1 from '../../assets/back2.PNG';

const WhySourdough = () => {
    return (
        <section className="why-sourdough">
            <div className="why-sourdough-word" aria-hidden="true">WHY</div>
            <div className="why-sourdough-gallery" aria-hidden="true">
                <div style={{ backgroundImage: `url(${image1})` }}></div>
                <div style={{ backgroundImage: `url(${image2})` }}></div>
            </div>

            <div className="text-overlay">
                <p className="about-script">the question behind it all</p>
                <h2>Why Sourdough?</h2>
                <p>
                    Because it’s gentler on your body, lower in gluten, and honors the natural rhythm of fermentation. Its beneficial bacteria help break down antinutrients, making it easier to absorb what truly nourishes you.
                    Choosing it is choosing a return to the origin.
                </p>
                <a href="/menu" className="about-pill about-pill-cream">
                    Explore the menu <span aria-hidden="true">↗</span>
                </a>
            </div>
        </section>
    );
};

export default WhySourdough;
