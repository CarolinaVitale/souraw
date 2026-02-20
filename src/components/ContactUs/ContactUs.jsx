import React from 'react';
import './ContactUs.css';
import contactIllustration from '../../assets/illustration.png'; 


const ContactUs = () => {
    return (
        <section className="contact-section">

            <div className="contact-content">
                <div className="contact-text">

                    <h2>Contact Us</h2>

                    <p>
                        Would you like to place an order, learn more about our products, or simply say hello?
                        Write to us and let’s start sharing sourdough with purpose
                    </p>
                    <a
                        href="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20♡"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-button"
                    >
                        WhatsApp
                    </a>
                </div>

                <div className="contact-us-image">
                    <img src={contactIllustration} alt="Ilustración de contacto" />
                </div>

            </div>
        </section>
    );
};

export default ContactUs;