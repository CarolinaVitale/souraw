import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import heroImage from "../../assets/untamed-studio/studio-hero.jpg";
import customToteImage from "../../assets/untamed-studio/custom-tote.jpg";
import luckyCatDishImage from "../../assets/untamed-studio/lucky-cat-dish.jpg";
import sushiMatSleevesImage from "../../assets/untamed-studio/custom-sushi-mat-sleeves.jpg";
import sushiMatImage from "../../assets/untamed-studio/custom-sushi-mat.jpg";
import totePortfolioImage from "../../assets/untamed-studio/custom-tote-portfolio.jpg";
import cuttingBoardImage from "../../assets/untamed-studio/personalized-cutting-board.jpg";
import studioStampImage from "../../assets/untamed-studio/souraw-studio-stamp.png";
import { openContactDrawer } from "../../utils/contactDrawer";
// Hidden until these catalog categories are ready to publish.
// import kraftBagImage from "../../assets/diy/finalBagImage.webp";
// import ropeBagImage from "../../assets/diy/finalBagRopeHandles.webp";
// import labelsImage from "../../assets/diy/step11.webp";
// import cardsImage from "../../assets/diy/step10.webp";
import monAmourImage from "../../assets/untamed-studio/mon-amour.jpg";
import inBoccaAlLupoImage from "../../assets/untamed-studio/in-bocca-al-lupo.jpg";
import "./UntamedStudio.css";

// Filters can return when more than one catalog category is published.
// const filters = [
//     { id: "all", label: "All pieces" },
//     { id: "packaging", label: "Packaging" },
//     { id: "paper", label: "Paper + stickers" },
//     { id: "wearables", label: "Bags + pouches" },
// ];

const products = [
    /* Hidden until these products are ready to publish.
    {
        id: "custom-kraft-bag",
        category: "packaging",
        name: "Custom Kraft Bags",
        image: kraftBagImage,
        badge: "Made to order",
        description: "Handmade kraft bags customized with your logo, artwork, or event details.",
        details: "Small runs · Custom size · Branded finish",
        color: "yellow",
    },
    {
        id: "rope-handle-bag",
        category: "packaging",
        name: "Rope Handle Bags",
        image: ropeBagImage,
        badge: "Studio favorite",
        description: "A more polished handmade bag with colorful rope handles and custom graphics.",
        details: "Color options · Premium handle · Small batch",
        color: "pink",
    },
    {
        id: "sticker-label-set",
        category: "paper",
        name: "Sticker + Label Sets",
        image: labelsImage,
        badge: "Custom",
        description: "Logo stickers, product labels, seals, and playful details cut for your project.",
        details: "Matte or glossy · Die cut · Multiple sizes",
        color: "blue",
    },
    {
        id: "cards-inserts",
        category: "paper",
        name: "Cards + Inserts",
        image: cardsImage,
        badge: "Custom",
        description: "Thank-you cards, care cards, tags, and branded inserts made for small businesses.",
        details: "Personalized copy · Branded artwork · Small runs",
        color: "green",
    },
    */
    {
        id: "custom-tote",
        category: "wearables",
        name: "Custom Tote Bags",
        image: customToteImage,
        badge: "Made to order",
        description: "Everyday totes personalized with names, phrases, illustrations, or business branding.",
        details: "Heat-transfer vinyl · Custom artwork · Made one by one",
        color: "purple",
    },
    {
        id: "personalized-pouch",
        category: "wearables",
        name: "Personalized Pouches",
        badge: "Made to order",
        description: "Useful little cases for gifts, events, teams, and beautifully organized everyday things.",
        details: "Names or logos · Color options · Made to order",
        color: "red",
        art: "POUCH",
    },
];

const portfolioPieces = [
    {
        id: "lucky-cat-dish",
        title: "Lucky cat trinket dish",
        note: "A tiny custom detail for everyday rituals.",
        image: luckyCatDishImage,
        layout: "portrait",
    },
    {
        id: "sushi-mat-sleeves",
        title: "Custom sushi mat sleeves",
        note: "Illustrated packaging made for a hands-on event.",
        image: sushiMatSleevesImage,
        layout: "portrait",
    },
    {
        id: "sushi-mat",
        title: "Personalized sushi mat",
        note: "A useful object turned into a branded keepsake.",
        image: sushiMatImage,
        layout: "portrait",
    },
    {
        id: "custom-tote-work",
        title: "In bocca al lupo tote",
        note: "Custom artwork pressed one piece at a time.",
        image: totePortfolioImage,
        layout: "wide",
    },
    {
        id: "personalized-board",
        title: "Personalized cutting set",
        note: "Names, colors, and a little personality built in.",
        image: cuttingBoardImage,
        layout: "portrait",
    },
];

