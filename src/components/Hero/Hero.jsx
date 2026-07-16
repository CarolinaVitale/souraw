import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag } from "@phosphor-icons/react";
import doll from "../../assets/brand-elements/face-pink.png";
import "./Hero.css";

const titleLines = ["Untamed.", "Unrushed.", "Unapologetic."];

const Hero = () => (
    <section className="hero">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-background-word" aria-hidden="true">SOURAW</div>

        <motion.div
            className="hero-sticker hero-sticker--time"
            initial={{ opacity: 0, x: 24, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
            aria-hidden="true"
        >
            made with time ↗
        </motion.div>

        <div className="hero-content">
            <p className="hero-kicker">
                100% sourdough · naturally fermented
            </p>

            <h1 className="hero-title">
                {titleLines.map((line) => (
                    <span className="hero-title-line" key={line}>
                        <span>{line}</span>
                    </span>
                ))}
            </h1>

            <p className="hero-subtitle">
                Crafted with intention, patience, and real fermentation. Bread
                that nourishes the body and holds space for slow, meaningful moments.
            </p>

            <div className="hero-actions">
                <Link to="/orders" className="hero-btn hero-btn-main">
                    orders <ShoppingBag size={18} weight="bold" />
                </Link>
                <Link to="/menu" className="hero-btn">
                    explore the menu <ArrowUpRight size={18} weight="bold" />
                </Link>
            </div>
        </div>

        <motion.div
            className="hero-doll-wrap"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 0.68, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
        >
            <img src={doll} className="hero-doll" alt="" />
        </motion.div>

        <a className="hero-scroll" href="#home-after-hero" aria-label="Continue to the next section">
            <span>keep scrolling</span>
            <span className="hero-scroll-arrows" aria-hidden="true">↓<br />↓</span>
        </a>

        <div className="hero-bottom-note" aria-hidden="true">
            <span>slow dough</span><i /> <span>loud bread</span><i /> <span>made differently</span>
        </div>
    </section>
);

export default Hero;
