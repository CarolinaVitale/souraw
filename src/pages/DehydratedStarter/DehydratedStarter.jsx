import React from "react";
import "./DehydratedStarter.css";
import starterKitImage from "../../assets/starter/dehydrated-starter.webp";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/fermentina.webp";

const kitItems = [
    "Dehydrated SOURAW starter",
    "Welcome card",
    "Feeding schedule",
    "Private QR activation guide",
    "Beginner-friendly visual support",
];

const steps = [
    {
        title: "Receive your starter",
        text: "Your starter arrives dehydrated, shelf-stable, and ready to wake up in your kitchen.",
    },
    {
        title: "Scan the private QR",
        text: "Inside your kit, you’ll find a QR code with the full activation guide and next steps.",
    },
    {
        title: "Feed and observe",
        text: "Follow the guide, watch for bubbles, and learn your starter’s rhythm one day at a time.",
    },
];

export default function DehydratedStarter() {
    return (
        <>
            <PageBanner
                image={bannerImage}
                kicker="A little piece of Souraw"
                title="YOUR STARTER STORY BEGINS HERE"
            />

            <main className="starter-product-page">
                <section className="starter-product-hero">
                    <div className="starter-product-copy">
                        <span>A little piece of SOURAW</span>
                        <h1>Dehydrated SOURAW Starter</h1>

                        <p>
                            Bring Fermentina home. This kit includes a dehydrated sourdough
                            starter and a private activation guide so you can wake her up with
                            confidence from Day 1.
                        </p>

                        <div className="starter-product-price-row">
                            <div className="starter-product-price">
                                <div>
                                    <span className="starter-launch-label">Launch price</span>

                                    <div className="starter-price-line">
                                        <strong>$22.99</strong>
                                        <s>$24.99</s>
                                    </div>

                                    <p>Dehydrated starter kit + private activation guide</p>
                                </div>
                            </div>

                            <div className="starter-free-shipping" aria-label="Free shipping">
                                <span>Free</span>
                                <strong>Shipping</strong>
                            </div>
                        </div>

                        <div className="starter-product-actions">
                            <a href="/shop" className="starter-product-button">
                                <small>I’m ready</small>
                                Get my starter
                            </a>

                            <a href="#what-includes" className="starter-product-secondary-button">
                                <span>Open the kit</span>
                                <strong>See what’s inside</strong>
                            </a>
                        </div>
                    </div>

                    <div className="starter-product-image">
                        <img src={starterKitImage} alt="Dehydrated SOURAW starter kit" />
                    </div>
                </section>

                <section className="starter-product-includes" id="what-includes">
                    <div className="starter-product-section-header">
                        <span>Inside the kit</span>
                        <h2>Everything you need to begin.</h2>
                        <p>
                            Simple, thoughtful, and beginner-friendly. No overcomplication, no
                            guessing.
                        </p>
                    </div>

                    <div className="starter-product-grid">
                        {kitItems.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </div>
                </section>

                <section className="starter-product-qr">
                    <div>
                        <span>Private guide included</span>
                        <h2>Your QR code unlocks the full activation guide.</h2>
                    </div>

                    <p>
                        The public page gives you the overview. The full step-by-step guide,
                        feeding rhythm, visual cues, troubleshooting, and care tips are included
                        privately inside your kit.
                    </p>
                </section>

                <section className="starter-product-how">
                    <div className="starter-product-section-header">
                        <span>How it works</span>
                        <h2>Dormant, not dead.</h2>
                        <p>
                            Dehydrated starter is simply sleeping. With flour, water, warmth, and
                            patience, it can become active again.
                        </p>
                    </div>

                    <div className="starter-product-steps">
                        {steps.map((step, index) => (
                            <article key={step.title}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="starter-product-note">
                    <h2>Perfect if you’re new to sourdough.</h2>
                    <p>
                        You don’t need to know everything before you start. The guide inside your
                        kit helps you understand when to feed, how to read your starter, what’s
                        normal, and what to avoid.
                    </p>

                    <a href="/shop" className="starter-product-button">
                        Bring Fermentina home
                    </a>
                </section>
            </main>
        </>
    );
}