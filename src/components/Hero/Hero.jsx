import React from "react";
import "./Hero.css";
import doll from '../../assets/doll.png';
import { Link } from "react-router-dom";
import { ShoppingBag, BookOpen, WhatsappLogo } from "@phosphor-icons/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';


const Hero = () => {
    return (
        <section
            className="heroOverlay"
        >
            <div className="heroOverlay-inner">
                <div className="heroOverlay-card">
                    <div className="heroOverlay-eyebrow"><i className="fa-regular fa-heart"></i></div>

                    <img src={doll} className='hero-doll' alt='illustration' />

                    <h1 className="heroOverlay-title">untamed • unrushed • unapologetic</h1>

                    <p className="heroOverlay-subtitle">
                        100% sourdough, crafted with intention and patience <i className="fa-regular fa-heart"></i> Breads that nourish the body, hold space for special moments, and tell stories of well-being <i className="fa-regular fa-heart"></i>
                    </p>

                    <div className="heroOverlay-actions">
                        <Link to="/orders" className="heroOverlay-btn">
                            orders <ShoppingBag size={20} weight="light" />
                        </Link>

                        <Link to="/products" className="heroOverlay-btn">
                            produts <BookOpen size={20} weight="light" />
                        </Link>

                        {/* <Link to="/lista-de-precios" className="heroOverlay-btn">
                            prices <Tag size={20} weight="light" />
                        </Link> */}

                        <a
                            href="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20♡"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="heroOverlay-btn"
                        >
                            WhatsApp <WhatsappLogo size={20} weight="light" />
                        </a>
                    </div>


                    <div className="social-icons">
                        <a
                            href="https://instagram.com/souraw.cv"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a
                            href="https://www.tiktok.com/@souraw.cv"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <FontAwesomeIcon icon={faTiktok} size="2x" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;