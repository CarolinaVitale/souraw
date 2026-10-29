import React, { useState, useRef } from "react";
import { bakeryPaymentsEnabled, callBakeryPayment } from "../../utils/bakeryPayments";
import emailjs from "@emailjs/browser";
import "./CheckoutForm.css";
import { useCart } from "../../context/CartContext";

const CheckoutForm = ({ onClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        deliveryDate: "",
        notes: "",
    });

    const checkoutAttempt = useRef(null);
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false);

    const formatUSD = (price) =>
        Number(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    const orderDetails = cartItems
        .map(
            (item) =>
                `${item.name}${item.size ? ` — ${item.size}` : ""} x${item.quantity} — ${formatUSD(
                    item.priceUSD * item.quantity
                )}`
        )
        .join("\n");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleThankYouClose = () => {
        clearCart();
        onClose();
    };

    const handleClose = () => {
        if (status === "success") {
            handleThankYouClose();
        } else {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cartItems.length) return;

        setIsSending(true);
        setStatus("");

        if (bakeryPaymentsEnabled) {
            try {
                const payload = {
                    items: cartItems.map(({ id, size, quantity }) => ({ id, size, quantity })),
                    customer: formData,
                };
                const fingerprint = JSON.stringify(payload);
                if (checkoutAttempt.current?.fingerprint !== fingerprint) {
                    checkoutAttempt.current = { fingerprint, requestId: crypto.randomUUID() };
                }
                const { url } = await callBakeryPayment('createBakeryCheckout', {
                    ...payload, requestId: checkoutAttempt.current.requestId,
                });
                const destination = new URL(url);
                if (destination.protocol !== 'https:' || destination.hostname !== 'checkout.stripe.com') {
                    throw new Error('Invalid payment destination');
                }
                sessionStorage.setItem('souraw-payment-cart', JSON.stringify(cartItems));
                window.location.assign(url);
            } catch (error) {
                setStatus('error');
                setIsSending(false);
            }
            return;
        }

        const templateParams = {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            delivery_date: formData.deliveryDate,
            customer_notes: formData.notes,
            order_details: orderDetails,
            order_total: formatUSD(cartTotal),
        };

        try {
            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID2,
                templateParams,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );

            setStatus("success");
        } catch (error) {
            console.error("EmailJS error:", error.text || error);
            alert(error.text || "EmailJS error");
            setStatus("error");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="checkout-form-wrap">
            <div className="checkout-form-header">
                <h3>Your details</h3>
                <button type="button" onClick={handleClose} disabled={isSending}>
                    ← Back to cart
                </button>
            </div>

            {status === "success" ? (
                <section className="order-thank-you">
                    <p className="order-thank-you-kicker">Order received</p>

                    <h2>Thank you for trusting SOURAW ♡</h2>

                    <p>
                        Your order is now part of our next bake.
                        <br />
                        We’ll review the details and send your confirmation soon.
                    </p>

                    <button
                        type="button"
                        className="order-thank-you-button"
                        onClick={handleThankYouClose}
                    >
                        close
                    </button>
                </section>
            ) : (
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <fieldset disabled={isSending} style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: "contents" }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="deliveryDate"
                        placeholder="Preferred delivery date"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes / allergies / special requests"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <div className="checkout-summary">
                        <strong>Order:</strong>
                        <pre>{orderDetails}</pre>
                        <p>Total: {formatUSD(cartTotal)}</p>
                    </div>

                    {bakeryPaymentsEnabled && <p>Tampa local orders only; we will confirm your requested date and pickup details.</p>}
                    <button className="checkout-submit" type="submit" disabled={isSending}>
                        {isSending ? (bakeryPaymentsEnabled ? "opening secure payment…" : "sending...") : (bakeryPaymentsEnabled ? "continue to payment" : "place order")}
                    </button>

                    {status === "error" && (
                        <p className="checkout-error">
                            We could not complete this step. Please try again or contact SOURAW.
                        </p>
                    )}
                    </fieldset>
                </form>
            )}
        </div>
    );
};

export default CheckoutForm;