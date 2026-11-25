import React, { useState } from 'react';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import { useCart } from '../../context/CartContext';
import { bakeryPaymentsEnabled } from '../../utils/bakeryPayments';
import './Orders.css';

const testProduct = {
    id: 'checkout-test',
    name: 'SOURAW checkout test',
    size: 'One test payment',
    priceUSD: 1,
};

export default function CheckoutTest() {
    const { cartItems, addToCart } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const available = bakeryPaymentsEnabled && Date.now() < Date.parse('2026-12-03T05:00:00Z');
    const hasTest = cartItems.some(({ id }) => id === testProduct.id);
    const hasOtherItems = cartItems.some(({ id }) => id !== testProduct.id);

    function openCart() {
        if (!hasOtherItems && !hasTest) addToCart(testProduct);
        setCartOpen(true);
    }

    return (
        <main className="schedule-page">
            <section className="schedule-cta">
                <h1>SOURAW checkout test</h1>
                {available ? (
                    <>
                        <p>This is a real $1.00 USD charge for a checkout test. No items will be delivered.</p>
                        {hasOtherItems && <p>Remove your other items to run the test by itself.</p>}
                        <button type="button" className="schedule-pill schedule-pill-cream" onClick={openCart}>
                            {hasOtherItems ? 'Review your cart' : 'Open test cart'}
                        </button>
                    </>
                ) : <p>This checkout test is closed.</p>}
            </section>
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </main>
    );
}
