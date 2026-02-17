import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, name, description, ingredients, price }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-description">{description}</p>
                {ingredients && (
                    <p className="product-description">
                        <span className="label">Ingredientes: </span> {ingredients}
                    </p>
                )}
                {/* {price && (
                    <p className="product-description">
                        <span className="label">Precio: </span> {price}
                    </p>
                )} */}
            </div>
        </div>
    );
};

export default ProductCard;