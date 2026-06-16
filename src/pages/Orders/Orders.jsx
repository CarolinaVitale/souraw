import React, { useEffect, useRef } from "react";
import "./Orders.css";
import pedidoImg from "../../assets/prices/cookie-box.webp";
import crumbsPng from "../../assets/crumbs2.PNG";
import { Bread, Clock } from "@phosphor-icons/react";
import PageBanner from "../../components/PageBanner/PageBanner";
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
                        Orders are baked fresh each week and delivered every <strong>Thursday</strong>. To allow enough time for fermentation and baking, please place your order by <strong>Tuesday at 8:00 pm</strong>.
                    </p>

                    <DeliveryCalendar />

                    <div className="pedidos-bullets">
                        <p className="pedido-line">
                            <Bread className="pedido-icon" weight="light" />
                            <strong>Delivery day:</strong>&nbsp;Thursday.
                        </p>

                        <p className="pedido-line">
                            <Clock className="pedido-icon" weight="light" />
                            <strong>Order deadline:</strong>&nbsp;Tuesday at 8:00 pm.
                        </p>
                    </div>

                    <p className="pedidos-sello">
                        No same-day orders — <strong>freshly baked, always <i className="fa-regular fa-heart"></i></strong>
                    </p>

                    <h2>What are you craving today?</h2>

                    <div className="pedidos-button-wrap">
                        <a href="/orders" className="pedidos-button">
                            let's bake something <i className="fa-regular fa-heart"></i>
                        </a>
                    </div>


                </div>

                <div className="pedidos-image">
                    <img src={pedidoImg} alt="SOURAW bread bags" />
                </div>
            </section>
        </>
    );
};

export default Orders;