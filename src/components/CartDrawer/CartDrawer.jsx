import React, { useState } from "react";
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

    const formatUSD = (price) =>
        Number(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    return (
        <>
            <div
                className={`cart-overlay ${isOpen ? "open" : ""}`}
                onClick={onClose}
            />

            <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>Your cart</h2>
                    <button className="cart-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty.</p>
                        <span>Slow cravings start here ♡</span>
                    </div>
                ) : (
                    <>
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

                                {checkoutOpen && (
                                    <CheckoutForm onClose={() => setCheckoutOpen(false)} />
                                )}

                            <button className="cart-clear" onClick={clearCart}>
                                clear cart
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;