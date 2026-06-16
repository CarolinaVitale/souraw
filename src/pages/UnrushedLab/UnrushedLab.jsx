import "./UnrushedLab.css";
import fermentina from "../../assets/fermentina-square.webp"
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/dot-bread.webp";


const WILD_START_LINK = "https://buy.stripe.com/4gM6oG4Mo3DPdeseXd0Ny00";

export default function UnrushedLab() {
    return (

        <>
            <PageBanner
                image={bannerImage}
                kicker="Maybe you need this"
                title="SOURAW ESSENTIALS"
            />


            <main className="unrushed-lab-page">
                <section className="unrushed-hero">
                    <p className="unrushed-kicker">Souraw presents</p>

                    <h1>
                        UNRUSHED
                        <span>LAB</span>
                    </h1>

                    <p className="unrushed-subtitle">
                        Digital guides, courses, and resources for curious bakers learning
                        sourdough the SOURAW way.
                    </p>
                </section>

                <section className="lab-featured">
                    <article className="lab-product-card">
                        <div className="lab-product-visual">
                            <img
                                src={fermentina}
                                alt="SOURAW Wild Start guide cover"
                            />
                        </div>

                        <div className="lab-product-content">
                            <p className="lab-label">First release</p>

                            <h2>SOURAW Wild Start</h2>

                            <p className="lab-description">
                                Create your first sourdough starter without wasting flour every day.
                            </p>

                            <ul className="lab-list">
                                <li>Beginner-friendly method</li>
                                <li>No daily flour waste</li>
                                <li>Step-by-step guide</li>
                                <li>Starter care + troubleshooting</li>
                            </ul>

                            <div className="lab-actions">
                                <span className="lab-price">$14.99</span>

                                <a
                                    href={WILD_START_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lab-button"
                                >
                                    Get the guide
                                </a>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
}