import React from "react";
import { ArrowDown, ArrowUpRight, Heart, Sparkle } from "@phosphor-icons/react";
import {
    untamedStudioFindCategories,
    untamedStudioFinds,
    untamedStudioFindsPage,
} from "../../data/untamedStudioFinds";
import "./UntamedStudioFinds.css";

const heroProductIds = [
    "cricut-explore-5",
    "holographic-laminate-sheets",
    "easypress-mini",
    "epson-ecotank-et-2803",
];

export default function UntamedStudioFinds() {
    const heroProducts = heroProductIds
        .map((id) => untamedStudioFinds.find((item) => item.id === id))
        .filter(Boolean);

    return (
        <main className="usf-page">
            <section className="usf-hero" aria-labelledby="usf-title">
                <div className="usf-hero-outline" aria-hidden="true">TOOLS</div>

                <div className="usf-hero-copy">
                    <p>{untamedStudioFindsPage.eyebrow}</p>
                    <h1 id="usf-title">
                        {untamedStudioFindsPage.title.split(" ").slice(0, 3).join(" ")}
                        <span>{untamedStudioFindsPage.title.split(" ").slice(3).join(" ")}</span>
                    </h1>
                    <div className="usf-hero-intro">{untamedStudioFindsPage.intro}</div>
                    <a href="#studio-shelf" className="usf-button usf-button-light">
                        {untamedStudioFindsPage.jumpLabel}
                        <ArrowDown size={18} weight="bold" />
                    </a>
                </div>

                <div className="usf-hero-board" aria-hidden="true">
                    {heroProducts.map((product, index) => (
                        <div className={`usf-hero-product usf-hero-product-${index + 1}`} key={product.id}>
                            <img src={product.image} alt="" />
                        </div>
                    ))}
                    <span className="usf-hero-note">print · cut · press</span>
                    <Sparkle className="usf-hero-sparkle" weight="fill" />
                </div>
            </section>

            <div className="usf-disclosure">
                <Heart size={18} weight="fill" aria-hidden="true" />
                <span>{untamedStudioFindsPage.disclosure}</span>
            </div>

            <nav className="usf-category-nav" aria-label={untamedStudioFindsPage.eyebrow}>
                {untamedStudioFindCategories.map((category) => (
                    <a href={`#${category.id}`} key={category.id}>{category.label}</a>
                ))}
            </nav>

            <div className="usf-shelf" id="studio-shelf">
                {untamedStudioFindCategories.map((category, categoryIndex) => {
                    const categoryProducts = untamedStudioFinds.filter(
                        (product) => product.category === category.id
                    );

                    return (
                        <section
                            className={`usf-category usf-category-${category.id}`}
                            id={category.id}
                            key={category.id}
                        >
                            <header className="usf-category-header">
                                <div>
                                    <p>{category.eyebrow}</p>
                                    <h2>{category.label}</h2>
                                </div>
                                <span>{category.description}</span>
                            </header>

                            <div className="usf-grid">
                                {categoryProducts.map((product, itemIndex) => (
                                    <article
                                        className={`usf-card usf-card-color-${((itemIndex + categoryIndex) % 5) + 1}`}
                                        key={product.id}
                                    >
                                        <div className="usf-card-image">
                                            <img src={product.image} alt={product.name} loading="lazy" />
                                            <span>{product.badge}</span>
                                        </div>
                                        <div className="usf-card-copy">
                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>
                                            <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer sponsored"
                                            >
                                                {untamedStudioFindsPage.linkLabel}
                                                <ArrowUpRight size={17} weight="bold" />
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
