import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { callBakeryPayment } from '../../utils/bakeryPayments';
import { useCart } from '../../context/CartContext';
import packingIllustration from '../../assets/souraw-bakery-packing.webp';
import './PaymentResult.css';

export default function PaymentResult() {
    const [params] = useSearchParams();
    const canceled = params.get('canceled') === '1';
    const sessionId = params.get('session_id');
    const [status, setStatus] = useState(canceled ? 'canceled' : 'checking');
    const { clearCart } = useCart();
    useEffect(() => {
        if (canceled) return;
        let active = true;
        callBakeryPayment('getBakeryPayment', { sessionId }).then(({ paid }) => {
            if (!active) return;
            setStatus(paid ? 'paid' : 'pending');
            if (paid) {
                sessionStorage.removeItem('souraw-payment-cart');
                clearCart();
            }
        }).catch(() => { if (active) setStatus('error'); });
        return () => { active = false; };
        // clearCart is a context callback recreated when the cart changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId, canceled]);
    const messages = {
        canceled: ['Payment canceled', 'Your cart is saved. Open it to try again.'],
        checking: ['Checking your payment…', 'Please wait while we confirm with Stripe.'],
        paid: ['Payment received ♡', 'Thank you! We will email your order confirmation and contact you to arrange your requested date and local pickup.'],
        pending: ['Payment is pending', 'Your payment has not been confirmed. Please check with SOURAW before placing another order.'],
        error: ['Unable to verify payment', 'Please contact SOURAW before paying again. Keep your Stripe receipt if you received one.'],
    };
    const paid = status === 'paid';
    return <main className={`payment-result payment-result--${status}`}>
        <section className="payment-receipt" aria-labelledby="payment-title" aria-live="polite">
            <div className="payment-receipt-top"><span>SOURAW</span><span>made slowly. with love.</span></div>
            <div className="payment-receipt-body">
                <div className="payment-art" aria-hidden="true">
                    <img src={packingIllustration} width="1100" height="853" decoding="async" alt="" />
                    <span className="payment-love-note">a little patience,<br />a lot of love.</span>
                </div>
                <div className="payment-copy">
                    <p className="payment-status"><span aria-hidden="true">{paid ? '✓' : '·'}</span> {paid ? messages[status][0] : 'Order update'}</p>
                    <p className="payment-handwritten">{paid ? 'you made our day.' : 'one little moment.'}</p>
                    <h1 id="payment-title">{paid ? <>Good things<br />are on their way.</> : messages[status][0]}</h1>
                    <p className="payment-description">{paid
                        ? 'Thank you for making SOURAW part of your table. Your payment is confirmed — we’ll take care of the slow, delicious part.'
                        : messages[status][1]}</p>
                    {paid && <div className="payment-next">
                        <p className="payment-next-label">WHAT HAPPENS NEXT</p>
                        <div><span className="payment-step">01</span><p><strong>A little note in your inbox</strong><span>Your order confirmation will arrive by email.</span></p></div>
                        <div><span className="payment-step">02</span><p><strong>Let’s make a pickup date</strong><span>We’ll be in touch to confirm your requested date and local pickup details.</span></p></div>
                    </div>}
                    <div className="payment-actions">
                        <Link className="payment-menu-link" to="/orders">Back to the menu <span aria-hidden="true">↗</span></Link>
                        <Link className="payment-contact-link" to="/contact">{paid ? 'A question about your order?' : 'Contact SOURAW'}</Link>
                    </div>
                </div>
            </div>
            <div className="payment-receipt-bottom"><span>untamed · unrushed · unapologetic</span><span aria-hidden="true">♡</span><span>Tampa, FL · small-batch goodness</span></div>
        </section>
        <p className="payment-signoff">Thanks for choosing slow.</p>
    </main>;
}
