import React, { useEffect, useRef, useState } from "react";
import "./Ingredients.css";

import breadPng from "../../assets/break-.webp";
import arrowTL from "../../assets/arrow-up-left.png";
import arrowTR from "../../assets/arrow-up-right.png";
import arrowBL from "../../assets/arrow-down-left.png";
import arrowBR from "../../assets/arrow-down-right.png";

const ITEMS = [
    {
        id: "digest",
        title: "Digest better",
        text: "Long fermentation helps break down gluten proteins.",
        pos: { left: "18%", top: "10%" },
        arrow: { src: arrowTL, w: 90, rot: 0, x: 90, y: 8 },
        delay: 0.05,
        align: "left",
    },
    {
        id: "noadd",
        title: "No additives",
        text: "Flour. Water. Salt. Time. Nothing artificial.",
        pos: { left: "98%", top: "30%" },
        arrow: { src: arrowTR, w: 70, rot: 30, x: 10, y: -38 },
        delay: 0.18,
        align: "right",
    },
    {
        id: "lighter",
        title: "Feel lighter",
        text: "Less bloating. Less heaviness. More comfort.",
        pos: { left: "20%", top: "54%" },
        arrow: { src: arrowBL, w: 100, rot: 20, x: 130, y: -5 },
        delay: 0.31,
        align: "left",
    },
    {
        id: "energy",
        title: "Steady energy",
        text: "A gentler glycemic response vs. conventional bread.",
        pos: { left: "88%", top: "64%" },
        arrow: { src: arrowBR, w: 100, rot: 20, x: -40, y: -5 },
        delay: 0.44,
        align: "right",
    },
];

export default function Ingredients() {
    const stageRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = stageRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            {
                threshold: 0.25,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="sk">
            <div className="sk-wrap">
                <header className="sk-heading">
                    <p className="sk-kicker">Why Sourdough?</p>
                    <h2 className="sk-h2">
                        Real benefits, naturally <i className="fa-solid fa-heart"></i>
                    </h2>
                </header>

                <div
                    ref={stageRef}
                    className={`sk-stage ${inView ? "is-inview" : ""}`}
                >
                    <img
                        className="sk-center"
                        src={breadPng}
                        alt="Souraw sourdough"
                    />

                    {ITEMS.map((it) => (
                        <div
                            key={it.id}
                            className={`sk-item sk-${it.align}`}
                            style={{
                                left: it.pos.left,
                                top: it.pos.top,
                                "--d": `${it.delay}s`,
                            }}
                        >
                            <div className="sk-text">
                                <span className="sk-title">{it.title}</span>
                                <span className="sk-desc">{it.text}</span>
                            </div>

                            <div className="sk-arrowWrap">
                                <img
                                    className={`sk-arrow sk-arrow-${it.id}`}
                                    src={it.arrow.src}
                                    alt=""
                                    aria-hidden="true"
                                    style={{
                                        width: `${it.arrow.w}px`,
                                        "--ax": `${it.arrow.x}px`,
                                        "--ay": `${it.arrow.y}px`,
                                        "--ar": `${it.arrow.rot}deg`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}