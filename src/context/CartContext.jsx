import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = JSON.parse(sessionStorage.getItem('souraw-payment-cart') || '[]');
            return Array.isArray(saved) && saved.every((item) => item && typeof item.id === 'string' && Number.isFinite(item.priceUSD) && Number.isInteger(item.quantity) && item.quantity > 0) ? saved : [];
        } catch { return []; }
    });

    useEffect(() => {
        // Keep the current quantities when returning from a canceled payment.
        if (sessionStorage.getItem('souraw-payment-cart')) {
            sessionStorage.setItem('souraw-payment-cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

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
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

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
                    ? { ...item, quantity: item.quantity + 1 }
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
        sessionStorage.removeItem('souraw-payment-cart');
        setCartItems([]);
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