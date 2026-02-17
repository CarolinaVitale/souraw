import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <h3 className="footer-brand">sOURaW</h3>
            <p className="footer-tagline">untamed • unrushed • unapologetic</p>

            <div className="footer-links">
                <a
                    href="https://instagram.com/souraw.cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a
                    href="https://www.tiktok.com/@souraw.cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                >
                    <FontAwesomeIcon icon={faTiktok} size="lg" />
                </a>
                <a
                    href="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20♡"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                >
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                </a>
            </div>

            <p className="footer-copy"> © {new Date().getFullYear()}  SOURAW. Todos los derechos reservados.</p>

            <div className='created'>
                <small className='created-by'> website by
                    <Link className='created-by-link' to='https://carolavitale.com/' target='_blank'> Carola Vitale
                    </Link>
                </small>
            </div>

        </footer>
    );
};

export default Footer;