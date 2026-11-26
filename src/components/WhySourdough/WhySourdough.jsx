import React from 'react';
import '../../styles/journal.css';
import './WhySourdough.css';
import JournalMasthead from '../JournalMasthead/JournalMasthead';
import useInViewOnce from '../../hooks/useInViewOnce';
import image2 from '../../assets/back1.jpeg';
import image1 from '../../assets/back2.PNG';

const WhySourdough = () => {
    const [bodyRef, bodyInView] = useInViewOnce();

    return (
        <section className="why-sourdough">
            <JournalMasthead
                className="why-sourdough-masthead"
                left="The good stuff"
                center="Why sourdough"
                right="Naturally"
            />

            <div ref={bodyRef} className={`why-sourdough-body journal-reveal ${bodyInView ? "is-inview" : ""}`}>
                <figure className="journal-polaroid journal-polaroid--plain journal-polaroid--tilt-left why-sourdough-photo" style={{ "--rd": "0.1s" }}>
                    <img src={image1} alt="" loading="lazy" decoding="async" />
                </figure>

                <div className="text-overlay">
                    <p className="about-script reveal-up">the question behind it all</p>
                    <h2 className="reveal-up" style={{ "--rd": "0.1s" }}>Why Sourdough?</h2>
                    <p className="reveal-up" style={{ "--rd": "0.25s" }}>
                        Because it’s gentler on your body, lower in gluten, and honors the natural rhythm of fermentation. Its beneficial bacteria help break down antinutrients, making it easier to absorb what truly nourishes you.
                        Choosing it is choosing a return to the origin.
                    </p>
                    <div className="reveal-up" style={{ "--rd": "0.35s" }}>
                        <a href="/menu" className="about-pill about-pill-cream">
                            Explore the menu <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>

                <figure className="journal-polaroid journal-polaroid--plain journal-polaroid--tilt-right journal-polaroid--yellow-tape why-sourdough-photo" style={{ "--rd": "0.22s" }}>
                    <img src={image2} alt="" loading="lazy" decoding="async" />
                </figure>
            </div>
        </section>
    );
};

export default WhySourdough;
