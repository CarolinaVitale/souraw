import React from "react";
import "./PageBanner.css";

export default function PageBanner({ image, kicker, title }) {
    return (
        <section
            className="page-banner"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="page-banner-overlay" />

            <div className="page-banner-content">
                <p className="page-banner-kicker">{kicker}</p>
                <h1 className="page-banner-title">{title}</h1>
            </div>
        </section>
    );
}