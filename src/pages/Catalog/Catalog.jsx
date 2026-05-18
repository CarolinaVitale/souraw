import React from "react";
import { categories, getProductsByCategory } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/banner3.webp";
import "./Catalog.css";

const Catalog = () => {
    const catalogTitles = {
        wildLoaves: "Crust & Crumb",
        slowCravings: "Slow Cravings",
        hearthPizzas: "Hearth Pizzas",
        tenderSweets: "Sweet Pauses",
    };

    return (
        <>
            <PageBanner
                image={bannerImage}
                kicker="Special selection"
                title="MENU"
            />

            <section className="catalog">
                <div className="catalog-intro" data-aos="fade-up">
                    <p>Our menu</p>
                    <h1>Made slowly, meant to be savored.</h1>
                    <span>
                        A quiet collection of sourdough breads, cravings, pizzas and sweet pauses —
                        crafted with real fermentation, patience and intention.
                    </span>
                </div>

                {categories.map((category) => {
                    const products = getProductsByCategory(category.id);
                    if (!products.length) return null;

                    return (
                        <section className="catalog-section" key={category.id}>
                            <div className="catalog-section-header" data-aos="fade-up">
                                <p>SOURAW selection</p>
                                <h2>{catalogTitles[category.id] || category.title}</h2>
                            </div>

                            <div className="catalog-grid" data-aos="fade-up" data-aos-delay="100">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        {...product}
                                        image={product.catalogImage}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}

                <div className="catalog-cta" data-aos="fade-up">
                    <p>
                        Freshly baked for Tampa locals ♡
                    </p>

                    <a href="/prices" className="catalog-order-btn">
                        ORDER HERE
                    </a>
                </div>
            </section>
        </>
    );
};

export default Catalog;