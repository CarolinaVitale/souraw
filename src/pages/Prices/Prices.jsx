import React, { useState } from "react";
import "./Prices.css";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/prices/cookies.webp";


const Prices = () => {
    const { addToCart } = useCart();
    const [addedMessage, setAddedMessage] = useState("");

    const formatUSD = (price) =>
        Number(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    const featuredProducts = products.filter((product) => product.featured);

    const getBadgeClass = (badge) => {
        if (!badge) return "";
        return badge.toLowerCase().replace(/\s+/g, "-");
    };

    const handleAddToCart = (product, option = null) => {
        addToCart(product, option);

        const label = option?.label ? ` — ${option.label}` : "";
        setAddedMessage(`${product.name}${label} added to cart ♡`);

        setTimeout(() => {
            setAddedMessage("");
        }, 2200);
    };

    return (

        <>
            <PageBanner image={bannerImage} kicker="" title="" />

            <main className="prices-page">
                {addedMessage && (
                    <div className="cart-toast">
                        {addedMessage}
                    </div>
                )}

                <section className="prices-hero">
                    <p className="prices-kicker">Fresh weekly</p>
                    <h1>ORDER MENU</h1>
                    <h2>Tampa Locals only ♡</h2>
                    <p className="prices-intro">
                        Naturally fermented breads and slow-made comfort food.
                    </p>

                    <p className="prices-intro">
                        <i className="fa-solid fa-bag-shopping"></i>{" "}
                        Orders are available for <strong>Thursday pickup</strong> at Canopy at Citrus Park.
                    </p>

                    <p className="prices-intro">
                        <i className="fa-regular fa-clock"></i>{" "}
                        Please place your order by <strong>Tuesday at 8:00 pm</strong>.
                    </p>
                </section>

                <section className="prices-section featured-section">
                    <h2>Available This Week</h2>

                    <div className="prices-grid">
                        {featuredProducts.map((product) => (
                            <article
                                className={`price-card ${product.badge === "Coming Soon" ? "is-coming-soon" : ""
                                    }`}
                                key={product.id}
                            >
                                {product.priceImage && (
                                    <div className="price-image-wrap">
                                        <img
                                            src={product.priceImage}
                                            alt={product.name}
                                            className="price-image"
                                        />

                                        {product.badge && (
                                            <span className={`price-badge ${getBadgeClass(product.badge)}`}>
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="price-content">
                                    {!product.priceImage && product.badge && (
                                        <span className={`price-badge price-badge-static ${getBadgeClass(product.badge)}`}>
                                            {product.badge}
                                        </span>
                                    )}

                                    <h3>{product.name}</h3>

                                    {product.prices ? (
                                        <div className="multi-prices">
                                            {product.prices.map((option, index) => (
                                                <div className="price-option" key={index}>
                                                    <p className="price-size">{option.label}</p>

                                                    <span className="price-usd">
                                                        {formatUSD(option.priceUSD)}
                                                    </span>

                                                    {product.badge === "Coming Soon" || product.available === false ? (
                                                        <span className="price-button price-button-disabled">
                                                            coming soon
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="price-button"
                                                            onClick={() => handleAddToCart(product, option)}
                                                        >
                                                            add to cart
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {product.size && <p className="price-size">{product.size}</p>}

                                            <span className="price-usd">
                                                {formatUSD(product.priceUSD)}
                                            </span>

                                            {product.badge === "Coming Soon" || product.available === false ? (
                                                <span className="price-button price-button-disabled">
                                                    coming soon
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="price-button"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    add to cart
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <section className="prices-hero">
                    <h2>
                        Tampa Locals only</h2>
                    <p className="prices-intro">
                        <i className="fa-solid fa-truck"></i>
                        Delivery depends on location</p>
                    <p className="prices-intro">
                        <i className="fa-solid fa-location-dot"></i>

                        <a
                            href="https://maps.app.goo.gl/kKkQV9Y1zXHMPY6a6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pickup-link"
                        >
                            Thursday pickup at Canopy at Citrus Park
                        </a>
                    </p>
                </section>
            </main>
        </>
    );
};

export default Prices;