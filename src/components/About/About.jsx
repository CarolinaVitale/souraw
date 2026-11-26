import BrandSticker from '../BrandSticker/BrandSticker';
// About.jsx
import React, { useEffect, useRef } from "react";
import "../../styles/journal.css";
import "./About.css";
import useInViewOnce from "../../hooks/useInViewOnce";

import baby from "../../assets/baby.jpg";
import butterfly from "../../assets/butterfly.jpg";
import newyork from "../../assets/new-york.jpg";
import madrid from "../../assets/madrid.jpg";
import venezuela from "../../assets/martino.optimized.webp";
import tampa from "../../assets/viaje.optimized.webp";
import founder from "../../assets/founder2.png";
import founder2 from "../../assets/founder.optimized.webp";
import family from "../../assets/family.jpeg";
import bread from "../../assets/result.jpeg";

import aboutImage from "../../assets/banner1.webp";

const TIMELINE = [
    {
        year: "",
        title: "",
        body:
            "My name is Carolina Vitale. I was born in Venezuela and raised in a very small town called Acarigua. All four of my grandparents were Italian, so I grew up surrounded by tradition — especially in the kitchen. Flour on the counter, long conversations around the table, hands always preparing something with love.",
        image: baby,
    },
    {
        year: "",
        title: "",
        body:
            "Since I was little, I’ve been deeply curious. I always dreamed of traveling, of seeing the world. If I’m honest, I never truly felt like I belonged while living in Venezuela. I was grateful — but restless.",
        image: butterfly,
    },
    {
        year: "2014",
        title: "NEW YORK",
        body:
            "In 2014, I lived alone in New York for a few months. They were some of the best months of my life. I had plans to study there, to build a future for myself. But God had a different plan.",
        image: newyork,
    },
    {
        year: "2018",
        title: "MADRID",
        body:
            "In 2018, I moved to Madrid. Madrid gave me two Master’s degrees, a complete career change, a husband, and a son. It gave me so much. And yet… deep down, I knew it still wasn’t fully my place.",
        image: madrid,
    },
    {
        year: "2023",
        title: "VENEZUELA",
        body: [
            "In 2023, I returned to Venezuela. That’s when my stomach problems began. What felt at first like a physical discomfort slowly became something more — a wake-up call. I started researching fermentation and sourdough, trying to understand how food could heal. I enrolled in my first course.",
            "It was love at first sight.",
        ],
        image: venezuela,
    },
    {
        year: "2024",
        title: "TAMPA",
        body: [
            "In 2024, I spent three months in Tampa. The first week, I ate a hot dog and genuinely thought I was going to die from the pain in my stomach. Two weeks later, Fermentina — my sourdough starter — was born.",
            "She didn’t just change the way I bake. She changed the way I live.",
        ],
        image: tampa,
    },
    {
        year: "",
        title: "",
        body: [
            "The last two years haven’t been easy. There’s been a lot of trial and error, frustration, deep breaths in the middle of the night, dough ending up in the trash, moments where I wanted to quit — and moments where I chose not to.",
        ],
        image: bread,
    },
    {
        year: "",
        title: "",
        body: [
            "Somewhere along the way, my father told me that my Nonna — his mother — also used to bake bread. That felt like a whisper from the past. Like a thread connecting generations. Like something in my blood quietly waiting to wake up.",
        ],
        image: family,
    },
    {
        year: "",
        title: "",
        body: [
            "But Souraw is more than sourdough — as powerful as that already is.",
            "It is a tribute to my roots.",
            "It is the connection I found with my mother during one of the quietest, hardest seasons of my life.",
            "It is discovering who I am.",
            "It is recognizing what I’m capable of.",
            "When my mom was diagnosed with Alzheimer’s, something inside me broke — and something else quietly began. Bread became ritual. Fermentation became patience. Waiting became healing. In the silence, I found her. And I found myself.",
        ],
        image: founder,
        round: true,
    },
    {
        year: "",
        title: "",
        body: [
            "After years of searching for where I belonged, I finally found work that nourishes me — physically and mentally — and allows me to nourish others too.",
            "Souraw is not just bread.",
            "It is resilience.",
            "It is memory.",
            "It is heritage.",
            "It is healing.",
        ],
        image: founder2,
        round: true,
    },
];

/* One timeline entry: polaroid, dot on the line, and the card.
   Its entrance runs once, the first time it scrolls into view. */
