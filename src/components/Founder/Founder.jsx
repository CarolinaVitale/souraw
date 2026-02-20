import React, { useRef, useState } from "react";
import "./Founder.css";
import founderImg from "../../assets/founder3.png"; 
import videoSrc from "../../assets/founder-video.mp4"; 
import stampImg from "../../assets/souraw-stamp.png"; 

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

    return (
        <section className="fs">
            <div className="fs-inner">
                {/* LEFT */}
                <div className="fs-left">
                    <div className="fs-hand">
                        Hi! I’m <br />
                        <span>Carolina!</span>
                    </div>

                    <div className="fs-avatarWrap">
                        <img className="fs-avatar" src={founderImg} alt="Founder" />
                    </div>

                    <div className="fs-card">
                        <p className="fs-text">
                            Souraw was born from discomfort.
                        </p>
                        <p className="fs-text">
                            From heartbreak.
                        </p>
                        <p className="fs-text">
                            From wanting to feel better — physically and emotionally.
                        </p>
                        <br/>
                        <p className="fs-text">
                            Fermentation taught me patience.
                        </p>
                        <p className="fs-text">
                            Bread taught me resilience.
                        </p>
                        <p className="fs-text">
                            My roots reminded me who I am.
                        </p>
                        <br />
                        <p className="fs-text">
                            Souraw is not just bread.
                        </p>
                        <p className="fs-text">
                            It is memory, heritage, and healing — baked slowly.
                        </p>
                        <br /><br />
                        <button className="fs-cta" type="button">
                            READ MY STORY
                        </button>
                    </div>

                    {/* Sello/ilustración opcional */}
                    {stampImg && (
                        <img className="fs-stamp" src={stampImg} alt="Stamp" />
                    )}
                </div>

                {/* RIGHT */}
                <div className="fs-right">
                    <div className="fs-videoFrame">
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

                        <button
                            className="fs-play"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <i className="fa-solid fa-pause fa-xl"></i> : <i className="fa-solid fa-play fa-xl"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderSpotlight;