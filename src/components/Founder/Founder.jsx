import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/journal.css";
import JournalMasthead from "../JournalMasthead/JournalMasthead";
import JournalMarker from "../JournalMarker/JournalMarker";
import useInViewOnce from "../../hooks/useInViewOnce";
import "./Founder.css";
import founderImg from "../../assets/founder3.optimized.webp";
import breadCutVideo from "../../assets/souraw-bread-cut.mp4";
import breadCutPoster from "../../assets/souraw-bread-cut-poster.jpg";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(
        () => typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches
    );

    useEffect(() => {
        const query = window.matchMedia(reducedMotionQuery);
        const onChange = () => setReduced(query.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    return reduced;
}

export default function FounderSpotlight() {
    const videoRef = useRef(null);
    const reducedMotion = usePrefersReducedMotion();
    const [mediaRef, mediaInView] = useInViewOnce();
    const [copyRef, copyInView] = useInViewOnce();

    // Autoplay needs the element muted before play(); set it explicitly for iOS Safari.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        video.play().catch(() => { /* autoplay blocked: the poster stays visible */ });
    }, [reducedMotion]);

    return (
        <section className="fs" aria-labelledby="founder-title">
            <JournalMasthead left="Roots" center="N° 01 — The hands behind SOURAW" right="Tampa, FL" />

            <div className="fs-inner">
                <div ref={mediaRef} className={`fs-media journal-reveal ${mediaInView ? "is-inview" : ""}`}>
                    <figure className="journal-polaroid journal-polaroid--tilt-left fs-polaroid" style={{ "--rd": "0.1s" }}>
                        {reducedMotion ? (
                            <img src={breadCutPoster} width="720" height="1280" alt="A SOURAW loaf being cut open" />
                        ) : (
                            <video
                                ref={videoRef}
                                src={breadCutVideo}
                                poster={breadCutPoster}
                                width="720"
                                height="1280"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                disablePictureInPicture
                                aria-label="A SOURAW loaf being cut open"
                            />
                        )}
                        <figcaption>the first cut — always the best part</figcaption>
                    </figure>

                    <p className="fs-card reveal-up" style={{ "--rd": "0.75s" }}>memory, heritage &amp; healing.</p>

                    <p className="fs-sticker reveal-up" style={{ "--rd": "0.9s" }}>
                        <img src={founderImg} width="855" height="859" alt="" loading="lazy" decoding="async" />
                        <span>Carolina · Founder + Baker</span>
                    </p>

                    <svg className="fs-pink-heart journal-draw" viewBox="0 0 40 36" aria-hidden="true" style={{ "--draw-delay": "1s" }}>
                        <path pathLength="1" d="M20 33C8 24 3 17 4 10.5 5 5 10 2.5 14.5 4c2.6.9 4.4 3 5.5 5.2C21.3 6.8 23.4 4.6 26.3 3.8 31 2.6 35.6 5.6 36 11c.5 6.6-5 13.5-16 22z" />
                    </svg>
                </div>

                <div ref={copyRef} className={`fs-copy journal-reveal ${copyInView ? "is-inview" : ""}`}>
                    <p className="fs-hand reveal-up">
                        Hi! I’m Carolina.
                        <svg className="fs-line-heart journal-draw" viewBox="0 0 40 36" aria-hidden="true" style={{ "--draw-delay": "0.45s" }}>
                            <path pathLength="1" d="M20 33C8 24 3 17 4 10.5 5 5 10 2.5 14.5 4c2.6.9 4.4 3 5.5 5.2C21.3 6.8 23.4 4.6 26.3 3.8 31 2.6 35.6 5.6 36 11c.5 6.6-5 13.5-16 22z" />
                        </svg>
                    </p>

                    <h2 id="founder-title" className="reveal-up" style={{ "--rd": "0.1s" }}>
                        <span>Bread</span>
                        <JournalMarker>brought</JournalMarker>
                        <span>me home.</span>
                    </h2>

                    <p className="fs-lead reveal-up" style={{ "--rd": "0.25s" }}>
                        SOURAW was born from discomfort, heartbreak, and the need
                        to feel better — physically and emotionally.
                    </p>

                    <blockquote className="fs-quote reveal-up" style={{ "--rd": "0.35s" }}>
                        <p>Fermentation taught me patience.</p>
                        <p>Bread taught me resilience.</p>
                        <p>My roots reminded me who I am.</p>
                    </blockquote>

                    <div className="fs-actions reveal-up" style={{ "--rd": "0.45s" }}>
                        <Link to="/about" className="fs-cta">
                            Read my story <span aria-hidden="true">↗</span>
                        </Link>
                        <span className="fs-signoff">— baked slowly, since day one</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
