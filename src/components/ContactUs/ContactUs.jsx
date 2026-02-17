import React from 'react';
import './ContactUs.css';
import contactIllustration from '../../assets/illustration.png'; 


const ContactUs = () => {
    return (
        <section className="contact-section">

            <div className="contact-content">
                <div className="contact-text">

                    <h2>Contáctanos</h2>

                    <p>
                        ¿Querés hacer un pedido, saber más sobre nuestros productos o simplemente saludar?
                        ¡Escríbenos y empecemos a compartir masa madre con propósito!
                    </p>
                    <a
                        href="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20♡"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-button"
                    >
                        escribir por WhatsApp
                    </a>
                </div>

                <div className="contact-us-image">
                    <img src={contactIllustration} alt="Ilustración de contacto" />
                </div>

x
            </div>
        </section>
    );
};

export default ContactUs;