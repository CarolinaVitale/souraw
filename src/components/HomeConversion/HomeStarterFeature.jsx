import React from "react";
import { Link } from "react-router-dom";
import "./HomeConversion.css";
import starterImage from "../../assets/unrushed-lab-vertical.webp";

export default function HomeStarterFeature() {
    return (
        <section className="home-starter-feature" aria-labelledby="home-starter-title">
            <span className="home-starter-background-word" aria-hidden="true">FERMENTINA</span>

            <div className="home-starter-copy" data-aos="fade-up">
                <p className="home-starter-hand">a little piece of SOURAW</p>
                <h2 id="home-starter-title">Bring Fermentina home.</h2>
                <p>
                    Bring home dehydrated SOURAW starter and wake her up slowly
                    with the instructions included in your package.
                </p>
                <div className="home-feature-actions">
                    <Link to="/unrushed-lab" className="home-primary-link">
                        get my starter <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </div>

            <div className="home-starter-scene" data-aos="fade-up" data-aos-delay="120">
                <span className="home-starter-label home-starter-label-number" aria-hidden="true">
                    01 · fermentina
                </span>
                <span className="home-starter-label home-starter-label-ritual" aria-hidden="true">
                    wake · feed · rise
                </span>
                <span className="home-starter-arrow" aria-hidden="true">↘</span>

                <Link
                    to="/unrushed-lab"
                    className="home-starter-image-wrap"
                    aria-label="Shop dehydrated SOURAW starter"
                >
                    <img src={starterImage} alt="Dehydrated SOURAW starter" />
                    <span className="home-starter-shipping">ships to you</span>
                </Link>
            </div>
        </section>
    );
}
