import React from 'react';
import { Link } from 'react-router-dom';
import bread from '../../assets/prices/sourdough-selection.jpg';
import cookies from '../../assets/prices/chocolate-chip-single.jpg';
import '../../styles/journal.css';
import './Prices.css';
import JournalMasthead from '../../components/JournalMasthead/JournalMasthead';
import useInViewOnce from '../../hooks/useInViewOnce';

export default function OrderSelection() {
    const [headRef, headInView] = useInViewOnce();
    const [gridRef, gridInView] = useInViewOnce({ rootMargin: "0px" });

    return (
        <main className="order-selection">
            <JournalMasthead
                className="order-selection-masthead"
                left="Orders"
                center="Something good awaits"
                right="Tampa local"
            />

            <header ref={headRef} className={`order-selection-heading journal-reveal ${headInView ? "is-inview" : ""}`}>
                <p className="prices-section-kicker reveal-up">something good awaits</p>
                <h1 className="reveal-up" style={{ "--rd": "0.1s" }}>What sounds good?</h1>
                <p className="reveal-up" style={{ "--rd": "0.2s" }}>A fresh loaf or a little treat. Start here.</p>
            </header>

            {/* Each whole card is the link; the red pill is only its visual call to action. */}
            <div ref={gridRef} className={`order-selection-grid journal-reveal ${gridInView ? "is-inview" : ""}`}>
                <Link
                    to="/orders/sourdough"
                    className="order-selection-card journal-polaroid journal-polaroid--tilt-left order-selection-card--bread"
                    style={{ "--rd": "0.05s" }}
                >
                    <span className="order-selection-photo">
                        <img src={bread} alt="SOURAW sourdough loaf" />
                    </span>
                    <div>
                        <h2>Sourdough</h2>
                        <p>Slow-fermented breads & savory favorites.</p>
                        <strong className="order-selection-cta">Start your order <span aria-hidden="true">↗</span></strong>
                    </div>
                </Link>
                <Link
                    to="/orders/sweets"
                    className="order-selection-card journal-polaroid journal-polaroid--tilt-right journal-polaroid--yellow-tape order-selection-card--sweets"
                    style={{ "--rd": "0.17s" }}
                >
                    <span className="order-selection-photo">
                        <img src={cookies} alt="Chocolate chip cookie" />
                    </span>
                    <div>
                        <h2>Cookies & sweets</h2>
                        <p>Cookies, tiramisu & desserts. No sourdough.</p>
                        <strong className="order-selection-cta">Start your order <span aria-hidden="true">↗</span></strong>
                    </div>
                </Link>
            </div>
        </main>
    );
}
