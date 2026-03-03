import React from 'react';
import './Contact.css';
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';
import contactIllustration from '../../assets/illustration-pizza.png'; 


const Contact = () => {
    return (
        <section className="contact-page">

            <div className="contact-wrapper">

                <div className="contact-image">
                    <img src={contactIllustration} alt="Ilustración de contacto" />
                </div>

                <div className="contact-info">
                    <h2 className="contact-title">Get in touch</h2>
                    <p className="contact-text">
                        Have a question? Craving some bread? Or just want to say hello?
                        We’re always happy to hear from you.
Reach out on WhatsApp, Instagram, or TikTok.                    </p>

                    <div className="contact-icons">
                        <a 
                            href="https://wa.me/584121531299?text=Hi%2C%20I%27d%20love%20to%20place%20an%20order%20%E2%99%A1" target="_blank" rel="noopener noreferrer">
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