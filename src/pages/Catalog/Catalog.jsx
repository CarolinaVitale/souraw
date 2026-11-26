import React from "react";
import { categories, getProductsByCategory } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import bannerImage from "../../assets/banner3.webp";
import "../../styles/journal.css";
import "./Catalog.css";
import JournalMasthead from "../../components/JournalMasthead/JournalMasthead";
import useInViewOnce from "../../hooks/useInViewOnce";

/* Scroll-reveal wrapper: adds .journal-reveal, then .is-inview once. */
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
    const [ref, inView] = useInViewOnce();
    return (
        <Tag ref={ref} className={`${className} journal-reveal ${inView ? "is-inview" : ""}`} {...rest}>
            {children}
        </Tag>
    );
}

const Catalog = () => {
    const catalogTitles = {
        wildLoaves: "Crust & Crumb",
        slowCravings: "Slow Cravings",
        hearthPizzas: "Hearth Pizzas",
        tenderSweets: "Sweet Pauses",
    };

    const visibleCategories = categories
        .map((category) => ({
            ...category,
            products: getProductsByCategory(category.id).filter(
                (product) => product.available !== false && product.badge !== "Coming Soon"
            ),
        }))
        .filter((category) => category.products.length > 0);

    return (
        <main className="menu-page">
            <section className="menu-hero">
                <div className="menu-hero-word" aria-hidden="true">MENU</div>

                <div className="menu-hero-copy">
                    <p className="menu-script">fresh weekly · Tampa local</p>
                    <h1>
                        Pick your
                        <span>favorite.</span>
                    </h1>
                    <a href="#menu-selection" className="menu-pill menu-pill-red">
                        See the menu <span aria-hidden="true">↓</span>
                    </a>
                </div>

                <div className="menu-hero-visual">
                    <div className="menu-photo-frame">
                        <img src={bannerImage} alt="Fresh SOURAW selection" />
                    </div>
                    <span className="menu-sticker menu-sticker-pink">baked unrushed</span>
                    <span className="menu-sticker menu-sticker-yellow">made in Tampa</span>
                </div>
            </section>

            <p className="photo-banner-summary">
                Naturally fermented loaves, slow-made cravings, and sweet
                little reasons to gather around the table.
            </p>

            <section className="catalog" id="menu-selection">
                <Reveal className="catalog-intro">
                    <p className="menu-script reveal-up">choose your craving</p>
                    <h1 className="reveal-up" style={{ "--rd": "0.1s" }}>Made slowly, meant to be savored.</h1>
                    <span className="reveal-up" style={{ "--rd": "0.25s" }}>
                        A quiet collection of sourdough breads, cravings, pizzas and sweet pauses —
                        crafted with real fermentation, patience and intention.
                    </span>

                    <nav className="catalog-category-nav reveal-up" style={{ "--rd": "0.35s" }} aria-label="Menu categories">
                        {visibleCategories.map((category) => (
                            <a key={category.id} href={`#${category.id}`}>
                                {catalogTitles[category.id] || category.title}
                            </a>
                        ))}
                    </nav>
                </Reveal>

                {visibleCategories.map((category, categoryIndex) => {
                    return (
                        <section
                            className={`catalog-section catalog-section-${(categoryIndex % 4) + 1}`}
                            id={category.id}
                            key={category.id}
                        >
                            <div className="catalog-section-header">
                                <JournalMasthead
                                    className="catalog-masthead"
                                    left={String(categoryIndex + 1).padStart(2, "0")}
                                    center=""
                                    right="SOURAW selection"
                                />
                                <Reveal as="h2" className="catalog-section-title">
                                    <span className="reveal-up">{catalogTitles[category.id] || category.title}</span>
                                </Reveal>
                            </div>

                            <div className="catalog-grid">
                                {category.products.map((product, productIndex) => (
                                    <ProductCard
                                        key={`${product.id}-${productIndex}`}
                                        {...product}
                                        image={product.catalogImage}
                                        number={productIndex + 1}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}

                <Reveal className="catalog-cta">
                    <p className="menu-script reveal-up">ready when you are</p>
                    <h2 className="reveal-up" style={{ "--rd": "0.1s" }}>Found your favorite?</h2>
                    <p className="reveal-up" style={{ "--rd": "0.2s" }}>Freshly baked for Tampa locals ♡</p>

                    <div className="reveal-up" style={{ "--rd": "0.3s" }}>
                        <a href="/orders" className="menu-pill menu-pill-red">
                            Order SOURAW <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </Reveal>
            </section>
        </main>
    );
};

export default Catalog;
