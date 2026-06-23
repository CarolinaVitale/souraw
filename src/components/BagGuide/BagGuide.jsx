import "./BagGuide.css";
import { steps } from "../../data/steps";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/diy/banner.webp";
import finalBagImage from "../../assets/diy/finalBagImage.webp";
import { sourawFind } from "../../data/sourawFinds";

const materialIds = ["kraft-paper", "punch", "bag-handle", "stamp"];

const materials = sourawFind.filter((item) => materialIds.includes(item.id));

export default function BagGuide() {
    return (
        <>
            <PageBanner
                image={bannerImage}
                kicker="The DIY Corner"
                title="UNTAMED PROJECTS"
            />

            <section className="bag-guide">
                <div className="bag-guide__hero">
                    <h2 className="bag-guide__kicker">Souraw DIY</h2>
                    <h1>How to Make a Kraft Bag</h1>
                    <p>
                        A square-base kraft bag made for cookie boxes, gifts,
                        and handmade packaging.
                    </p>
                </div>

                <div className="bag-guide__details">
                    <div>
                        <span>Paper size</span>
                        <strong>36" x 15"</strong>
                    </div>
                    <div>
                        <span>Final base</span>
                        <strong>Approx. 8.5" x 8.5"</strong>
                    </div>
                    <div>
                        <span>Final height</span>
                        <strong>Approx. 15"</strong>
                    </div>
                </div>

                <div className="bag-guide__grid">
                    {steps.map((step) => (
                        <article className="bag-step" key={step.number}>
                            <div className="bag-step__image">
                                <img src={step.image} alt={step.title} />
                            </div>

                            <div className="bag-step__content">
                                <span>{step.number}</span>
                                <h2>{step.title}</h2>
                                <p>{step.text}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <section className="bag-guide__result">
                    <div className="bag-guide__section-header">
                        <span>Made by hand</span>
                        <h2>The Final Bag</h2>
                    </div>

                    <div className="bag-guide__result-card">
                        <img src={finalBagImage} alt="Finished kraft bag" />

                        <div>
                            <h3>Simple. Square. Handmade.</h3>
                            <p>
                                A kraft bag with a clean square base, perfect
                                for cookie boxes, small gifts, and packaging
                                that feels intentional.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bag-guide__materials">
                    <div className="bag-guide__section-header">
                        <span>Shop the project</span>
                        <h2>The Tools Behind This Project</h2>
                        <p>
                            Everything I used to create this bag, gathered in
                            one place.
                        </p>
                    </div>

                    <div className="materials-grid">
                        {materials.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="material-card"
                            >
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                {item.description && <p>{item.description}</p>}
                                <span>find it here ↗</span>
                            </a>
                        ))}
                    </div>

                    <a href="/souraw-finds" className="materials-cta">
                        Explore SOURAW Finds →
                    </a>
                </section>

                <div className="bag-guide__note">
                    <h3>Important tips</h3>
                    <p>
                        Keep your folds sharp, align every seam carefully, and
                        use only the amount of glue needed. The cleaner the
                        folds, the more professional the bag will look.
                    </p>
                </div>
            </section>
        </>
    );
}