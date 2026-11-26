import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext();

// Same limits the payment server enforces (functions/bakery.js).
export const MAX_ITEM_QUANTITY = 50;
export const MAX_CART_LINES = 30;

const CART_STORAGE_KEY = "souraw-cart";
// Older builds kept the cart here only while paying on Stripe.
const LEGACY_PAYMENT_CART_KEY = "souraw-payment-cart";

const isValidCart = (items) =>
    Array.isArray(items) &&
    items.every((item) => item && typeof item.id === "string" && Number.isFinite(item.priceUSD) && Number.isInteger(item.quantity) && item.quantity > 0);

function loadSavedCart() {
    for (const [storage, key] of [[() => localStorage, CART_STORAGE_KEY], [() => sessionStorage, LEGACY_PAYMENT_CART_KEY]]) {
        try {
            const saved = JSON.parse(storage().getItem(key) || "[]");
            if (isValidCart(saved) && saved.length) return saved.slice(0, MAX_CART_LINES);
        } catch { /* unreadable or unavailable storage: try the next one */ }
    }
    return [];
}

function forgetSavedCart() {
    try { localStorage.removeItem(CART_STORAGE_KEY); } catch { /* unavailable */ }
    try { sessionStorage.removeItem(LEGACY_PAYMENT_CART_KEY); } catch { /* unavailable */ }
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(loadSavedCart);
    // After an order is placed the cart stays on screen (thank-you message),
    // but it is no longer saved, so a reload starts with an empty cart.
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Keep the cart across reloads and closed tabs until the order is complete.
    useEffect(() => {
        if (orderPlaced) return;
        try {
            if (cartItems.length) localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
            else localStorage.removeItem(CART_STORAGE_KEY);
        } catch { /* storage unavailable (private mode): the cart still works in memory */ }
    }, [cartItems, orderPlaced]);

    const addToCart = (product, option = null) => {
        const cartId = option
            ? `${product.id}-${option.label}`
            : product.id;

        const itemToAdd = {
            cartId,
            id: product.id,
            name: product.name,
            image: product.priceImage,
            size: option?.label || product.size || "",
            priceUSD: option?.priceUSD || product.priceUSD,
            quantity: 1,
        };

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.cartId === cartId);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.cartId === cartId
                        ? { ...item, quantity: Math.min(item.quantity + 1, MAX_ITEM_QUANTITY) }
                        : item
                );
            }

            if (prevItems.length >= MAX_CART_LINES) return prevItems;
            return [...prevItems, itemToAdd];
        });
    };

    const removeFromCart = (cartId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.cartId !== cartId)
        );
    };

    const increaseQuantity = (cartId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.cartId === cartId
                    ? { ...item, quantity: Math.min(item.quantity + 1, MAX_ITEM_QUANTITY) }
                    : item
            )
        );
    };

    const decreaseQuantity = (cartId) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        forgetSavedCart();
        setOrderPlaced(false);
        setCartItems([]);
    };

    // Called when an order is complete: the saved copy goes away right now,
    // while the on-screen cart is cleared when the thank-you message closes.
    const markOrderPlaced = () => {
        forgetSavedCart();
        setOrderPlaced(true);
    };

    const cartTotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.priceUSD * item.quantity,
            0
        );
    }, [cartItems]);

    const cartCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                markOrderPlaced,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};