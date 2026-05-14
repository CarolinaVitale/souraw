import React from "react";
import "./Hero.css";
import doll from "../../assets/doll.png";
import { Link } from "react-router-dom";
import { ShoppingBag, BookOpen } from "@phosphor-icons/react";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <p className="hero-kicker">100% sourdough</p>

                <h1 className="hero-title">
                    Untamed.
                    <br />
                    Unrushed.
                    <br />
                    Unapologetic.
                </h1>

                <p className="hero-subtitle">
                    Crafted with intention, patience, and real fermentation.
                    Bread that nourishes the body and holds space for slow,
                    meaningful moments.
                </p>

                <div className="hero-actions">
                    <Link to="/orders" className="hero-btn hero-btn-main">
                        orders <ShoppingBag size={18} weight="light" />
                    </Link>

                    <Link to="/products" className="hero-btn">
                        products <BookOpen size={18} weight="light" />
                    </Link>
                </div>
            </div>

            <img src={doll} className="hero-doll" alt="SOURAW illustration" />
        </section>
    );
};

export default Hero;