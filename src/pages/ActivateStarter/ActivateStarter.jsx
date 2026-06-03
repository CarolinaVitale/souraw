// src/pages/ActivateStarter/ActivateStarter.jsx
import React from "react";
import "./ActivateStarter.css";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from '../../assets/fermentina.webp';

const steps = [
    {
        day: "Day 1",
        title: "Wake it up",
        text: "Place your dehydrated sourdough starter in a clean jar. Add 25g of warm filtered water and let it soften for 30 minutes. Then add 25g of flour and mix well.",
    },
    {
        day: "Day 2",
        title: "Feed it gently",
        text: "Discard half of the mixture. Add 25g water + 25g flour. Mix, cover loosely, and keep it in a warm spot.",
    },
    {
        day: "Day 3",
        title: "Look for bubbles",
        text: "Repeat the same feeding. You should start seeing small bubbles, a mild tangy smell, and some rise.",
    },
    {
        day: "Day 4–5",
        title: "Build strength",
        text: "Feed every 12 hours if it is bubbling and rising. Once it doubles in size after feeding, it is ready to bake with.",
    },
];

const ActivateStarter = () => {
    return (
        <>
            <PageBanner image={bannerImage} kicker="Let's wake it up" title="WELCOME TO THE JOURNEY" />

            <main className="starter-page">

                <section className="starter-hero">
                    <h5 className="starter-kicker">Meet Fermentina ♡</h5>
                    <h1>How to activate your dehydrated sourdough starter</h1>
                    <p>
                        Your starter is sleeping, not dead. With a little flour, water, warmth,
                        and patience, it will come back to life.
                    </p>
                </section>

                <section className="starter-note">
                    <h2>Before you start</h2>
                    <ul>
                        <li>Use a clean glass jar.</li>
                        <li>Use filtered or non-chlorinated water.</li>
                        <li>Keep it loosely covered, not sealed tight.</li>
                        <li>Place it somewhere warm, around 75–80°F if possible.</li>
                    </ul>
                </section>

                <section className="starter-steps">
                    {steps.map((step) => (
                        <article className="starter-step-card" key={step.day}>
                            <span>{step.day}</span>
                            <h2>{step.title}</h2>
                            <p>{step.text}</p>
                        </article>
                    ))}
                </section>

                <section className="starter-ready">
                    <h2>How do I know it is ready?</h2>
                    <p>Your starter is ready when it:</p>

                    <div className="starter-signs">
                        <div>rises after feeding</div>
                        <div>has visible bubbles</div>
                        <div>smells pleasantly tangy</div>
                        <div>doubles in 4–8 hours</div>
                    </div>
                </section>

                <section className="starter-trouble">
                    <h2>If nothing happens</h2>
                    <p>
                        Don’t panic. Sometimes dehydrated starter needs extra time to fully
                        wake up. Keep feeding once a day and make sure it stays warm. Avoid
                        throwing it away too soon — patience is part of the process.
                    </p>
                </section>
            </main>
        </>
    );
};

export default ActivateStarter;