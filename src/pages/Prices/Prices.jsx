import BrandSticker from '../../components/BrandSticker/BrandSticker';
import React, { useState } from "react";
import { Clock, MapPin, ShoppingBag, ArrowUpRight } from "@phosphor-icons/react";
import "../../styles/journal.css";
import "./Prices.css";
import { products, fourCookieBagPrices } from "../../data/products";
import { useCart } from "../../context/CartContext";
import cookieBagImage from "../../assets/prices/four-cookie-bag.jpg";
import spoonableCookieImage from "../../assets/prices/spoonable-cookie.jpg";
import pistachioTiramisuImage from "../../assets/prices/pistachio-tiramisu.jpg";
import singleCookieImage from "../../assets/prices/chocolate-chip-single.jpg";
import chocolateObsessionImage from "../../assets/prices/chocolate-obsession.jpg";
import { Link } from "react-router-dom";
import { openContactDrawer } from "../../utils/contactDrawer";
import useInViewOnce from "../../hooks/useInViewOnce";
import { getPickupInfo } from "../../utils/pickupDate";
import { FEATURED_SWEET_IDS } from "../../data/orderCategories";

/* Scroll-reveal wrapper: adds .journal-reveal, then .is-inview once. */
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
    const [ref, inView] = useInViewOnce();
    return (
        <Tag ref={ref} className={`${className} journal-reveal ${inView ? "is-inview" : ""}`} {...rest}>
            {children}
        </Tag>
    );
}

const sweetIds = new Set(FEATURED_SWEET_IDS);
const newSweets = [
    {
        id: "spoonable-cookie", name: "Spoonable Cookie",
        size: "Ask about sizes & pricing",
        description: "Your cookie moment, by the spoonful.",
        priceImage: spoonableCookieImage,
    },
    {
        id: "chocolate-obsession", name: "Chocolate Obsession",
        size: "Ask about sizes & pricing",
        description: "Three layers of chocolate sponge cake soaked in chocolate milk, alternating with three layers of cream. Finished with a chocolate-caramel topping and grated chocolate.",
        priceImage: chocolateObsessionImage,
    },
    { id: "pistachio-tiramisu", name: "Pistachio Tiramisu", size: "Ask about sizes & pricing", description: "A pistachio twist on our Italian favorite.", priceImage: pistachioTiramisuImage },
    {
        id: "four-cookie-bag", name: "Bag of 4 Cookies", size: "4 cookies",
        priceImage: cookieBagImage,
        description: "Choose chocolate chips or peanut butter chips. A little bag of happiness, made to share or keep.", symbol: "④",
        prices: fourCookieBagPrices,
    },
    { id: "single-cookie", name: "Individual Cookie", size: "1 cookie", description: "A little cookie moment just for you.", priceImage: singleCookieImage },
];