export default function UntamedStudio() {
    return (
        <main className="studio-page">
            <section className="studio-hero" aria-labelledby="studio-title">
                <img className="studio-hero-image" src={heroImage} alt="Handmade SOURAW kraft bag" />
                <div className="studio-hero-shade" />
                <div className="studio-hero-word" aria-hidden="true">STUDIO</div>

                <div className="studio-hero-copy">
                    <p>paper goods · small runs · custom made</p>
                    <h1 id="studio-title">
                        Untamed
                        <span>Studio.</span>
                    </h1>
                    <a href="#studio-work" className="studio-pill studio-pill-red">
                        See what I've made <span aria-hidden="true">↓</span>
                    </a>
                </div>

                <span className="studio-hero-sticker studio-hero-sticker-pink">cut with care</span>
                <span className="studio-hero-sticker studio-hero-sticker-yellow">made in Tampa ♡</span>
            </section>

            <p className="studio-summary">
                A growing archive of custom details, useful objects, and small-batch
                pieces made slowly for people, events, and growing brands.
            </p>

            <div className="studio-ribbon" aria-hidden="true">
                <div>
                    <span>CUT • PRESS • PEEL • PACK • MAKE IT PERSONAL • </span>
                    <span>CUT • PRESS • PEEL • PACK • MAKE IT PERSONAL • </span>
                    <span>CUT • PRESS • PEEL • PACK • MAKE IT PERSONAL • </span>
                    <span>CUT • PRESS • PEEL • PACK • MAKE IT PERSONAL • </span>
                </div>
            </div>

            <section
                className="studio-catalog"
                id="studio-work"
                data-future-catalog-items={products.length}
            >
                <div className="studio-catalog-word" aria-hidden="true">UNTAMED</div>
                <img
                    className="studio-sketch studio-sketch-mon-amour"
                    src={monAmourImage}
                    alt=""
                    aria-hidden="true"
                />
                <img
                    className="studio-sketch studio-sketch-in-bocca"
                    src={inBoccaAlLupoImage}
                    alt=""
                    aria-hidden="true"
                />
                <header className="studio-catalog-header">
                    <div>
                        <p className="studio-script">a little look inside</p>
                        <h2>Made lately.<br />Kept personal.</h2>
                    </div>
                    <p>
                        These are a few pieces I've already brought to life. Every project
                        starts with a different idea and is shaped around its person,
                        moment, or brand.
                    </p>
                </header>

                {/* Filters stay hidden until the other catalog categories are published.
                <div className="studio-filters" aria-label="Filter studio products">
                    {filters.map((filter) => (
                        <button
                            type="button"
                            key={filter.id}
                            className={activeFilter === filter.id ? "is-active" : ""}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                */}

                <div className="studio-moodboard" aria-label="A mood board of recent custom work">
                    <div className="studio-mood-paper studio-mood-paper-purple" aria-hidden="true" />
                    <div className="studio-mood-paper studio-mood-paper-yellow" aria-hidden="true" />
                    <div className="studio-mood-paper studio-mood-paper-pink" aria-hidden="true" />
                    <div className="studio-mood-grid-lines" aria-hidden="true" />

                    <p className="studio-mood-script studio-mood-script-top" aria-hidden="true">
                        scraps, ideas &amp; little obsessions
                    </p>
                    <p className="studio-mood-script studio-mood-script-bottom" aria-hidden="true">
                        made by hand, kept a little wild
                    </p>

                    {portfolioPieces.map((piece, index) => (
                        <figure
                            className={`studio-mood-piece studio-mood-piece-${piece.id}`}
                            key={piece.id}
                        >
                            <div className="studio-mood-photo">
                                <img src={piece.image} alt={piece.title} loading={index < 3 ? "eager" : "lazy"} />
                            </div>
                        </figure>
                    ))}

                    <img
                        className="studio-mood-stamp"
                        src={studioStampImage}
                        alt=""
                        aria-hidden="true"
                    />
                    <div className="studio-mood-swatches" aria-hidden="true">
                        <span /><span /><span /><span />
                    </div>
                    <span className="studio-mood-tape studio-mood-tape-one" aria-hidden="true" />
                    <span className="studio-mood-tape studio-mood-tape-two" aria-hidden="true" />
                    <span className="studio-mood-heart" aria-hidden="true">♡</span>
                </div>

                <aside className="studio-construction" aria-labelledby="studio-construction-title">
                    <span className="studio-construction-stamp">catalog in progress</span>
                    <div>
                        <p className="studio-script">the shelves are still growing</p>
                        <h3 id="studio-construction-title">The full catalog is under construction.</h3>
                        <p>
                            Have an idea, need details, or want to ask about a custom piece?
                            You don't have to wait for the catalog — send us a note and we'll
                            be happy to talk it through with you.
                        </p>
                    </div>
                    <button type="button" className="studio-pill studio-pill-cream" onClick={openContactDrawer}>
                        Contact the studio <ArrowUpRight size={19} weight="bold" />
                    </button>
                </aside>
            </section>

            <section className="studio-process">
                <div className="studio-process-heading">
                    <p className="studio-script">from idea to object</p>
                    <h2>How custom orders work.</h2>
                </div>

                <div className="studio-process-grid">
                    <article>
                        <span>01</span>
                        <h3>Tell me the idea</h3>
                        <p>Share the item, quantity, colors, date, and any artwork you already have.</p>
                    </article>
                    <article>
                        <span>02</span>
                        <h3>Approve the details</h3>
                        <p>You receive the options, timeline, and custom quote before production begins.</p>
                    </article>
                    <article>
                        <span>03</span>
                        <h3>Made just for you</h3>
                        <p>Your order is cut, assembled, checked, and prepared in the studio.</p>
                    </article>
                </div>
            </section>

            <section className="studio-cta">
                <p className="studio-script">your idea can live here</p>
                <h2>Need something completely custom?</h2>
                <p>Tell me what you are imagining and we can build the right piece together.</p>
                <button type="button" className="studio-pill studio-pill-cream" onClick={openContactDrawer}>
                    Start a custom order <ArrowUpRight size={19} weight="bold" />
                </button>
            </section>
        </main>
    );
}
