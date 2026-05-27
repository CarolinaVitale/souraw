// src/pages/Favorites/Favorites.jsx
import React from "react";
import "./SourawFinds.css";
import { sourawFind } from "../../data/sourawFinds";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/amazon/seeds-bread.webp";

const Favorites = () => {
    return (<>
        <PageBanner
            image={bannerImage}
            kicker="Maybe you need this"
            title="SOURAW ESSENTIALS"
        />

        <main className="favorites-page">
            <section className="favorites-hero">
                <h6 className="favorites-kicker">Souraw Finds</h6>
                <h1>Things I use and love</h1>
                <p>
                    A small curated corner with tools, packaging, and everyday favorites
                    I use in my baking process and small business workflow.
                </p>

                <p className="affiliate-disclosure">
                    Some links on this page are affiliate links, which means I may earn a
                    small commission at no extra cost to you.
                </p>
            </section>

            <section className="favorites-grid">
                {sourawFind.map((item) => (
                    <article className="favorite-card" key={item.id}>
                        <div className="favorite-image-wrapper">
                            <img src={item.image} alt={item.name} />
                        </div>

                        <div className="favorite-info">
                            <span>{item.category}</span>
                            <h2>{item.name}</h2>

                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="favorite-link"
                            >
                                Find it here ↗
                            </a>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    </>

    );

};

export default Favorites;