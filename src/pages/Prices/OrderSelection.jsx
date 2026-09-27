import React from 'react';
import { Link } from 'react-router-dom';
import bread from '../../assets/prices/sourdough-selection.jpg';
import cookies from '../../assets/prices/chocolate-chip-single.jpg';
import './Prices.css';

export default function OrderSelection() {
    return (
        <main className="order-selection">
            <header className="order-selection-heading">
                <p className="prices-section-kicker">something good awaits</p>
                <h1>What sounds good?</h1>
                <p>A fresh loaf or a little treat. Start here.</p>
            </header>
            <div className="order-selection-grid">
                <Link to="/orders/sourdough" className="order-selection-card order-selection-card--bread">
                    <img src={bread} alt="SOURAW sourdough loaf" />
                    <div>
                        
                        <h2>Sourdough</h2>
                        <p>Slow-fermented breads & savory favorites.</p>
                        <strong>Explore the menu <span aria-hidden="true">↗</span></strong>
                    </div>
                </Link>
                <Link to="/orders/sweets" className="order-selection-card order-selection-card--sweets">
                    <img src={cookies} alt="Chocolate chip cookie" />
                    <div>
                        
                        <h2>Cookies & sweets</h2>
                        <p>Cookies, tiramisu & desserts. No sourdough.</p>
                        <strong>Explore the menu <span aria-hidden="true">↗</span></strong>
                    </div>
                </Link>
            </div>
        </main>
    );
}
