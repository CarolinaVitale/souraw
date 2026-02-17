import React from 'react';
import './Hero.css';
import image from '../../assets/classic-bread.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import doll from '../../assets/doll.png';
import logo from "../../assets/green-logo.png";
import { Link } from 'react-router-dom';
import { ShoppingBag, BookOpen, Tag, WhatsappLogo } from '@phosphor-icons/react';


const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <img src={doll} className='hero-doll' alt='illustration' />
                    <br/>
                    <img src={logo} className='logo-souraw' alt='logo' />
                    <h1 data-aos='fade-up'>untamed • unrushed • unapologetic</h1>
                    <br />
                    <p data-aos='fade-up' data-aos-delay='200'>Productos 100% masa madre, hechos con intención y paciencia ♡ Panes que nutren el cuerpo, acompañan momentos y cuentan historias de bienestar ♡</p>
                    <br />

                    <div className='hero-buttons'>
                        <Link to="/pedidos" className='hero-text-button'>
                            pedidos  <ShoppingBag size={22} weight="light" style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                        </Link>

                        <Link to="/catalogo" className='hero-text-button'>
                            catálogo  <BookOpen size={22} weight="light" style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                        </Link>

                        <Link to="/lista-de-precios" className='hero-text-button'>
                            precios  <Tag size={22} weight="light" style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                        </Link>
                        <Link
                            to="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20♡"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-text-button"
                        >
                            whatsApp <WhatsappLogo size={22} weight="light" style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                        </Link>

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



                <div className="hero-image">
                    <img src={image} alt="Pan artesanal" data-aos='zoom-in' />
                </div>

            </div>
        </section>
    );
};

export default Hero;