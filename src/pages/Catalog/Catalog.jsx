import React from "react";
import { categories, getProductsByCategory } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import bannerImage from "../../assets/banner3.webp";
import "./Catalog.css";

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

            <div className="menu-ribbon" aria-hidden="true">
                <div>
                    <span>REAL FERMENTATION • SMALL BATCHES • BAKED WITH INTENTION • </span>
                    <span>REAL FERMENTATION • SMALL BATCHES • BAKED WITH INTENTION • </span>
                    <span>REAL FERMENTATION • SMALL BATCHES • BAKED WITH INTENTION • </span>
                    <span>REAL FERMENTATION • SMALL BATCHES • BAKED WITH INTENTION • </span>
                </div>
            </div>

            <section className="catalog" id="menu-selection">
                <div className="catalog-intro">
                    <p className="menu-script">choose your craving</p>
                    <h1>Made slowly, meant to be savored.</h1>
                    <span>
                        A quiet collection of sourdough breads, cravings, pizzas and sweet pauses —
                        crafted with real fermentation, patience and intention.
                    </span>

                    <nav className="catalog-category-nav" aria-label="Menu categories">
                        {visibleCategories.map((category) => (
                            <a key={category.id} href={`#${category.id}`}>
                                {catalogTitles[category.id] || category.title}
                            </a>
                        ))}
                    </nav>
                </div>

                {visibleCategories.map((category, categoryIndex) => {
                    return (
                        <section
                            className={`catalog-section catalog-section-${(categoryIndex % 4) + 1}`}
                            id={category.id}
                            key={category.id}
                        >
                            <div className="catalog-section-word" aria-hidden="true">
                                {catalogTitles[category.id] || category.title}
                            </div>
                            <div className="catalog-section-header">
                                <div>
                                    <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
                                    <p>SOURAW selection</p>
                                </div>
                                <h2>{catalogTitles[category.id] || category.title}</h2>
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

                <div className="catalog-cta">
                    <p className="menu-script">ready when you are</p>
                    <h2>Found your favorite?</h2>
                    <p>Freshly baked for Tampa locals ♡</p>

                    <a href="/orders" className="menu-pill menu-pill-cream">
                        Order SOURAW <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Catalog;
