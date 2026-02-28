// About.jsx
import React, { useEffect, useRef } from "react";
import "./About.css";

import baby from "../../assets/baby.jpg";
import butterfly from "../../assets/butterfly.jpg";
import newyork from "../../assets/new-york.jpg";
import madrid from "../../assets/madrid.jpg";
import venezuela from "../../assets/martino.jpg";
import tampa from "../../assets/viaje.jpg";
import founder from "../../assets/founder2.png";
import founder2 from "../../assets/founder.png";

import PageBanner from "../../components/PageBanner/PageBanner";
import aboutImage from "../../assets/banner1.jpg";

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
            "It is a tribute to my roots.",
            "It is the connection I found with my mother during one of the quietest, hardest seasons of my life.",
            "It is discovering who I am.",
            "It is recognizing what I’m capable of.",
            "When my mom was diagnosed with Alzheimer’s, something inside me broke — and something else quietly began. Bread became ritual. Fermentation became patience. Waiting became healing. In the silence, I found her. And I found myself.",
        ],
        image: founder,
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
    },
];

export default function AboutTimeline() {
    const timelineRef = useRef(null);

    useEffect(() => {
        const timelineEl = timelineRef.current;
        if (!timelineEl) return;

        const setLineOffsets = () => {
            const dots = timelineEl.querySelectorAll(".abt-dot");
            if (!dots.length) return;

            const firstDot = dots[0];
            const lastDot = dots[dots.length - 1];

            const tlRect = timelineEl.getBoundingClientRect();
            const firstRect = firstDot.getBoundingClientRect();
            const lastRect = lastDot.getBoundingClientRect();

            const firstCenter = firstRect.top - tlRect.top + firstRect.height / 2;
            const lastCenter = lastRect.top - tlRect.top + lastRect.height / 2;

            const lineTop = Math.max(0, firstCenter);
            const lineBottom = Math.max(0, tlRect.height - lastCenter);

            timelineEl.style.setProperty("--lineTop", `${lineTop}px`);
            timelineEl.style.setProperty("--lineBottom", `${lineBottom}px`);
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

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("is-inview");
                    else e.target.classList.remove("is-inview");
                });
            },
            { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
        );

        const items = timelineEl.querySelectorAll(".abt-item");
        items.forEach((el) => io.observe(el));

        const onResize = () => {
            setLineOffsets();
            updateProgress();
        };

        const onScroll = () => updateProgress();

        setLineOffsets();
        updateProgress();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <>
            <PageBanner image={aboutImage} kicker="Our Story..." title="HOW WE GOT HERE" />

            <section className="abt" id="about">
                <div className="abt-wrap">
                    <h3 className="abt-title-p">{`<p>HELLO WORLD</p>`}</h3>
                    <p className="abt-body-p">
                        If you’re here, it means you want to know a little more about me. So here is my story.
                    </p>

                    <div className="abt-timeline" ref={timelineRef}>
                        {TIMELINE.map((item, idx) => {
                            const isLeft = idx % 2 === 0;

                            return (
                                <article key={`${item.year}-${idx}`} className="abt-item">
                                    {isLeft ? (
                                        <>
                                            <div className="abt-media">
                                                <div className="abt-circle">
                                                    <img src={item.image} alt={`${item.year || "story"}`} />
                                                </div>
                                            </div>

                                            <div className="abt-mid" aria-hidden="true">
                                                <span className="abt-dot" />
                                            </div>

                                            <div className="abt-content">
                                                <div className="abt-year">{item.year}</div>
                                                <h3 className="abt-title">{item.title}</h3>
                                                {Array.isArray(item.body) ? (
                                                    <div className="abt-bodyGroup">
                                                        {item.body.map((p, i) => (
                                                            <p key={i} className="abt-body">
                                                                {p}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="abt-body">{item.body}</p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="abt-content abt-content--right">
                                                <div className="abt-year">{item.year}</div>
                                                <h3 className="abt-title">{item.title}</h3>
                                                {Array.isArray(item.body) ? (
                                                    <div className="abt-bodyGroup">
                                                        {item.body.map((p, i) => (
                                                            <p key={i} className="abt-body">
                                                                {p}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="abt-body">{item.body}</p>
                                                )}
                                            </div>

                                            <div className="abt-mid" aria-hidden="true">
                                                <span className="abt-dot" />
                                            </div>

                                            <div className="abt-media">
                                                <div className="abt-circle">
                                                    <img src={item.image} alt={`${item.year || "story"}`} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    <div className="abt-end">
                        <p className="abt-p">If you’ve read this far, thank you. Truly.</p>
                        <p className="abt-p">I’ve always been a little dramatic — and I wouldn’t have it any other way.</p>
                        <p className="abt-p">Welcome to this world of sourdough experiments, heart, and history.</p>
                        <p className="abt-title-p">
                            This is Souraw <i className="fa-regular fa-heart" />
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}