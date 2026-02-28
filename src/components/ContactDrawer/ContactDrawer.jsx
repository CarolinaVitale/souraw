import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactDrawer.css";

export default function ContactDrawer({ isOpen, onClose }) {
    const formRef = useRef(null);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
            setStatus("idle");
            setErrorMsg("");
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus("sending");
        setErrorMsg("");

        try {
            const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
            const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
            const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

            if (!publicKey || !serviceId || !templateId) {
                throw new Error("Missing EmailJS env keys. Check your .env and restart dev server.");
            }

            await emailjs.sendForm(serviceId, templateId, formRef.current, {
                publicKey,
            });

            setStatus("success");
            formRef.current.reset();

            // opcional: cerrar automático luego de 2s
            // setTimeout(onClose, 2000);
        } catch (err) {
            setStatus("error");
            setErrorMsg(err?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`cd ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
            <button className="cd-overlay" onClick={onClose} aria-label="Close" />

            <aside className="cd-panel" role="dialog" aria-modal="true" aria-label="Contact">
                <div className="cd-topbar">
                    <button type="button" className="cd-backBtn" onClick={onClose} aria-label="Back">
                        <span className="cd-backIcon" aria-hidden="true"><i className="fa-solid fa-heart"></i></span>
                    </button>
                    <span className="cd-backLabel">BACK</span>
                </div>

                <div className="cd-header">
                    <h2 className="cd-title">Contact</h2>
                </div>

                <div className="cd-intro">
                    <p className="cd-introTitle">Let’s talk sourdough.</p>
                    <p className="cd-introText">
                        Questions, orders, or just saying hi — we’re happy to hear from you.
                    </p>
                </div>

                <form ref={formRef} className="cd-form" onSubmit={handleSubmit}>
                    <label className="cd-label is-required">
                        <input
                            className="cd-input"
                            type="text"
                            name="from_name"
                            placeholder="Name *"
                            required
                        />
                    </label>

                    <label className="cd-label is-required">
                        <input
                            className="cd-input"
                            type="email"
                            name="reply_to"
                            placeholder="Email *"
                            required
                        />
                    </label>

                    <label className="cd-label">
                        <input
                            className="cd-input"
                            type="text"
                            name="reason"
                            placeholder="Suject *"
                        />
                    </label>

                    <label className="cd-label is-required">
                        <textarea
                            className="cd-textarea"
                            name="message"
                            rows={4}
                            placeholder="Message *"
                            required
                        />
                    </label>

                    {status === "success" && (
                        <div className="cd-note cd-note--success">
                            Sent <i className="fa-solid fa-envelope-circle-check"></i> We’ll get back to you soon.
                        </div>
                    )}

                    {status === "error" && (
                        <div className="cd-note cd-note--error">
                            Oops — {errorMsg}
                        </div>
                    )}

                    <button type="submit" className="cd-submit" disabled={status === "sending"}>
                        {status === "sending" ? "Sending..." : "Submit"}
                    </button>
                </form>
            </aside>
        </div>
    );
}