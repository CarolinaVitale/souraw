import React, { useEffect, useRef, useState } from "react";
import "./ChoosingUs.css";
import loaf from "../../assets/break-.webp";

const STEPS = [
    {
        year: "Digest better",
        text: "Long fermentation naturally breaks down gluten proteins.",
        positionClass: "cu-step--topLeft",
    },
    {
        year: "Feel lighter",
        text: "Less bloating. Less inflammation. More comfort.",
        positionClass: "cu-step--topRight",
    },
    {
        year: "Steady energy",
        text: "Lower glycemic response compared to conventional bread.",
        positionClass: "cu-step--midLeft",
    },
    {
        year: "No additives",
        text: "Just ingredients you recognize. Nothing artificial.",
        positionClass: "cu-step--midRight",
    },
    {
        year: "Choose yourself",
        text: "Choosing SOURAW is choosing how you want to feel.",
        positionClass: "cu-step--bottomCenter",
    },
];

export default function ChoosingUs() {
    const sectionRef = useRef(null);
    const [active, setActive] = useState(-1);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;

            const start = vh * 0.3;
            const end = vh * 0.2;

            const total = rect.height - (start + end);
            const passed = start - rect.top;

            const progress =
                total > 0 ? Math.min(Math.max(passed / total, 0), 1) : 0;

            const dead = 0.10;

            if (progress < dead) {
                setActive(-1);
                return;
            }

            const normalized = (progress - dead) / (1 - dead);

            const idx = Math.min(
                STEPS.length - 1,
                Math.floor(normalized * STEPS.length)
            );

            setActive(idx);
        };

        
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);


    return (
        <section className="choosing-us" id="about" ref={sectionRef}>
            <h2 className="choosing-title">
                <span className="biro">Choosing </span>
                <span className="nauryz">sOURaW </span>
                <span className="biro">is choosing you</span>
            </h2>
            <div className="cu-story">
                <div className="cu-sticky">
                    <div className="cu-canvas">
                        <img className="cu-loaf" src={loaf} alt="SOURAW loaf" />

                        {STEPS.map((s, i) => (
                            <div
                                key={s.year}
                                className={`cu-step ${s.positionClass} ${i <= active ? "is-on" : ""
                                    } ${i < active ? "is-past" : ""} ${i === active ? "is-active" : ""}`}

                            >
                                <div className="cu-year">{s.year}</div>
                                <div className="cu-text">{s.text}</div>

                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}