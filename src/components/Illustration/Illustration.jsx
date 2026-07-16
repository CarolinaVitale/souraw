import React from "react";
import { Link } from "react-router-dom";
import "./Illustration.css";

export default function FollowUs() {
    return (
        <section className="follow-us" aria-labelledby="follow-us-title">
            <p className="follow-us-kicker">made slowly. eaten quickly.</p>
            <h2 id="follow-us-title">Stay untamed.</h2>
            <p className="follow-us-copy">
                Real fermentation, small batches, and bread with a point of view.
            </p>
            <Link to="/orders" className="follow-us-cta">
                order SOURAW <span aria-hidden="true">↗</span>
            </Link>
            <span className="follow-us-note" aria-hidden="true">see you around the table</span>
        </section>
    );
}
