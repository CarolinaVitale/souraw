import React, { useEffect, useRef } from "react";
import "./Orders.css";
import pedidoImg from "../../assets/prices/cookie-box.webp";
import crumbsPng from "../../assets/brand-elements/crumbs2.PNG";
import { Bread, Clock } from "@phosphor-icons/react";
import bannerImage from "../../assets/banner4.webp";
import DeliveryCalendar from "../../components/DeliveryCalendar/DeliveryCalendar";

const Orders = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = 1 - rect.top / windowHeight;
            const clamped = Math.max(0, Math.min(1, progress));

            const y1 = (clamped - 0.5) * 30;
            const y2 = (clamped - 0.5) * -20;

            el.style.setProperty("--parallax-a", `${y1}px`);
            el.style.setProperty("--parallax-b", `${y2}px`);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="schedule-page">
            <section className="schedule-hero">
                <div className="schedule-hero-word" aria-hidden="true">THURSDAY</div>

                <div className="schedule-hero-copy">
                    <p className="schedule-script">good bread needs a little planning</p>
                    <h1>
                        Fresh takes
                        <span>time.</span>
                    </h1>
                    <a href="#weekly-rhythm" className="schedule-pill schedule-pill-red">
                        Check the calendar <span aria-hidden="true">↓</span>
                    </a>
                </div>

                <div className="schedule-hero-visual">
                    <div className="schedule-photo-frame">
                        <img src={bannerImage} alt="Fresh SOURAW order ready for the week" />
                    </div>
                    <span className="schedule-sticker schedule-sticker-pink">delivery Thursday</span>
                    <span className="schedule-sticker schedule-sticker-yellow">order by Tuesday · 8pm</span>
                </div>
            </section>

            <p className="photo-banner-summary">
                Pick your Thursday, order by Tuesday evening, and let slow
                fermentation do what it does best.
            </p>

            <div className="schedule-ribbon" aria-hidden="true">
                <div>
                    <span>PLAN IT • FERMENT IT • BAKE IT • SHARE IT • EVERY THURSDAY • </span>
                    <span>PLAN IT • FERMENT IT • BAKE IT • SHARE IT • EVERY THURSDAY • </span>
                    <span>PLAN IT • FERMENT IT • BAKE IT • SHARE IT • EVERY THURSDAY • </span>
                    <span>PLAN IT • FERMENT IT • BAKE IT • SHARE IT • EVERY THURSDAY • </span>
                    <span>PLAN IT • FERMENT IT • BAKE IT • SHARE IT • EVERY THURSDAY • </span>

                </div>
            </div>

            <section className="pedidos-section" id="weekly-rhythm" ref={sectionRef}>
                <div className="schedule-background-word" aria-hidden="true">SLOW</div>
                <div className="orders-crumbsLayer">
                    <img src={crumbsPng} alt="" className="orders-crumbs crumbs-a" />
                    <img src={crumbsPng} alt="" className="orders-crumbs crumbs-b" />
                </div>

                <header className="schedule-section-header">
                    <p className="schedule-script">our weekly rhythm</p>
                    <h2>Pick a Thursday.</h2>

                    <p>
                        Orders are baked fresh each week and delivered every <strong>Thursday</strong>. To allow enough time for fermentation and baking, please place your order by <strong>Tuesday at 8:00 pm</strong>.
                    </p>
                </header>

                <div className="schedule-steps">
                    <article>
                        <span>01</span>
                        <h3>Choose</h3>
                        <p>Select an available Thursday on the calendar.</p>
                    </article>
                    <article>
                        <span>02</span>
                        <h3>Order</h3>
                        <p>Place your order before Tuesday at 8:00 PM.</p>
                    </article>
                    <article>
                        <span>03</span>
                        <h3>Enjoy</h3>
                        <p>Receive your fresh SOURAW order on Thursday.</p>
                    </article>
                </div>

                <div className="schedule-main-grid">
                    <div className="pedidos-text">

                    <DeliveryCalendar />

                    <div className="pedidos-bullets">
                        <div className="pedido-line">
                            <Bread className="pedido-icon" weight="light" />
                            <p><strong>Delivery day</strong><br />Thursday</p>
                        </div>

                        <div className="pedido-line">
                            <Clock className="pedido-icon" weight="light" />
                            <p><strong>Order deadline</strong><br />Tuesday at 8:00 PM</p>
                        </div>
                    </div>

                    <p className="pedidos-sello">
                        No same-day orders — freshly baked, always <i className="fa-regular fa-heart"></i>
                    </p>
                    </div>

                    <aside className="pedidos-image">
                        <div>
                            <img src={pedidoImg} alt="SOURAW cookie box" />
                        </div>
                        <span className="schedule-sticker schedule-sticker-photo">worth the wait</span>
                    </aside>
                </div>
            </section>

            <section className="schedule-cta">
                <div className="schedule-cta-word" aria-hidden="true">CRAVING?</div>
                <p className="schedule-script">your Thursday is waiting</p>
                <h2>What are you craving today?</h2>
                <a href="/orders" className="schedule-pill schedule-pill-cream">
                    Let's bake something <span aria-hidden="true">↗</span>
                </a>
            </section>
        </main>
    );
};

export default Orders;
