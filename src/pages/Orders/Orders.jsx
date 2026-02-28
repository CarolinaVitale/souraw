import React, { useEffect, useRef } from "react";
import "./Orders.css";
import pedidoImg from "../../assets/orders.webp";
import crumbsPng from "../../assets/crumbs2.PNG";
import { Calendar, Bread, Clock, Fire, WhatsappLogo } from "@phosphor-icons/react";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/banner4.jpg";

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
        <>
            <PageBanner image={bannerImage} kicker="Baked for you..." title="FRESH & UNRUSHED" />

            <section className="pedidos-section" ref={sectionRef}>
                <div className="orders-crumbsLayer">
                    <img src={crumbsPng} alt="" className="orders-crumbs crumbs-a" />
                    <img src={crumbsPng} alt="" className="orders-crumbs crumbs-b" />
                </div>

                <div className="pedidos-text">
                    <h2>Want to place an order?</h2>

                    <p>
                        Everything here starts with the starter. I need <strong>48 hours</strong> from the moment I begin feeding it to the moment your order is ready.
                    </p>

                    <div className="pedidos-bullets">
                        <p className="pedido-line">
                            <Calendar className="pedido-icon" weight="light" />
                            <strong>Dough days:</strong>&nbsp;Monday, Wednesday, and Friday.
                        </p>
                        <p className="pedido-line">
                            <Bread className="pedido-icon" weight="light" />
                            <strong>Delivery days:</strong>&nbsp;Tuesday, Thursday, and Saturday.
                        </p>
                        <p className="pedido-line">
                            <Fire className="pedido-icon" weight="light" />
                            <strong>Tuesdays:</strong>&nbsp;Tequeños only.
                        </p>
                        <p className="pedido-line">
                            <Clock className="pedido-icon" weight="light" />
                            <strong>Order cutoffs:</strong>
                        </p>
                    </div>

                    <div className="pedidos-deadlines">
                        <ul className="pedido-list">
                            <li><strong>SUNDAY 8:00 pm</strong> → delivery on <strong>TUESDAY</strong></li>
                            <li><strong>TUESDAY 8:00 pm</strong> → delivery on <strong>THURSDAY</strong></li>
                            <li><strong>THURSDAY 8:00 pm</strong> → delivery on <strong>SATURDAY</strong></li>
                        </ul>
                    </div>

                    <p className="pedidos-sello">
                        Same-day only: <strong>Freshly baked, always ♡</strong>
                    </p>

                    <h2>What are you craving today?</h2>

                    <a
                        href="https://wa.me/584121531299?text=Hi%2C%20I%27d%20love%20to%20place%20an%20order%20%E2%99%A1"
                        className="pedidos-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <WhatsappLogo size={22} weight="light" style={{ marginRight: 6 }} />
                        order here ♡
                    </a>
                </div>

                <div className="pedidos-image">
                    <img src={pedidoImg} alt="SOURAW bread bags" />
                </div>
            </section>
        </>
    );
};

export default Orders;