function TimelineItem({ item, idx }) {
    const [ref, inView] = useInViewOnce();
    const flipped = idx % 2 === 1;
    const number = String(idx + 1).padStart(2, "0");
    const paragraphs = Array.isArray(item.body) ? item.body : [item.body];

    return (
        <article
            ref={ref}
            className={`abt-item journal-reveal ${flipped ? "abt-item--flip" : ""} ${inView ? "is-inview" : ""}`}
        >
            <div className="abt-media">
                <figure
                    className={`journal-polaroid journal-polaroid--plain abt-polaroid ${
                        flipped ? "journal-polaroid--tilt-right journal-polaroid--yellow-tape" : "journal-polaroid--tilt-left"
                    }`}
                    style={{ "--rd": "0.05s" }}
                >
                    {item.round ? (
                        <div className="abt-photo-crop">
                            <img src={item.image} alt={`${item.year || "story"}`} loading="lazy" decoding="async" />
                        </div>
                    ) : (
                        <img src={item.image} alt={`${item.year || "story"}`} loading="lazy" decoding="async" />
                    )}
                </figure>
            </div>

            <div className="abt-mid" aria-hidden="true">
                <span className="abt-dot" />
            </div>

            <div className="abt-content reveal-up" style={{ "--rd": "0.2s" }}>
                <header className={`abt-cardhead ${item.year || item.title ? "" : "abt-cardhead--number"}`}>
                    <span className="abt-index">{number}</span>
                    {item.year && <span className="abt-year">{item.year}</span>}
                    {item.title && <h3 className="abt-title">{item.title}</h3>}
                </header>

                <div className="abt-bodyGroup">
                    {paragraphs.map((p, i) => (
                        <p key={i} className="abt-body">
                            {p}
                        </p>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default function AboutTimeline() {
    const timelineRef = useRef(null);
    const [introRef, introInView] = useInViewOnce();
    const [endRef, endInView] = useInViewOnce();

    // The line runs from the first dot to the last one; its solid part
    // fills in as you scroll, over the dotted part still to go.
    useEffect(() => {
        const timelineEl = timelineRef.current;
        if (!timelineEl) return undefined;

        const setLineOffsets = () => {
            const dots = timelineEl.querySelectorAll(".abt-dot");
            if (!dots.length) return;

            const tlRect = timelineEl.getBoundingClientRect();
            const firstRect = dots[0].getBoundingClientRect();
            const lastRect = dots[dots.length - 1].getBoundingClientRect();

            const firstCenter = firstRect.top - tlRect.top + firstRect.height / 2;
            const lastCenter = lastRect.top - tlRect.top + lastRect.height / 2;

            timelineEl.style.setProperty("--lineTop", `${Math.max(0, firstCenter)}px`);
            timelineEl.style.setProperty("--lineBottom", `${Math.max(0, tlRect.height - lastCenter)}px`);
        };

        const updateProgress = () => {
            const rect = timelineEl.getBoundingClientRect();
            const lineTop = parseFloat(getComputedStyle(timelineEl).getPropertyValue("--lineTop")) || 0;
            const lineBottom = parseFloat(getComputedStyle(timelineEl).getPropertyValue("--lineBottom")) || 0;

            const usable = Math.max(1, rect.height - lineTop - lineBottom);
            const start = window.innerHeight * 0.65;
            const current = start - (rect.top + lineTop);

            const progress = Math.min(1, Math.max(0, current / usable));
            timelineEl.style.setProperty("--lineProgress", String(progress));
        };

        const onResize = () => {
            setLineOffsets();
            updateProgress();
        };

        onResize();
        const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
        resizeObserver?.observe(timelineEl);
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <>
            <section className="about-hero">
                <div className="about-hero-word" aria-hidden="true">ROOTS</div>

                <div className="about-hero-copy">
                    <p className="about-script">memory, heritage & healing</p>
                    <h1>
                        Bread brought
                        <span>me home.</span>
                    </h1>
                    <a href="#about" className="about-pill about-pill-red">
                        Read my story <span aria-hidden="true">↓</span>
                    </a>
                </div>

                <div className="about-hero-visual">
                    <div className="about-photo-frame">
                        <img src={aboutImage} alt="Carolina, founder and baker behind SOURAW" />
                    </div>
                    <span className="about-sticker about-sticker-pink">founder + baker</span>
                    <span className="about-sticker about-sticker-yellow">baked slowly</span>
                </div>
            </section>

            <p className="photo-banner-summary">
                A story about searching for belonging, finding patience in
                fermentation, and discovering that our roots have a way of waking up.
            </p>

            <section className="abt" id="about">
                <div className="abt-wrap">
                    <div ref={introRef} className={`abt-intro journal-reveal ${introInView ? "is-inview" : ""}`}>
                        <h2 className="abt-heading reveal-up">My story, made slowly.</h2>
                        <div className="reveal-up" style={{ "--rd": "0.15s" }}>
                            <BrandSticker name="coffeeBreak" className="souraw-sticker--story" />
                        </div>
                        <p className="abt-body-p reveal-up" style={{ "--rd": "0.25s" }}>
                            If you’re here, it means you want to know a little more about me. So here is my story.
                        </p>
                    </div>

                    <div className="abt-timeline" ref={timelineRef}>
                        {TIMELINE.map((item, idx) => (
                            <TimelineItem key={`${item.year}-${idx}`} item={item} idx={idx} />
                        ))}
                    </div>

                    <div ref={endRef} className={`abt-end-scope journal-reveal ${endInView ? "is-inview" : ""}`}>
                        <div className="abt-end reveal-up">
                            <p className="about-script">if you made it this far...</p>
                            <p className="abt-p">If you’ve read this far, thank you. Truly.</p>
                            <p className="abt-p">I’ve always been a little dramatic — and I wouldn’t have it any other way.</p>
                            <p className="abt-p">Welcome to this world of sourdough experiments, heart, and history.</p>
                            <p className="abt-end-title">
                                This is Souraw <i className="fa-regular fa-heart" />
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
