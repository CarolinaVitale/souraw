import React, { useRef, useState } from "react";
import "./Founder.css";
import founderImg from "../../assets/founder3.png";
import videoSrc from "../../assets/founder-video.mp4";
import stampImg from "../../assets/souraw-stamp.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FounderSpotlight = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const togglePlay = async () => {
        const v = videoRef.current;
        if (!v) return;

        if (v.paused) {
            try {
                await v.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        } else {
            v.pause();
            setIsPlaying(false);
        }
    };

    const close = () => {
        const v = videoRef.current;
        if (v) v.pause();
        setIsPlaying(false);
        setIsClosed(true);
    };

    if (isClosed) return null;

    const ease = [0.22, 1, 0.36, 1];

    return (
        <section className="fs">
            <div className="fs-inner">
                <div className="fs-left">
                    <div className="fs-hand">
                        Hi! I’m <br />
                        <span>Carolina!</span>
                    </div>

                    <div className="fs-avatarWrap">
                        <img className="fs-avatar" src={founderImg} alt="Founder" />
                    </div>

                    <motion.div
                        className="fs-card"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35, margin: "0px 0px -15% 0px" }}
                        transition={{ duration: 0.9, ease }}
                    >
                        <p className="fs-text">Souraw was born from discomfort.</p>
                        <p className="fs-text">From heartbreak.</p>
                        <p className="fs-text">From wanting to feel better — physically and emotionally.</p>
                        <br />
                        <p className="fs-text">Fermentation taught me patience.</p>
                        <p className="fs-text">Bread taught me resilience.</p>
                        <p className="fs-text">My roots reminded me who I am.</p>
                        <br />
                        <p className="fs-text">Souraw is not just bread.</p>
                        <p className="fs-text">It is memory, heritage, and healing — baked slowly.</p>
                        <br />
                        <br />

                        <Link to="/about" className="fs-cta">
                            READ MY STORY
                        </Link>
                    </motion.div>

                    {stampImg && <img className="fs-stamp" src={stampImg} alt="Stamp" />}
                </div>

                <div className="fs-right">
                    <motion.div
                        className="fs-videoFrame"
                        initial={{ opacity: 0, y: 18, scale: 0.985 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.45, margin: "0px 0px -20% 0px" }}
                        transition={{ duration: 0.95, ease, delay: 0.12 }}
                    >
                        <button className="fs-close" onClick={close} aria-label="Close">
                            <i className="fa-solid fa-x fa-xl"></i>
                        </button>

                        <video
                            ref={videoRef}
                            className="fs-video"
                            src={videoSrc}
                            autoPlay
                            playsInline
                            muted
                            loop
                            preload="metadata"
                            onClick={togglePlay}
                        />

                        <button className="fs-play" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? <i className="fa-solid fa-pause fa-xl"></i> : <i className="fa-solid fa-play fa-xl"></i>}
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FounderSpotlight;