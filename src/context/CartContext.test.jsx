import React from "react";
import { render, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

const bread = { id: "classic-bread", name: "Classic", size: "1kg", priceUSD: 8 };
let cart;
function Probe() {
    cart = useCart();
    return null;
}
const mount = () => render(<CartProvider><Probe /></CartProvider>);
const saved = () => JSON.parse(localStorage.getItem("souraw-cart") || "null");

beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
});

test("the cart is saved and comes back after a reload", () => {
    const first = mount();
    act(() => cart.addToCart(bread));
    act(() => cart.increaseQuantity("classic-bread"));
    expect(saved()).toEqual([expect.objectContaining({ id: "classic-bread", quantity: 2 })]);
    first.unmount();

    mount(); // a fresh page load
    expect(cart.cartItems).toEqual([expect.objectContaining({ id: "classic-bread", quantity: 2 })]);
    expect(cart.cartCount).toBe(2);
});

test("a completed order stops saving the cart; closing the thank-you empties it", () => {
    const page = mount();
    act(() => cart.addToCart(bread));
    act(() => cart.markOrderPlaced());
    expect(saved()).toBeNull();
    expect(cart.cartItems).toHaveLength(1); // still on screen behind the thank-you

    act(() => cart.clearCart());
    expect(cart.cartItems).toHaveLength(0);
    page.unmount();

    mount(); // reload after ordering
    expect(cart.cartItems).toHaveLength(0);
});

test("after an order, a new cart is saved again", () => {
    mount();
    act(() => cart.addToCart(bread));
    act(() => cart.markOrderPlaced());
    act(() => cart.clearCart());
    act(() => cart.addToCart(bread));
    expect(saved()).toHaveLength(1);
});

test("carts saved by the previous version (during a Stripe payment) are still restored", () => {
    sessionStorage.setItem("souraw-payment-cart", JSON.stringify([{ ...bread, cartId: "classic-bread", quantity: 1 }]));
    mount();
    expect(cart.cartItems).toHaveLength(1);
});

test("damaged saved data is ignored", () => {
    localStorage.setItem("souraw-cart", "{not json");
    mount();
    expect(cart.cartItems).toEqual([]);
});
