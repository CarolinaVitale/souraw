import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";
import "./Founder.css";
import founderImg from "../../assets/founder3.png";
import videoSrc from "../../assets/founder-video.MP4";
import stampImg from "../../assets/brand-elements/souraw-stamp.png";

const ease = [0.22, 1, 0.36, 1];

export default function FounderSpotlight() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            try {
                await video.play();
            } catch {
                setIsPlaying(false);
            }
        } else {
            video.pause();
        }
    };

    return (
        <section className="fs" aria-labelledby="founder-title">
            <span className="fs-background-word" aria-hidden="true">ROOTS</span>

            <div className="fs-inner">
                <motion.div
                    className="fs-copy"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.85, ease }}
                >
                    <p className="fs-hand">Hi! I’m Carolina.</p>
                    <p className="fs-kicker">the hands behind SOURAW</p>
                    <h2 id="founder-title">Bread brought me home.</h2>

                    <p className="fs-lead">
                        SOURAW was born from discomfort, heartbreak, and the need
                        to feel better — physically and emotionally.
                    </p>

                    <div className="fs-story-note">
                        <p>Fermentation taught me patience.</p>
                        <p>Bread taught me resilience.</p>
                        <p>My roots reminded me who I am.</p>
                        <strong>Memory, heritage, and healing — baked slowly.</strong>
                    </div>

                    <Link to="/about" className="fs-cta">
                        read my story <span aria-hidden="true">↗</span>
                    </Link>
                </motion.div>

                <motion.div
                    className="fs-scene"
                    initial={{ opacity: 0, y: 28, rotate: 1.5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.95, ease, delay: 0.1 }}
                >
                    <div className="fs-videoFrame">
                        <video
                            ref={videoRef}
                            className="fs-video"
                            src={videoSrc}
                            autoPlay
                            playsInline
                            muted
                            loop
                            preload="metadata"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onClick={togglePlay}
                        />

                        <button
                            type="button"
                            className="fs-play"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause founder video" : "Play founder video"}
                        >
                            {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
                        </button>
                    </div>

                    <div className="fs-founder-card">
                        <img src={founderImg} alt="Carolina, founder of SOURAW" />
                        <span>Carolina<br />founder + baker</span>
                    </div>

                    <span className="fs-label fs-label-memory" aria-hidden="true">memory</span>
                    <span className="fs-label fs-label-healing" aria-hidden="true">healing</span>
                    <span className="fs-scene-arrow" aria-hidden="true">↙</span>
                    <img className="fs-stamp" src={stampImg} alt="" aria-hidden="true" />
                </motion.div>
            </div>
        </section>
    );
}
