import React from "react";
import { Link } from "react-router-dom";
import "./HomeConversion.css";
import guideImage from "../../assets/starter/day4-fed.webp";
import findsImage from "../../assets/amazon/stamp.webp";
import crumbImage from "../../assets/diy/step8.webp";

const pathways = [
    {
        number: "01",
        className: "home-pathway-green",
        image: crumbImage,
        imageAlt: "SOURAW DIY packaging process",
        kicker: "diy, but SOURAW",
        title: "Make it the SOURAW way.",
        text: "Hands-on ideas, small rituals, and DIY details to bring the SOURAW mood into your kitchen.",
        to: "/diy",
        cta: "explore diy",
    },
    {
        number: "02",
        className: "home-pathway-pink",
        image: guideImage,
        imageAlt: "SOURAW starter guide",
        kicker: "unrushed lab",
        title: "Start slow. Keep going.",
        text: "Digital resources for curious bakers learning sourdough with less waste and more intention.",
        to: "/starter",
        cta: "visit the lab",
    },
    {
        number: "03",
        className: "home-pathway-yellow",
        image: findsImage,
        imageAlt: "SOURAW baking favorite",
        kicker: "like what I use?",
        title: "Find the little things.",
        text: "Tools, packaging, and everyday favorites from my baking process and small business workflow.",
        to: "/souraw-finds",
        cta: "shop SOURAW finds",
    },
];

export default function HomePathways() {
    return (
        <section className="home-pathways" aria-labelledby="home-pathways-title">
            <div className="home-pathways-head" data-aos="fade-up">
                <p>choose your SOURAW adventure</p>
                <h2 id="home-pathways-title">Pick your path.</h2>
                <span>Make it, learn it, or find the tools behind it.</span>
            </div>

            <div className="home-pathways-grid">
                {pathways.map((pathway, index) => (
                    <article
                        className={`home-pathway ${pathway.className}`}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        key={pathway.number}
                    >
                        <span className="home-pathway-number">{pathway.number}</span>
                        <Link to={pathway.to} className="home-pathway-image-link" tabIndex="-1" aria-hidden="true">
                            <img className="home-pathway-media" src={pathway.image} alt="" />
                        </Link>

                        <div className="home-pathway-content">
                            <p className="home-section-kicker">{pathway.kicker}</p>
                            <h3>{pathway.title}</h3>
                            <p>{pathway.text}</p>
                            <Link to={pathway.to} className="home-path-link">
                                {pathway.cta} <span aria-hidden="true">↗</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
