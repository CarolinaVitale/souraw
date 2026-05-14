import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, name, weight, description, ingredients }) => {
    return (
        <article className="product-card">
            <div className="product-image-wrap">
                <img src={image} alt={name} className="product-image" />
            </div>

            <div className="product-info">
                <div className="product-heading">
                    <h3 className="product-name">{name}</h3>
                    {weight && <span className="product-weight">{weight}</span>}
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
            </div>
        </article>
    );
};

export default ProductCard;