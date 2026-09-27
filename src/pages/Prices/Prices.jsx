import React, { useState } from "react";
import { Clock, MapPin, ShoppingBag, ArrowUpRight } from "@phosphor-icons/react";
import "./Prices.css";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import sweetsImage from "../../assets/prices/cookies.webp";
import breadImage from "../../assets/prices/classic.webp";
import cookieBagImage from "../../assets/prices/four-cookie-bag.jpg";
import spoonableCookieImage from "../../assets/prices/spoonable-cookie.jpg";
import pistachioTiramisuImage from "../../assets/prices/pistachio-tiramisu.jpg";
import singleCookieImage from "../../assets/prices/chocolate-chip-single.jpg";
import chocolateObsessionImage from "../../assets/prices/chocolate-obsession.jpg";
import { Link } from "react-router-dom";
import { openContactDrawer } from "../../utils/contactDrawer";

const sweetIds = new Set(["tiramisu-sweet", "cookies-sweet", "snickerdoodles-sweet"]);
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
        prices: [
            { label: "4 cookies · Chocolate chips", priceUSD: 7 },
            { label: "4 cookies · Peanut butter chips", priceUSD: 7 },
        ],
    },
    { id: "single-cookie", name: "Individual Cookie", size: "1 cookie", description: "A little cookie moment just for you.", priceImage: singleCookieImage },
];

const Prices = ({ sweets = false }) => {
    const { addToCart } = useCart();
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

            <div className={`order-menu-context ${sweets ? "order-menu-context--sweets" : ""}`}>
                <Link to="/orders">← All order menus</Link>
                <strong>{sweets ? "Cookies & sweets · made without sourdough" : "Sourdough · naturally fermented"}</strong>
            </div>
            <section className="order-hero" aria-labelledby="order-title">
                <div className="order-hero-word" aria-hidden="true">{sweets ? "SWEET" : "SLOW"}</div>

                <div className="order-hero-copy">
                    <p className="prices-kicker">{sweets ? "small-batch sweets · Tampa local" : "fresh weekly · Tampa local"}</p>
                    <h1 id="order-title">{sweets ? "Cookies &" : "Real"}<br /><span>{sweets ? "sweet things." : "sourdough."}</span></h1>
                    <a className="order-jump" href="#weekly-menu">
                        explore the menu <ArrowUpRight size={19} weight="bold" />
                    </a>
                </div>

                <div className="order-hero-scene" aria-hidden="true">
                    <div className="order-photo-frame">
                        <img src={sweets ? sweetsImage : breadImage} alt="" />
                    </div>
                </div>
            </section>

            <nav className="order-category-nav" aria-label="Order categories">
                <Link to="/orders/sourdough" aria-current={!sweets ? "page" : undefined}>Sourdough</Link>
                <Link to="/orders/sweets" aria-current={sweets ? "page" : undefined}>Cookies & sweets · no sourdough</Link>
            </nav>

            <section className="order-details-strip" aria-label="Order details">
                <p className="prices-intro">
                    {sweets ? "Cookies and desserts made without sourdough. A little treat for yourself, or something sweet to share." : "Naturally fermented breads and savory favorites. Real sourdough, made slowly and baked with intention."}
                </p>
                <div className="order-facts">
                    <div className="order-fact">
                        <ShoppingBag size={24} weight="bold" />
                        <span><small>Pickup</small>{sweets ? "Canopy · Ocho Trece" : "Thursday at Canopy"}</span>
                    </div>
                    <div className="order-fact">
                        <Clock size={24} weight="bold" />
                        <span><small>{sweets ? "Cookies" : "Order by"}</small>{sweets ? "Same-day orders available" : "Tuesday · 8:00 PM"}</span>
                    </div>
                    <div className="order-fact order-fact-note">
                        {sweets ? "Planning a celebration? Ask us about dates & quantities." : "no same-day orders · slow dough needs time"}
                    </div>
                </div>
            </section>

            <section className="prices-section" id="weekly-menu">
                <header className="prices-section-head">
                    <div>
                        <p className="prices-section-kicker">from the oven</p>
                        <h2>{sweets ? "A sweeter kind of menu." : "Your sourdough favorites."}</h2>
                    </div>
                    <p>{sweets ? "Individual treats, cookie bags, and boxes to share." : "Choose your favorites. We’ll take care of the slow part."}</p>
                </header>

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

            {sweets && <section className="order-celebrations">
                <p className="prices-section-kicker">little treats, big celebrations</p>
                <h2>For you. For a few.<br />For the whole party.</h2>
                <p>Order individual treats or plan something special for birthdays, catering, holidays, and special occasions. Tell us your date, guest count, and favorites so we can help with quantities and options.</p>
                <button type="button" className="price-button" onClick={openContactDrawer}>plan a sweet celebration <ArrowUpRight size={18} /></button>
            </section>}

            <section className="order-pickup" aria-labelledby="pickup-title">
                <div className="order-pickup-word" aria-hidden="true">LOCAL</div>
                <div>
                    <p className="prices-section-kicker">Tampa locals only</p>
                    <h2 id="pickup-title">{sweets ? <>Pick up your<br />sweet things.</> : <>Meet me at<br />Canopy.</>}</h2>
                </div>
                <div className="order-pickup-copy">
                    <MapPin size={38} weight="fill" />
                    {sweets ? <>
                        <h3>Canopy at Citrus Park</h3>
                        <p>Thursday pickup at Canopy. Cookies can also be ordered for the same day — contact us to arrange pickup.</p>
                    </> : <p>Thursday pickup at Canopy at Citrus Park. Delivery availability depends on location.</p>}
                    <a href="https://maps.apple/p/ActVsYKEG6B18B" target="_blank" rel="noopener noreferrer">
                        Canopy location <ArrowUpRight size={18} weight="bold" />
                    </a>
                    {sweets && <div className="order-extra-pickup">
                        <h3>Ocho Trece</h3>
                        <a href="https://maps.apple/p/00yuXC9dmV7z3K" target="_blank" rel="noopener noreferrer">
                            Ocho Trece location <ArrowUpRight size={18} weight="bold" />
                        </a>
                        <p>Another place to pick up your treats. Contact us to coordinate your pickup.</p>
                        <button type="button" className="price-button" onClick={openContactDrawer}>arrange pickup <ArrowUpRight size={18} /></button>
                    </div>}
                </div>
            </section>
        </main>
    );
};

export default Prices;
