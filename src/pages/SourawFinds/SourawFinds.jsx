// src/pages/Favorites/Favorites.jsx
import React from "react";
import "./SourawFinds.css";
import { sourawFind } from "../../data/sourawFinds";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/amazon/seeds-bread.webp";

const categories = [
    {
        key: "Labels",
        title: "Labels",
        kicker: "little details",
    },
    {
        key: "Packaging",
        title: "Packaging",
        kicker: "pack it cute",
    },
    {
        key: "Sourdough Essentials",
        title: "Crust & Crumb",
        kicker: "make it perfect",
    },
];

const Favorites = () => {
    return (
        <>
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
                        Some links on this page are affiliate links, which means I may earn
                        a small commission at no extra cost to you.
                    </p>
                </section>

                {categories.map((category) => {
                    const filteredItems = sourawFind.filter(
                        (item) => item.category === category.key
                    );

                    if (filteredItems.length === 0) return null;

                    return (
                        <section className="finds-category" key={category.key}>
                            <div className="finds-category-header">
                                <p>{category.kicker}</p>
                                <h2>{category.title}</h2>
                            </div>

                            <div className="favorites-grid">
                                {filteredItems.map((item) => (
                                    <article className="favorite-card" key={item.id}>
                                        <div className="favorite-image-wrapper">
                                            <img src={item.image} alt={item.name} />
                                        </div>

                                        <div className="favorite-info">
                                            <h3>{item.name}</h3>

                                            {item.description && <p>{item.description}</p>}

                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer sponsored"
                                                className="favorite-link"
                                            >
                                                find it here ↗
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </main>
        </>
    );
};

export default Favorites;