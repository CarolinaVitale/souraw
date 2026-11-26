import React from "react";
import "../../styles/journal.css";
import "./ProductCard.css";
import useInViewOnce from "../../hooks/useInViewOnce";

const ProductCard = ({
    image,
    name,
    size,
    weight,
    description,
    ingredients,
    priceUSD,
    prices,
    available,
    badge,
    number,
}) => {
    const productSize = size || weight;
    const isComingSoon = badge === "Coming Soon";
    const [ref, inView] = useInViewOnce();
    // Photos tilt left and right alternately; cards in the same row enter one after another.
    const tilt = number % 2 === 1 ? "journal-polaroid--tilt-left" : "journal-polaroid--tilt-right";
    const delay = `${((number - 1) % 3) * 0.12}s`;

    return (
        <article ref={ref} className={`product-card journal-reveal ${inView ? "is-inview" : ""}`}>
            <figure
                className={`product-image-wrap journal-polaroid journal-polaroid--plain ${tilt}`}
                style={{ "--rd": delay }}
            >
                <img src={image} alt={name} className="product-image" loading="lazy" decoding="async" />
                <span className="product-number">{String(number).padStart(2, "0")}</span>
                {badge && <span className="product-badge">{badge}</span>}
            </figure>

            <div className="product-info">
                <div className="product-heading">
                    <h3 className="product-name">{name}</h3>
                    {productSize && <span className="product-weight">{productSize}</span>}
                </div>

                {description && (
                    <p className="product-description">{description}</p>
                )}

                {ingredients && (
                    <p className="product-ingredients">
                        <span>Ingredients</span>
                        {ingredients}
                    </p>
                )}

                <div className="product-footer">
                    <div className="product-prices">
                        {Array.isArray(prices) ? (
                            prices.map((price) => (
                                <span key={price.label}>
                                    <small>{price.label}</small>
                                    <strong>${price.priceUSD}</strong>
                                </span>
                            ))
                        ) : (
                            priceUSD > 0 && <strong>${priceUSD}</strong>
                        )}
                    </div>

                    {(available === false || isComingSoon) && (
                        <span className="product-availability">
                            {isComingSoon ? "Coming soon" : "Not currently available"}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
