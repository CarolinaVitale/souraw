import "./BagGuide.css";
import { steps } from "../../data/steps";
import PageBanner from "../../components/PageBanner/PageBanner";
import bannerImage from "../../assets/diy/step1.png";


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
                        A simple square-base kraft bag made for an 8 x 8 inch box.
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

                <div className="bag-guide__details">
                    <br/>
                    <br />
                    <div>
                        <span>Paper size</span>
                        <strong>31" x 15"</strong>
                    </div>
                    <div>
                        <span>Final base</span>
                        <strong>Approx. 8.5" x 6.5"</strong>
                    </div>
                    <div>
                        <span>Final height</span>
                        <strong>Approx. 15"</strong>
                    </div>
                </div>

                <div className="bag-guide__note">
                    <h3>Important tips</h3>
                    <p>
                        Keep your folds sharp, align every seam carefully, and use only the amount of glue needed.
                        The cleaner the folds, the more professional the bag will look.
                    </p>
                </div>

            </section>
            

        </>
    );
}