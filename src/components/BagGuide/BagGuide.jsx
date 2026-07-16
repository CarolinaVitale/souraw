import "./BagGuide.css";
import { steps } from "../../data/steps";
import { ArrowUpRight, Scissors, Ruler } from "@phosphor-icons/react";
import bannerImage from "../../assets/diy/banner.webp";
import finalBagImage from "../../assets/diy/finalBagImage.webp";
import { sourawFind } from "../../data/sourawFinds";
import purpleHandleBagImage from "../../assets/diy/finalBagRopeHandles.webp";

const materialIds = ["kraft-paper", "punch", "bag-handle", "stamp"];

const materials = sourawFind.filter((item) => materialIds.includes(item.id));

export default function BagGuide() {
    return (
        <main className="bag-guide-page">
            <section className="diy-hero" aria-labelledby="diy-title">
                <div className="diy-hero-word" aria-hidden="true">MAKE</div>
                <div className="diy-hero-copy">
                    <p className="diy-hero-kicker">the DIY corner</p>
                    <h1 id="diy-title">Make it the<br /><span>SOURAW way.</span></h1>
                    <a href="#bag-project">start the project <ArrowUpRight size={19} weight="bold" /></a>
                </div>
                <div className="diy-hero-scene" aria-hidden="true">
                    <div className="diy-hero-frame"><img src={bannerImage} alt="" /></div>
                    <span className="diy-sticker diy-sticker-one">cut · fold · make</span>
                    <span className="diy-sticker diy-sticker-two">made by hand ♡</span>
                    <Scissors className="diy-scissors" weight="bold" />
                </div>
            </section>

            <p className="photo-banner-summary">
                Hands-on details, useful things, and packaging made with a little more intention.
            </p>

            <section className="bag-guide" id="bag-project">
                <div className="bag-guide__background-word" aria-hidden="true">KRAFT</div>
                <div className="bag-guide__hero">
                    <h2 className="bag-guide__kicker">project no. 01 · SOURAW DIY</h2>
                    <h1>How to Make a Kraft Bag</h1>
                    <p>
                        A square-base kraft bag made for cookie boxes, gifts,
                        and handmade packaging.
                    </p>
                </div>

                <div className="bag-guide__details">
                    <div>
                        <Ruler size={25} weight="bold" aria-hidden="true" />
                        <span>Paper size</span>
                        <strong>36" x 15"</strong>
                    </div>
                    <div>
                        <Ruler size={25} weight="bold" aria-hidden="true" />
                        <span>Final base</span>
                        <strong>Approx. 8.5" x 8.5"</strong>
                    </div>
                    <div>
                        <Ruler size={25} weight="bold" aria-hidden="true" />
                        <span>Final height</span>
                        <strong>Approx. 15"</strong>
                    </div>
                </div>

                <div className="bag-guide__grid">
                    {steps.map((step, index) => (
                        <article className={`bag-step bag-step-${(index % 4) + 1}`} key={step.number}>
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

                <div className="bag-guide__result-card">
                    <div className="bag-guide__result-images">
                        <img
                            src={finalBagImage}
                            alt="Finished kraft bag with glued handles"
                        />

                        <img
                            src={purpleHandleBagImage}
                            alt="Finished kraft bag with rope handles"
                        />
                    </div>

                    <div>
                        <h3>Simple. Square. Handmade.</h3>

                        <p>
                            This bag can be finished in two different ways:
                            with glued paper handles or with punched holes
                            and rope handles for a more premium look.
                        </p>
                    </div>
                </div>

                <section className="bag-guide__handles">
                    <div className="bag-guide__section-header">
                        <span>Optional finish</span>
                        <h2>Another Handle Option</h2>
                        <p>
                            You can also punch holes and add rope handles for a more polished
                            finish.
                        </p>
                    </div>

                    <div className="bag-guide__handles-card">
                        <div>
                            <h3>Option 2: Rope Handles</h3>
                            <p>
                                Instead of gluing the handles, mark two holes on each side of
                                the bag, punch them carefully, and insert the rope handles
                                through the holes.
                            </p>

                            <ul>
                                <li>Mark the handle placement.</li>
                                <li>Punch two holes on each side.</li>
                                <li>Thread the rope through the holes.</li>
                                <li>Tie or secure the ends inside the bag.</li>
                            </ul>
                        </div>

                        <div className="bag-guide__handles-tools">
                            {materials
                                .filter((item) => ["punch", "bag-handle"].includes(item.id))
                                .map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                    >
                                        <img src={item.image} alt={item.name} />
                                        <span>{item.name}</span>
                                    </a>
                                ))}
                        </div>
                    </div>
                </section>

                <section className="bag-guide__materials">
                    <span className="bag-guide__materials-orbit" aria-hidden="true" />
                    <div className="bag-guide__section-header">
                        <span>Shop the project</span>
                        <h2>The Tools Behind This Project</h2>
                        <p>
                            Everything I used to create this bag, gathered in
                            one place.
                        </p>
                    </div>

                    <div className="materials-grid">
                        {materials.map((item, index) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className={`material-card material-card-${(index % 4) + 1}`}
                            >
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                {item.description && <p>{item.description}</p>}
                                <span>find it here <ArrowUpRight size={16} weight="bold" /></span>
                            </a>
                        ))}
                    </div>

                    <a href="/souraw-finds" className="materials-cta">
                        Explore SOURAW Finds <ArrowUpRight size={18} weight="bold" />
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
        </main>
    );
}
