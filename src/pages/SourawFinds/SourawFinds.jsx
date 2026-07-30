import React, { useState } from "react";
import { ArrowUpRight, Heart, Sparkle } from "@phosphor-icons/react";
import "./SourawFinds.css";
import { sourawFind } from "../../data/sourawFinds";
import heroImage from "../../assets/amazon/seeds-bread.webp";

const categories = [
    { key: "Sourdough Essentials", title: "Crust & Crumb", kicker: "make it perfect" },
    { key: "Labels", title: "Labels", kicker: "little details" },
    { key: "Packaging", title: "Packaging", kicker: "pack it cute" },
    { key: "Craft", title: "Maker's Corner", kicker: "create & customize" },
    { key: "starter", title: "Starter Essentials", kicker: "feed it well" },
];

export default function SourawFinds() {
    const [activeCategory, setActiveCategory] = useState("All");

    const visibleCategories = categories.filter(
        (category) => activeCategory === "All" || category.key === activeCategory
    );

    return (
        <main className="favorites-page">
            <section className="finds-hero" aria-labelledby="finds-title">
                <div className="finds-hero-word" aria-hidden="true">FINDS</div>

                <div className="finds-hero-copy">
                    <p className="favorites-kicker">SOURAW finds</p>
                    <h1 id="finds-title">Little things<br /><span>I actually use.</span></h1>
                    <a href="#finds-shop" className="finds-jump">
                        browse my favorites <ArrowUpRight size={19} weight="bold" />
                    </a>
                </div>

                <div className="finds-hero-scene" aria-hidden="true">
                    <div className="finds-photo-frame">
                        <img src={heroImage} alt="" />
                    </div>
                    <span className="finds-sticker finds-sticker-loved">tried + loved ♡</span>
                    <span className="finds-sticker finds-sticker-use">things I really use</span>
                    <Sparkle className="finds-sparkle" weight="fill" />
                </div>

            </section>

            <div className="photo-banner-meta">
                <p className="photo-banner-summary">
                    Tools, packaging, and everyday favorites from my baking
                    process and small-business workflow.
                </p>
                <p className="affiliate-disclosure">
                    <Heart size={17} weight="fill" aria-hidden="true" />
                    Some links are affiliate links. I may earn a small commission
                    at no extra cost to you.
                </p>
            </div>

            <div id="finds-shop" className="finds-shop">
                <nav className="finds-nav" aria-label="Filter SOURAW finds">
                    <button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")}>
                        All finds
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            className={activeCategory === category.key ? "active" : ""}
                            onClick={() => setActiveCategory(category.key)}
                        >
                            {category.title}
                        </button>
                    ))}
                </nav>

                {visibleCategories.map((category, categoryIndex) => {
                    const filteredItems = sourawFind.filter((item) => item.category === category.key);
                    if (filteredItems.length === 0) return null;

                    return (
                        <section className="finds-category" key={category.key}>
                            <header className="finds-category-header">
                                <div>
                                    <p>{category.kicker}</p>
                                    <h2>{category.title}</h2>
                                </div>
                                <span>{String(filteredItems.length).padStart(2, "0")} favorites</span>
                            </header>

                            <div className="favorites-grid">
                                {filteredItems.map((item, itemIndex) => (
                                    <article
                                        className={`favorite-card favorite-card-${((itemIndex + categoryIndex) % 4) + 1}`}
                                        key={item.id}
                                    >
                                        <div className="favorite-image-wrapper">
                                            <img src={item.image} alt={item.name} loading="lazy" />
                                        </div>
                                        <div className="favorite-info">
                                            <h3>{item.name}</h3>
                                            {item.description && <p>{item.description}</p>}
                                            <a href={item.link} target="_blank" rel="noopener noreferrer sponsored" className="favorite-link">
                                                find it here <ArrowUpRight size={17} weight="bold" />
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
