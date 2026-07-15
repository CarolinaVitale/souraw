// src/pages/ActivateStarter/ActivateStarter.jsx
import React from "react";
import "./ActivateStarter.css";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/activated-starter.png";
import { sourawFind } from "../../data/sourawFinds";

import kingArthurImage from "../../assets/starter/king-arthur.webp";
import allTrumpsImage from "../../assets/starter/all-trumps.webp";
import ryeImage from "../../assets/starter/rye-flour.webp";

import sleepyImage from "../../assets/starter/sleepy.webp";
import wakingImage from "../../assets/starter/waking.webp";
import peakImage from "../../assets/starter/peak.webp";
import hungryImage from "../../assets/starter/hungry.webp";

import fermentinaFace from "../../assets/starter/fermentinaFace.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { starterTimeline, readySteps } from "../../data/starterTimeline";

const recommendedIds = ["flour", "glass-jar", "scale", "spatula", "marker", "nitrile-gloves"];

const recommendedTools = sourawFind.filter((item) =>
    recommendedIds.includes(item.id)
);

const starterStates = [
    {
        title: "Sleepy",
        image: sleepyImage,
        text: "Little or no bubbles yet. Normal during the first day.",
    },
    {
        title: "Waking up",
        image: wakingImage,
        text: "Tiny bubbles, slight smell, slow movement.",
    },
    {
        title: "Peak",
        image: peakImage,
        text: "Tall, bubbly, airy, and active. This is the best baking window.",
    },
    {
        title: "Hungry",
        image: hungryImage,
        text: "Collapsed, sharp smell, or liquid on top. Time to feed.",
    },
];

const flours = [
    {
        name: "King Arthur Bread Flour",
        tag: "Best beginner option",
        image: kingArthurImage,
        text: "Easy to find, reliable, and a great choice for activating your starter.",
    },
    {
        name: "All Trumps High Gluten Flour",
        tag: "What I use",
        image: allTrumpsImage,
        text: "The flour I personally use for SOURAW breads. Strong, consistent, and beautiful for fermentation.",
    },
    {
        name: "Whole Wheat or Rye Flour",
        tag: "Optional boost",
        image: ryeImage,
        text: "A small amount can help increase activity because whole grain flours ferment faster.",
    },
];

const ratios = [
    {
        ratio: "1:1:1",
        example: "25g starter + 25g flour + 25g water",
        speed: "Fast",
        bestFor: "Checking activity",
        bar: "25%",
    },
    {
        ratio: "1:2:2",
        example: "25g starter + 50g flour + 50g water",
        speed: "Balanced",
        bestFor: "Everyday feeding",
        bar: "45%",
    },
    {
        ratio: "1:5:5",
        example: "20g starter + 100g flour + 100g water",
        speed: "Slower",
        bestFor: "Longer peak",
        bar: "70%",
    },
    {
        ratio: "1:10:10",
        example: "10g starter + 100g flour + 100g water",
        speed: "Very slow",
        bestFor: "Maximum stability",
        bar: "100%",
    },
];

const troubleshooting = [
    {
        title: "Nothing happened after 24 hours",
        text: "That is normal. Dehydrated starter needs time to wake up. Keep feeding and keep it warm.",
    },
    {
        title: "It smells very strong",
        text: "It may be hungry or too acidic. Discard and feed with a higher ratio like 1:2:2.",
    },
    {
        title: "There is liquid on top",
        text: "That usually means your starter is hungry. Pour it off or mix it in, then feed.",
    },
    {
        title: "It rose and then collapsed",
        text: "That means it already passed its peak. Feed it again and watch the timing next time.",
    },
];