const Prices = ({ sweets = false }) => {
    const { addToCart } = useCart();
    // Holiday / vacation notice for the order note (config/pickupSchedule.js).
    const pickupInfo = getPickupInfo();
    // Pauses apply to every order; closed/moved Thursdays only to sourdough pickups.
    const scheduleNotice = !pickupInfo.open || (pickupInfo.special && !sweets) ? pickupInfo.message : null;
    const [addedMessage, setAddedMessage] = useState("");

    const formatUSD = (price) =>
        Number(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    const featuredProducts = products.filter((product) => product.featured && sweetIds.has(product.id) === sweets);

    const sweetOrder = ["cookies-sweet", "snickerdoodles-sweet", "four-cookie-bag", "single-cookie", "spoonable-cookie", "tiramisu-sweet", "pistachio-tiramisu", "chocolate-obsession"];
    const displayedProducts = sweets
        ? [...featuredProducts, ...newSweets].sort((a, b) => sweetOrder.indexOf(a.id) - sweetOrder.indexOf(b.id))
        : featuredProducts;

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

            <div className="order-menu-context">
                <Link to="/orders">← All order menus</Link>
            </div>

            <section className="prices-section" id="weekly-menu" aria-labelledby="order-title">
                <Reveal as="header" className="prices-section-head">
                    <div>
                        <p className="prices-section-kicker reveal-up">from the oven</p>
                        <h1 id="order-title" className="reveal-up" style={{ "--rd": "0.1s" }}>
                            {sweets ? "A sweeter kind of menu." : "Your sourdough favorites."}
                        </h1>
                    </div>
                    <p className="reveal-up" style={{ "--rd": "0.2s" }}>{sweets ? "Individual treats, cookie bags, and boxes to share." : "Choose your favorites. We’ll take care of the slow part."}</p>
                </Reveal>

                {/* Order note: everything you need to know before adding to the cart. */}
                <Reveal as="section" className="order-note-scope" aria-label="Order details">
                    <div className="order-note reveal-up" style={{ "--rd": "0.3s" }}>
                        <p className="prices-intro">
                            {sweets ? "Cookies and desserts made without sourdough. A little treat for yourself, or something sweet to share." : "Naturally fermented breads and savory favorites. Real sourdough, made slowly and baked with intention."}
                        </p>
                        <div className="order-facts">
                            <div className="order-fact">
                                <ShoppingBag size={24} weight="bold" />
                                <span><small>Pickup</small>Canopy · Ocho Trece</span>
                            </div>
                            <div className="order-fact">
                                <Clock size={24} weight="bold" />
                                <span><small>{sweets ? "Cookies" : "Order by"}</small>{sweets ? "Same-day orders available" : "Tuesday · 8:00 PM"}</span>
                            </div>
                        </div>
                        {scheduleNotice && (
                            <p className={`order-schedule-notice ${pickupInfo.open ? "" : "order-schedule-notice--paused"}`} role="status">
                                {scheduleNotice}
                            </p>
                        )}
                        <p className="order-fact-note">
                            {sweets ? "Planning a celebration? Ask us about dates & quantities." : "no same-day orders · slow dough needs time"}
                        </p>
                    </div>
                </Reveal>

                <nav className="order-category-nav" aria-label="Order categories">
                    <Link to="/orders/sourdough" aria-current={!sweets ? "page" : undefined}>Sourdough</Link>
                    <Link to="/orders/sweets" aria-current={sweets ? "page" : undefined}>Cookies & sweets · no sourdough</Link>
                </nav>

                <div className="prices-grid">
                    {displayedProducts.map((product, index) => !newSweets.includes(product) ? (
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
                                            <span className="price-usd">{product.badge === "Coming Soon" ? "Price to be announced" : formatUSD(product.priceUSD)}</span>
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
                    ) : (
                        <article className="price-card order-new-sweet" id={product.id} key={product.id}>
                            {product.priceImage ? (
                                <div className="price-image-wrap">
                                    <img src={product.priceImage} alt={product.name} className="price-image" loading="lazy" />
                                </div>
                            ) : <div className="order-sweet-art" aria-hidden="true"><span>{product.symbol}</span><small>the sweet side of SOURAW</small></div>}
                            <div className="price-content">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="price-size">{product.size}</p>
                                {product.prices ? (
                                    <div className="multi-prices">
                                        {product.prices.map((option) => (
                                            <div className="price-option" key={option.label}>
                                                <div className="price-option-copy">
                                                    <p className="price-size">{option.label}</p>
                                                    <span className="price-usd">{formatUSD(option.priceUSD)}</span>
                                                </div>
                                                <button type="button" className="price-button" onClick={() => handleAddToCart(product, option)}>
                                                    add <span aria-hidden="true">＋</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <button type="button" className="price-button" onClick={openContactDrawer}>ask about this treat <ArrowUpRight size={18} /></button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {sweets && <Reveal as="section" className="order-celebrations">
                <p className="prices-section-kicker reveal-up">little treats, big celebrations</p>
                <h2 className="reveal-up" style={{ "--rd": "0.1s" }}>For you. For a few.<br />For the whole party.</h2>
                <p className="reveal-up" style={{ "--rd": "0.2s" }}>Order individual treats or plan something special for birthdays, catering, holidays, and special occasions. Tell us your date, guest count, and favorites so we can help with quantities and options.</p>
                <div className="reveal-up" style={{ "--rd": "0.3s" }}>
                    <button type="button" className="price-button" onClick={openContactDrawer}>plan a sweet celebration <ArrowUpRight size={18} /></button>
                </div>
            </Reveal>}

            <Reveal as="section" className="order-pickup" aria-labelledby="pickup-title">
                <div>
                    <p className="prices-section-kicker reveal-up">Tampa locals only</p>
                    <h2 id="pickup-title" className="reveal-up" style={{ "--rd": "0.1s" }}>{sweets ? <>Pick up your<br />sweet things.</> : <>Pick up your<br />order.</>}</h2>
                    <BrandSticker name="breadHug" className="souraw-sticker--pickup" />
                </div>
                <div className="order-pickup-copy journal-polaroid journal-polaroid--tilt-right" style={{ "--rd": "0.2s" }}>
                    <MapPin size={38} weight="fill" />
                    <h3>Canopy at Citrus Park</h3>
                    {sweets
                        ? <p>Thursday pickup at Canopy. Cookies can also be ordered for the same day — contact us to arrange pickup.</p>
                        : <p>Thursday pickup at Canopy at Citrus Park. Delivery availability depends on location.</p>}
                    <a href="https://maps.apple/p/ActVsYKEG6B18B" target="_blank" rel="noopener noreferrer">
                        Canopy location <ArrowUpRight size={18} weight="bold" />
                    </a>
                    {/* Second pickup place, for every order. */}
                    <div className="order-extra-pickup">
                        <h3>Ocho Trece</h3>
                        <a href="https://maps.apple/p/00yuXC9dmV7z3K" target="_blank" rel="noopener noreferrer">
                            Ocho Trece location <ArrowUpRight size={18} weight="bold" />
                        </a>
                        <p>Another place to pick up your {sweets ? "treats" : "order"}. Contact us to coordinate your pickup.</p>
                        <button type="button" className="price-button" onClick={openContactDrawer}>arrange pickup <ArrowUpRight size={18} /></button>
                    </div>
                </div>
            </Reveal>
        </main>
    );
};

export default Prices;
