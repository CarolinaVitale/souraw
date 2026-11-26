import React from "react";
import "../../styles/journal.css";
import JournalMasthead from "../JournalMasthead/JournalMasthead";
import JournalMarker from "../JournalMarker/JournalMarker";
import useInViewOnce from "../../hooks/useInViewOnce";
import "./HomeInstagramFeed.css";
import holidayBoxImage from "../../assets/ig-6.jpg";
import tiramisuImage from "../../assets/ig-3.jpg";
import crumbImage from "../../assets/ig-5.jpg";

const instagramUrl = "https://instagram.com/souraw.us";
const tiktokUrl = "https://www.tiktok.com/@souraw.cv";

export default function HomeInstagramFeed() {
    const [copyRef, copyInView] = useInViewOnce();
    const [collageRef, collageInView] = useInViewOnce();

    return (
        <section className="home-instagram" aria-labelledby="home-instagram-title">
            <JournalMasthead left="The Journal" center="N° 02 — Behind the dough" right="@souraw.us" />

            <div className="home-instagram-body">
                <div ref={copyRef} className={`home-instagram-copy journal-reveal ${copyInView ? "is-inview" : ""}`}>
                    <p className="home-instagram-hand reveal-up">
                        straight from the counter
                        <svg className="home-instagram-arrow journal-draw" viewBox="0 0 64 44" aria-hidden="true" style={{ "--draw-delay": "0.45s" }}>
                            <path pathLength="1" d="M4 8c14-6 34-4 42 10 4 7 4 14 2 20" />
                            <path pathLength="1" d="M39 31l9 9 7-11" />
                        </svg>
                    </p>

                    <h2 id="home-instagram-title" className="reveal-up" style={{ "--rd": "0.1s" }}>
                        <span>Watch</span>
                        <JournalMarker>SOURAW</JournalMarker>
                        <span>happen.</span>
                    </h2>

                    <p className="home-instagram-intro reveal-up" style={{ "--rd": "0.25s" }}>
                        Starter checks, bake days, behind the scenes, and the slow,
                        messy, beautiful parts in between.
                    </p>

                    <div className="home-instagram-actions reveal-up" style={{ "--rd": "0.35s" }}>
                        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="home-instagram-follow">
                            Follow @souraw.us <span aria-hidden="true">↗</span>
                        </a>
                        <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="home-instagram-tiktok">
                            TikTok @souraw.cv
                        </a>
                    </div>

                    <p className="home-instagram-signoff reveal-up" style={{ "--rd": "0.45s" }}>
                        follow the mess.<br />
                        follow the rise.
                        <svg className="home-instagram-heart journal-draw" viewBox="0 0 40 36" aria-hidden="true" style={{ "--draw-delay": "1s" }}>
                            <path pathLength="1" d="M20 33C8 24 3 17 4 10.5 5 5 10 2.5 14.5 4c2.6.9 4.4 3 5.5 5.2C21.3 6.8 23.4 4.6 26.3 3.8 31 2.6 35.6 5.6 36 11c.5 6.6-5 13.5-16 22z" />
                        </svg>
                    </p>
                </div>

                <div ref={collageRef} className={`home-instagram-collage journal-reveal ${collageInView ? "is-inview" : ""}`}>
                    <div className="home-instagram-col">
                        <figure className="journal-polaroid journal-polaroid--tilt-left" style={{ "--rd": "0.1s" }}>
                            <img src={holidayBoxImage} width="600" height="800" loading="lazy" decoding="async"
                                alt="A SOURAW holiday cookie box tied with a red ribbon" />
                            <figcaption>holiday box — made to gift</figcaption>
                        </figure>

                        <figure className="home-instagram-frame reveal-up" style={{ "--rd": "0.34s" }}>
                            <img src={tiramisuImage} width="600" height="800" loading="lazy" decoding="async"
                                alt="SOURAW classic tiramisù cups with their label" />
                            <figcaption className="home-instagram-sticker">Classic tiramisù</figcaption>
                        </figure>
                    </div>

                    <div className="home-instagram-col home-instagram-col--offset">
                        <figure className="journal-polaroid journal-polaroid--tilt-right journal-polaroid--yellow-tape home-instagram-tall" style={{ "--rd": "0.22s" }}>
                            <img src={crumbImage} width="600" height="800" loading="lazy" decoding="async"
                                alt="A halved SOURAW loaf showing an open crumb" />
                            <figcaption>
                                crumb shot, bake day
                                <small>N° 07</small>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
