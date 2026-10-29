import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./CartDrawer.css";
import { useCart } from "../../context/CartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const CartDrawer = ({ isOpen, onClose }) => {
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const {
        cartItems,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    useEffect(() => {
        if (!isOpen || !cartItems.length) setCheckoutOpen(false);
    }, [isOpen, cartItems.length]);

    const formatUSD = (price) =>
        Number(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    // Keep fixed panels outside the header: its backdrop filter creates a containing block.
    return createPortal(
        <>
            <div
                className={`cart-overlay ${isOpen ? "open" : ""}`}
                onClick={onClose}
            />

            <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>{checkoutOpen ? "Checkout" : "Your cart"}</h2>
                    <button className="cart-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty.</p>
                        <span>Slow cravings start here ♡</span>
                    </div>
                ) : checkoutOpen ? (
                    <div className="cart-details-step">
                        <p className="cart-step-label">Step 2 of 2 · Your details</p>
                        <CheckoutForm onClose={() => setCheckoutOpen(false)} />
                    </div>
                ) : (
                    <>
                        <p className="cart-step-label">Step 1 of 2 · Review your order</p>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.cartId}>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-img"
                                        />
                                    )}

                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        {item.size && <p>{item.size}</p>}

                                        <span>{formatUSD(item.priceUSD)}</span>

                                        <div className="cart-qty">
                                            <button onClick={() => decreaseQuantity(item.cartId)}>
                                                −
                                            </button>

                                            <strong>{item.quantity}</strong>

                                            <button onClick={() => increaseQuantity(item.cartId)}>
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="cart-remove"
                                            onClick={() => removeFromCart(item.cartId)}
                                        >
                                            remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total</span>
                                <strong>{formatUSD(cartTotal)}</strong>
                            </div>

                                <button
                                    className="cart-checkout"
                                    type="button"
                                    onClick={() => setCheckoutOpen(true)}
                                >
                                    continue to checkout
                                </button>


                            <button className="cart-clear" onClick={clearCart}>
                                clear cart
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>,
        document.body
    );
};

export default CartDrawer;