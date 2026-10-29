import BrandSticker from '../BrandSticker/BrandSticker';
import React from "react";
import {
    FaInstagram,
    FaRegBookmark,
    FaRegComment,
    FaRegHeart,
    FaRegPaperPlane,
} from "react-icons/fa";
import "./HomeConversion.css";
import instagramPostImage from "../../assets/instagram-starter-lab.optimized.webp";
import breadCrew from "../../assets/followus-bg2.optimized.webp";

const instagramUrl = "https://instagram.com/souraw.us";

export default function HomeInstagramFeed() {
    return (
        <section className="home-instagram" aria-labelledby="home-instagram-title">
            <div className="home-instagram-orbit home-instagram-orbit-one" aria-hidden="true" />
            <div className="home-instagram-orbit home-instagram-orbit-two" aria-hidden="true" />

            <div className="home-instagram-copy" data-aos="fade-up">
                <p className="home-instagram-eyebrow">
                    <FaInstagram aria-hidden="true" />
                    @souraw.us
                </p>
                <h2 id="home-instagram-title">Watch SOURAW happen.</h2>
                <p className="home-instagram-intro">
                    Starter checks, bake days, behind the scenes, and the slow,
                    messy, beautiful parts in between.
                </p>

                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-instagram-follow"
                >
                    follow @souraw.us <span aria-hidden="true">↗</span>
                </a>
                <BrandSticker name="icedCoffeeGirl" className="souraw-sticker--instagram" />
            </div>

            <div className="home-instagram-stage" data-aos="fade-up" data-aos-delay="120">
                <span className="home-instagram-sticker home-instagram-sticker-new" aria-hidden="true">
                    new post!
                </span>
                <span className="home-instagram-sticker home-instagram-sticker-date" aria-hidden="true">
                    07 · bake day
                </span>
                <span className="home-instagram-sticker home-instagram-sticker-check" aria-hidden="true">
                    starter check
                </span>
                <span className="home-instagram-arrow home-instagram-arrow-one" aria-hidden="true">↗</span>
                <span className="home-instagram-arrow home-instagram-arrow-two" aria-hidden="true">➜</span>
                <span className="home-instagram-heart" aria-hidden="true">♡</span>

                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-instagram-post"
                    aria-label="Open @souraw.us on Instagram"
                >
                    <div className="home-instagram-topbar">
                        <div className="home-instagram-profile">
                            <span className="home-instagram-avatar">S</span>
                            <div>
                                <strong>souraw.us</strong>
                                <span>Unrushed Lab</span>
                            </div>
                        </div>
                        <span className="home-instagram-dots" aria-hidden="true">•••</span>
                    </div>

                    <div className="home-instagram-media">
                        <img loading="lazy" decoding="async" src={instagramPostImage} alt="SOURAW starter behind the scenes" />
                    </div>

                    <div className="home-instagram-actions" aria-hidden="true">
                        <FaRegHeart />
                        <FaRegComment />
                        <FaRegPaperPlane />
                        <FaRegBookmark className="home-instagram-save" />
                    </div>

                    <p className="home-instagram-caption">
                        <strong>souraw.us</strong> The slow, messy, beautiful part of SOURAW.
                    </p>
                </a>
            </div>

            <img loading="lazy" decoding="async"
                className="home-instagram-bread-crew"
                src={breadCrew}
                alt=""
                aria-hidden="true"
            />

            <div className="home-instagram-marquee" aria-hidden="true">
                <div className="home-instagram-marquee-track">
                    <div className="home-instagram-marquee-group">
                        <span>FOLLOW THE MESS · FOLLOW THE RISE · FOLLOW @SOURAW.CV · </span>
                        <span>FOLLOW THE MESS · FOLLOW THE RISE · FOLLOW @SOURAW.CV · </span>
                        <span>FOLLOW THE MESS · FOLLOW THE RISE · FOLLOW @SOURAW.CV · </span>
                    </div>
                    <div className="home-instagram-marquee-group">
                        <span>FOLLOW THE MESS · FOLLOW THE RISE · FOLLOW @SOURAW.CV · </span>
                        <span>FOLLOW THE MESS · FOLLOW THE RISE · FOLLOW @SOURAW.CV · </span>
                        <span>FOLLOW THE MESS · FOLLOW THE RISE · FOLLOW @SOURAW.CV · </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
