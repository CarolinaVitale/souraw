import React from "react";
import "./ProductCard.css";

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

    return (
        <article className="product-card">
            <div className="product-image-wrap">
                <img src={image} alt={name} className="product-image" />
                <span className="product-number">{String(number).padStart(2, "0")}</span>
                {badge && <span className="product-badge">{badge}</span>}
            </div>

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