export default function ActivateStarter() {
    return (
        <>
            <PageBanner
                image={bannerImage}
                kicker="A little piece of Souraw"
                title="WELCOME TO THE FAMILY"
            />

            <main className="starter-page">
                <section className="starter-hero">
                    <p className="starter-kicker">Hi, I’m Carolina ♡</p>

                    <h1>Let’s bring your starter back to life.</h1>

                    <p>
                        Thank you for trusting me with a little piece of Fermentina. Your
                        starter is sleeping, not dead. With flour, water, warmth, and a
                        little patience, she will wake up again.
                    </p>

                    <a href="#day-1" className="starter-button">
                        Start Day 1 ↓
                    </a>

                    <img
                        src={fermentinaFace}
                        alt=""
                        className="starter-fermentina-face"
                        aria-hidden="true"
                    />
                </section>

                <section className="starter-story">
                    <div>
                        <span>Meet Fermentina</span>
                        <h2>Your starter has a story.</h2>
                    </div>

                    <p>
                        Fermentina has been part of my kitchen, my breads, and the beginning
                        of SOURAW. Today, a little piece of her is part of your kitchen too.
                    </p>
                </section>

                <section className="starter-progress">
                    <a href="#before">Before</a>
                    <a href="#day-1">Day 1</a>
                    <a href="#look">Look</a>
                    <a href="#feeding">Feeding</a>
                    <a href="#help">Help</a>
                </section>

                <section className="starter-note" id="before">
                    <h2>Before you start</h2>

                    <div className="starter-note-grid">
                        <div>Clean glass jar</div>
                        <div>Filtered water</div>
                        <div>Unbleached flour</div>
                        <div>Loose lid or cloth</div>
                        <div>Warm spot</div>
                        <div>Patience</div>
                    </div>

                    <p>
                        Keep your starter loosely covered, not sealed tight. A warm spot
                        around 75–80°F is ideal, but don’t panic if your kitchen is cooler.
                        Cold kitchens simply need more time.
                    </p>

                    <div className="starter-shop-note">
                        <div>
                            <span>Missing something?</span>

                            <p>
                                Keep it simple. A clean jar, good flour, a scale, and a spatula are all you really
                                need. If you're missing any of them, you'll find my favorites below.
                            </p>
                        </div>

                        <a href="#starter-tools" className="starter-shop-button">
                            My starter essentials →
                        </a>
                    </div>
                </section>

                <section className="starter-steps" id="day-1">
                    <div className="starter-section-header">
                        <span>The activation journey</span>
                        <h2>One day at a time</h2>
                        <p>
                            Don’t compare your starter. Watch the bubbles, the
                            smell, the rise, and the rhythm.
                        </p>
                    </div>

                    <div className="starter-timeline">
                        {starterTimeline.map((section) => (
                            <div className="starter-day-section" key={section.day}>
                                <div className="starter-day-header">
                                    <span>{section.day}</span>
                                    <h3>{section.subtitle}</h3>
                                </div>

                                {section.steps.map((step) => (
                                    <article className="starter-step-card" key={`${section.day}-${step.step}`}>
                                        <div className="starter-step-image">
                                            <img src={step.image} alt={`${section.day} ${step.step}`} />
                                        </div>

                                        <div>
                                            <div className="starter-step-day">
                                                <small>
                                                    <FontAwesomeIcon icon={faHeart} /> {step.step}
                                                </small>
                                            </div>

                                            <h3>{step.title}</h3>

                                            <div className="starter-diary">
                                                <strong>Fermentina’s diary</strong>
                                                <p>{step.diary}</p>
                                            </div>

                                            <div className="starter-step-text">
                                                {step.text}
                                            </div>

                                            <div className="fermentina-tip">
                                                <strong>Fermentina says:</strong> {step.tip}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="starter-states" id="look">
                    <div className="starter-section-header">
                        <span>Read your starter</span>
                        <h2>What should it look like?</h2>
                        <p>
                            This is the part that matters most: learning to observe what your
                            starter is telling you.
                        </p>
                    </div>

                    <div className="starter-states-grid">
                        {starterStates.map((state) => (
                            <article key={state.title}>
                                <img src={state.image} alt={state.title} />
                                <h3>{state.title}</h3>
                                <p>{state.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="starter-ready">
                    <div className="starter-section-header starter-ready-header">
                        <span>Read the peak</span>
                        <h2>How do I know it’s ready?</h2>

                        <p>
                            Your starter is ready when it reaches peak activity—not simply
                            because it doubled in size.
                        </p>
                    </div>

                    <div className="starter-signs">
                        <div>Rises predictably after feeding</div>
                        <div>Has visible bubbles</div>
                        <div>Smells pleasantly tangy</div>
                        <div>Reaches its highest point</div>
                    </div>

                    <div className="starter-ready-steps">
                        {readySteps.map((step) => (
                            <article className="starter-step-card" key={step.step}>
                                <div className="starter-step-image">
                                    <img
                                        src={step.image}
                                        alt={`${step.step}: ${step.title}`}
                                    />
                                </div>

                                <div>
                                    <div className="starter-step-day">
                                        <small>
                                            <FontAwesomeIcon icon={faHeart} />
                                            {step.step}
                                        </small>
                                    </div>

                                    <h3>{step.title}</h3>

                                    <div className="starter-diary">
                                        <strong>Fermentina’s diary</strong>
                                        <p>{step.diary}</p>
                                    </div>

                                    <div className="starter-step-text">
                                        {step.text}
                                    </div>

                                    <div className="fermentina-tip">
                                        <strong>Fermentina says:</strong> {step.tip}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="starter-myth">
                        <strong>The biggest sourdough myth: </strong>
                        Your starter is not ready simply because it doubled. The best moment
                        to bake is usually at peak activity—when it has stopped rising and
                        before it begins to fall significantly.
                    </div>
                </section>

                <section className="starter-ratios" id="feeding">
                    <div className="starter-section-header">
                        <span>Feeding ratios</span>
                        <h2>More food, more time</h2>
                        <p>
                            Feeding ratios describe the relationship between starter, flour,
                            and water.
                        </p>
                    </div>

                    <div className="starter-ratio-grid">
                        {ratios.map((item) => (
                            <article key={item.ratio}>
                                <h3>{item.ratio}</h3>
                                <p>{item.example}</p>
                                <span>{item.speed}</span>
                                <small>{item.bestFor}</small>

                                <div className="ratio-bar">
                                    <div style={{ width: item.bar }} />
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="starter-small-note">
                        The more food you give your starter, the longer it usually takes to
                        reach its peak — but the reward is a more stable starter and a much
                        larger window to bake.
                    </div>
                </section>

                <section className="starter-flour">
                    <div className="starter-section-header">
                        <span>Flour matters</span>
                        <h2>What flour should I use?</h2>
                        <p>
                            A strong bread flour is the easiest option. If you can, choose
                            unbleached flour for activation.
                        </p>
                    </div>

                    <div className="starter-flour-grid">
                        {flours.map((flour) => (
                            <article className="starter-flour-card" key={flour.name}>
                                <img src={flour.image} alt={flour.name} />
                                <span>{flour.tag}</span>
                                <h3>{flour.name}</h3>
                                <p>{flour.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="starter-maintenance">
                    <h2>How to maintain your starter</h2>

                    <p className="starter-big-line">
                        Refrigerate only when your starter is healthy and predictable.
                    </p>

                    <ul>
                        <li>Feed your starter before placing it in the refrigerator.</li>
                        <li>
                            Feed at least once a week, preferably before it becomes overly
                            acidic.
                        </li>
                        <li>Always feed with more flour and water than starter.</li>
                        <li>Keep only a small amount before each feeding.</li>
                        <li>
                            Before baking, feed it once or twice at room temperature to build
                            strength.
                        </li>
                    </ul>
                </section>


                <section className="starter-dont">
                    <div className="starter-section-header">
                        <span>Read your starter</span>
                        <h2>Common mistakes to avoid</h2>
                        <p>
                            Your starter doesn't care what time it is.
                            It follows its own rhythm — your job is simply to learn how to read it.
                        </p>
                    </div>

                    <div className="starter-dont-grid">

                        <div>
                            <strong>Don't panic.</strong>
                            <p>
                                Your starter doesn't have to bubble on Day 1.
                                Some starters simply need more time to wake up.
                            </p>
                        </div>

                        <div>
                            <strong>Don't feed it before it shows activity.</strong>
                            <p>
                                Wait until you see the first signs of fermentation,
                                like small bubbles or a slight rise.
                            </p>
                        </div>

                        <div>
                            <strong>Don't wait if it's already hungry.</strong>
                            <p>
                                If your starter rises and then begins to fall before 24 hours,
                                feed it. Don't wait until the next day.
                            </p>
                        </div>

                        <div>
                            <strong>Don't use a jar with detergent residue.</strong>
                            <p>
                                If your jar comes straight from the dishwasher, rinse it thoroughly
                                with clean water before using it. Detergent residue can interfere with
                                fermentation, especially while your starter is waking up.
                            </p>
                        </div>
                        <div>
                        <strong>Don’t eyeball it.</strong>
                            <p>
                                If you want consistent results, measure by weight—not by cups. Pair it with consistent feeding times, and your starter will become much more predictable.

                            </p>
                        </div>

                        <div>
                            <strong>Don't compare it to someone else's starter.</strong>
                            <p>
                                Every kitchen is different.
                                Temperature, flour and hydration all affect fermentation.
                            </p>
                        </div>

                    </div>

                    <div className="starter-hungry-guide">
                        <div>
                            <span>Starter check</span>
                            <h3>How do you know it’s hungry?</h3>
                            <p>
                                Your starter usually tells you it needs food after it reaches peak
                                activity and begins to slow down.
                            </p>
                        </div>

                        <ul>
                            <li>It reached its highest point.</li>
                            <li>It has started to collapse.</li>
                            <li>The surface looks flatter.</li>
                            <li>The bubbles are shrinking.</li>
                            <li>The smell becomes more tangy.</li>
                        </ul>
                    </div>

                    <div className="starter-small-note">
                        <strong>Remember:</strong><br />
                        Your starter follows its own rhythm, not the clock.
                        Learn to read the signs, and it will tell you exactly what it needs.
                    </div>

                </section>

                <section className="starter-tools" id="starter-tools">
                    <div className="starter-section-header">
                        <span>Keep baking</span>
                        <h2>Tools I actually use</h2>
                        <p>
                            Simple things that make sourdough cleaner, easier, and more
                            consistent.
                        </p>
                    </div>

                    <div className="starter-tools-grid">
                        {recommendedTools.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="starter-tool-card"
                            >
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                {item.description && <p>{item.description}</p>}
                                <span>find it here ↗</span>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="starter-troubleshooting">
                    <div className="starter-section-header starter-trouble-header">
                        <span>Don’t panic</span>
                        <h2>Troubleshooting</h2>
                        <p>Most starter problems are fixable. Here’s where to start.</p>
                    </div>

                    <div className="starter-trouble-grid">
                        {troubleshooting.map((item, index) => (
                            <article key={item.title} className="starter-trouble-card">
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="starter-support" id="help">
                    <span>Need help?</span>
                    <h2>You’re not baking alone.</h2>

                    <p>
                        If your starter isn’t behaving the way you expected, send me a DM or
                        an email. I personally answer every message and I’ll help you figure
                        it out.
                    </p>

                    <div className="starter-support-actions">
                        <a
                            href="https://instagram.com/souraw.cv"
                            target="_blank"
                            rel="noreferrer"
                        >
                            DM me on Instagram
                        </a>
                    </div>
                </section>

                <section className="starter-final">
                    <h2>Welcome to slow baking.</h2>

                    <p>
                        Some loaves won’t be perfect. Some days your starter won’t
                        cooperate. Some recipes will surprise you. That’s part of the
                        journey.
                    </p>

                    <p>Thank you for choosing SOURAW. I’m so happy you’re here.</p>

                    <strong>♡</strong>
                </section>
            </main>
        </>
    );
}