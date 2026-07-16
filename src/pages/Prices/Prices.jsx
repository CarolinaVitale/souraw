import React, { useState } from "react";
import { Clock, MapPin, ShoppingBag, ArrowUpRight } from "@phosphor-icons/react";
import "./Prices.css";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import heroImage from "../../assets/prices/cookies.webp";

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
        setTimeout(() => setAddedMessage(""), 2200);
    };

    return (
        <main className="prices-page">
            {addedMessage && <div className="cart-toast">{addedMessage}</div>}

            <section className="order-hero" aria-labelledby="order-title">
                <div className="order-hero-word" aria-hidden="true">ORDER</div>

                <div className="order-hero-copy">
                    <p className="prices-kicker">fresh weekly · Tampa local</p>
                    <h1 id="order-title">Order the<br /><span>good stuff.</span></h1>
                    <a className="order-jump" href="#weekly-menu">
                        see this week’s menu <ArrowUpRight size={19} weight="bold" />
                    </a>
                </div>

                <div className="order-hero-scene" aria-hidden="true">
                    <div className="order-photo-frame">
                        <img src={heroImage} alt="" />
                    </div>
                </div>
            </section>

            <section className="order-details-strip" aria-label="Weekly order details">
                <p className="prices-intro">
                    Naturally fermented loaves, slow-made sweets, and small-batch
                    comfort food baked with intention.
                </p>
                <div className="order-facts">
                    <div className="order-fact">
                        <ShoppingBag size={24} weight="bold" />
                        <span><small>Pickup</small>Thursday at Canopy</span>
                    </div>
                    <div className="order-fact">
                        <Clock size={24} weight="bold" />
                        <span><small>Order by</small>Tuesday · 8:00 PM</span>
                    </div>
                    <div className="order-fact order-fact-note">
                        no same-day orders · slow dough needs time
                    </div>
                </div>
            </section>

            <section className="prices-section" id="weekly-menu">
                <header className="prices-section-head">
                    <div>
                        <p className="prices-section-kicker">from the oven</p>
                        <h2>Available this week.</h2>
                    </div>
                    <p>Choose your favorites. We’ll take care of the slow part.</p>
                </header>

                <div className="prices-grid">
                    {featuredProducts.map((product, index) => (
                        <article
                            className={`price-card price-card-${(index % 4) + 1} ${
                                product.badge === "Coming Soon" ? "is-coming-soon" : ""
                            }`}
                            key={`${product.id}-${index}`}
                        >
                            {product.priceImage && (
                                <div className="price-image-wrap">
                                    <img src={product.priceImage} alt={product.name} className="price-image" />
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
                                        {product.prices.map((option, optionIndex) => (
                                            <div className="price-option" key={`${option.label}-${optionIndex}`}>
                                                <div className="price-option-copy">
                                                    <p className="price-size">{option.label}</p>
                                                    <span className="price-usd">{formatUSD(option.priceUSD)}</span>
                                                </div>
                                                {product.badge === "Coming Soon" || product.available === false ? (
                                                    <span className="price-button price-button-disabled">coming soon</span>
                                                ) : (
                                                    <button type="button" className="price-button" onClick={() => handleAddToCart(product, option)}>
                                                        add <span aria-hidden="true">＋</span>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="price-single">
                                        <div>
                                            {product.size && <p className="price-size">{product.size}</p>}
                                            <span className="price-usd">{formatUSD(product.priceUSD)}</span>
                                        </div>
                                        {product.badge === "Coming Soon" || product.available === false ? (
                                            <span className="price-button price-button-disabled">coming soon</span>
                                        ) : (
                                            <button type="button" className="price-button" onClick={() => handleAddToCart(product)}>
                                                add <span aria-hidden="true">＋</span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="order-pickup" aria-labelledby="pickup-title">
                <div className="order-pickup-word" aria-hidden="true">LOCAL</div>
                <div>
                    <p className="prices-section-kicker">Tampa locals only</p>
                    <h2 id="pickup-title">Meet me at<br />Canopy.</h2>
                </div>
                <div className="order-pickup-copy">
                    <MapPin size={38} weight="fill" />
                    <p>Thursday pickup at Canopy at Citrus Park. Delivery availability depends on location.</p>
                    <a href="https://maps.app.goo.gl/kKkQV9Y1zXHMPY6a6" target="_blank" rel="noopener noreferrer">
                        open pickup location <ArrowUpRight size={18} weight="bold" />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Prices;
