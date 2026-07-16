import React from "react";
import "./UnrushedLab.css";
import bannerImage from "../../assets/unrushed-lab.webp";
import starterKitImage from "../../assets/starter/dehydrated-starter.webp";
import starterPreviewImage from "../../assets/starter-deh.webp";
import wildStartImage from "../../assets/starter/day4-fed.webp";
import fermentinaFace from "../../assets/brand-elements/face-red.png";
import starterMagnifier from "../../assets/brand-elements/element.png";
import breadIllustration from "../../assets/brand-elements/bread-illustration.png";
import sourawStamp from "../../assets/brand-elements/souraw-stamp.png";

const DEHYDRATED_STARTER_LINK = process.env.REACT_APP_DEHYDRATED_STARTER_LINK;

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
        text: "Inside your kit, you'll find a QR code with the full activation guide and next steps.",
    },
    {
        title: "Feed and observe",
        text: "Follow the guide, watch for bubbles, and learn your starter's rhythm one day at a time.",
    },
];

export default function UnrushedLab() {
    return (
        <main className="starter-product-page">
            <section className="lab-page-hero">
                <div className="lab-hero-word" aria-hidden="true">LAB</div>

                <div className="lab-page-hero-copy">
                    <p className="lab-script">start slow. keep going.</p>
                    <h1>
                        The Unrushed
                        <span>Lab.</span>
                    </h1>
                    <a href="#lab-shop" className="lab-pill-button lab-pill-button-red">
                        Choose your beginning <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <div className="lab-page-hero-visual">
                    <div className="lab-hero-frame">
                        <img src={bannerImage} alt="SOURAW starter and handmade sourdough details" />
                    </div>
                    <span className="lab-sticker lab-sticker-pink">Fermentina lives here</span>
                    <span className="lab-sticker lab-sticker-yellow">learn at your pace</span>
                </div>
            </section>

            <p className="photo-banner-summary">
                Sourdough learning for curious bakers who want less waste,
                more confidence, and no pressure to get it perfect.
            </p>

            <div className="lab-ticker" aria-hidden="true">
                <div>
                    <span>NO RUSH • LESS WASTE • MORE BUBBLES • TRUST THE PROCESS • </span>
                    <span>NO RUSH • LESS WASTE • MORE BUBBLES • TRUST THE PROCESS • </span>
                    <span>NO RUSH • LESS WASTE • MORE BUBBLES • TRUST THE PROCESS • </span>
                    <span>NO RUSH • LESS WASTE • MORE BUBBLES • TRUST THE PROCESS • </span>
                    <span>NO RUSH • LESS WASTE • MORE BUBBLES • TRUST THE PROCESS • </span>

                </div>
            </div>

            <section className="unrushed-product-shop" id="lab-shop">
                <div className="lab-background-word" aria-hidden="true">BEGIN</div>
                <div className="starter-product-section-header">
                    <span>Unrushed Lab</span>
                    <h2>Choose your beginning.</h2>
                    <p>
                        Start with a living piece of SOURAW, or wait for the digital guide
                        built for slow, intentional sourdough learning.
                    </p>
                </div>

                <div className="unrushed-product-cards">
                    <article className="unrushed-product-card unrushed-product-card-featured">
                        <div className="unrushed-product-card-image">
                            <img src={starterPreviewImage} alt="Dehydrated SOURAW starter activation" />
                        </div>

                        <div className="unrushed-product-card-content">
                            <span>Physical kit</span>
                            <h3>Dehydrated SOURAW Starter</h3>
                            <p>
                                Bring Fermentina home and wake her up with a private activation
                                guide.
                            </p>

                            <div className="unrushed-product-card-footer">
                                <strong>$22.99</strong>

                                <a
                                    href={DEHYDRATED_STARTER_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lab-pill-button lab-pill-button-dark"
                                >
                                    Get my starter <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                        </div>
                    </article>

                    <article
                        className="unrushed-product-card unrushed-product-card-coming-soon"
                        data-status="coming-soon"
                    >
                        <div className="unrushed-product-card-image">
                            <img src={wildStartImage} alt="SOURAW Wild Starter guide" />
                        </div>

                        <div className="unrushed-product-card-content">
                            <span>Digital guide · Coming soon</span>
                            <h3>SOURAW Wild Starter</h3>
                            <p>
                                A beginner-friendly digital guide to create your own sourdough
                                starter from scratch, with less waste and no daily guesswork.
                            </p>

                            <div className="unrushed-product-card-footer">
                                <strong className="lab-coming-soon-price">Not available yet</strong>

                                <button
                                    type="button"
                                    className="lab-pill-button lab-pill-button-disabled"
                                    disabled
                                >
                                    Coming soon
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section className="starter-product-hero">
                <div className="starter-product-copy">
                    <span>A little piece of SOURAW</span>
                    <h2>Bring Fermentina home.</h2>

                    <p>
                        This kit includes a dehydrated sourdough starter and a private
                        activation guide so you can wake her up with confidence from Day 1.
                    </p>

                    <div className="starter-product-price-row">
                        <div className="starter-product-price">
                            <span className="starter-launch-label">Launch price</span>
                            <div className="starter-price-line">
                                <strong>$22.99</strong>
                                <s>$24.99</s>
                            </div>
                            <p>Dehydrated starter kit + private activation guide</p>
                        </div>

                        <div className="starter-free-shipping" aria-label="Free shipping in the US">
                            <span>FREE</span>
                            <strong>Shipping</strong>
                            <small>US ONLY</small>
                        </div>
                    </div>

                    <div className="starter-product-actions">
                        <a
                            href={DEHYDRATED_STARTER_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lab-pill-button lab-pill-button-red"
                        >
                            Get my starter <span aria-hidden="true">↗</span>
                        </a>

                        <a href="#what-includes" className="lab-text-link">
                            See what's inside ↓
                        </a>
                    </div>
                </div>

                <div className="starter-product-image">
                    <img src={starterKitImage} alt="Dehydrated SOURAW starter kit" />
                    <span className="lab-sticker lab-sticker-pink">ships to you</span>
                </div>
            </section>

            <section className="starter-product-includes" id="what-includes">
                <div className="lab-background-word" aria-hidden="true">INSIDE</div>
                <img
                    className="lab-brand-element lab-brand-fermentina"
                    src={fermentinaFace}
                    alt=""
                    aria-hidden="true"
                />
                <span className="lab-brand-note lab-brand-note-kit" aria-hidden="true">
                    feed · wait · watch
                </span>
                <div className="starter-product-section-header">
                    <span>Inside the kit</span>
                    <h2>Everything you need to begin.</h2>
                    <p>
                        Simple, thoughtful, and beginner-friendly. No overcomplication, no
                        guessing.
                    </p>
                </div>

                <div className="starter-product-grid">
                    {kitItems.map((item, index) => (
                        <div key={item}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="starter-product-qr">
                <img
                    className="lab-brand-element lab-brand-magnifier"
                    src={starterMagnifier}
                    alt=""
                    aria-hidden="true"
                />
                <span className="lab-brand-note lab-brand-note-scan" aria-hidden="true">
                    look for bubbles ↗
                </span>
                <div>
                    <span>Private guide included</span>
                    <h2>Your QR code unlocks the full activation guide.</h2>
                </div>

                <p>
                    The full step-by-step guide, feeding rhythm, visual cues,
                    troubleshooting, and care tips are included privately inside your kit.
                </p>
            </section>

            <section className="starter-product-how">
                <img
                    className="lab-brand-element lab-brand-bread"
                    src={breadIllustration}
                    alt=""
                    aria-hidden="true"
                />
                <div className="starter-product-section-header">
                    <span>How it works</span>
                    <h2>Quiet now, bubbly soon.</h2>
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
                <img
                    className="lab-brand-element lab-brand-stamp"
                    src={sourawStamp}
                    alt=""
                    aria-hidden="true"
                />
                <p className="lab-script">you do not need to know everything.</p>
                <h2>Perfect if you're new to sourdough.</h2>
                <p>
                    The guide inside your kit helps you understand when to feed, how to read
                    your starter, what's normal, and what to avoid.
                </p>

                <a
                    href={DEHYDRATED_STARTER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-pill-button lab-pill-button-cream"
                >
                    Bring Fermentina home <span aria-hidden="true">↗</span>
                </a>
            </section>
        </main>
    );
}
