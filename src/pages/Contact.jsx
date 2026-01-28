import React from 'react';
import './Contact.css';
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';
import contactIllustration from '../assets/illustration-pizza.png'; 


const Contact = () => {
    return (
        <section className="contact-page">

            <div className="contact-wrapper">

                <div className="contact-image">
                    <img src={contactIllustration} alt="Ilustración de contacto" />
                </div>

                <div className="contact-info">
                    <h2 className="contact-title">Contáctanos</h2>
                    <p className="contact-text">
                        ¿Tienes preguntas? ¿Quieres pedir pan o solo saludar? Estamos felices de leerte. Escríbenos por WhatsApp, Instagram o TikTok.
                    </p>

                    <div className="contact-icons">
                        <a href="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20♡" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp />
                        </a>
                        <a href="https://www.instagram.com/souraw.cv" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.tiktok.com/@souraw.cv" target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                        </a>
                    </div>
                </div>
               
            </div>
        </section>
    );
};

export default Contact;