import React from 'react';
import './Orders.css';
import pedidoImg from '../assets/orders.webp';
import { Calendar, Bread, Clock, CookingPot, WhatsappLogo } from '@phosphor-icons/react';

const Pedidos = () => {
    return (
        <section className="pedidos-section">
            <div className="pedidos-text">
                <h2 data-aos="fade-up">¿Quieres hacer un pedido?</h2>

                <p data-aos="fade-up" data-aos-delay="100">
                    Cada producto necesita <strong>48 horas</strong> desde que comienzo a alimentar la masa madre.
                </p>

                <div className="pedidos-bullets" data-aos="fade-up" data-aos-delay="150">
                    <p className="pedido-line">
                        <Calendar className="pedido-icon" weight="light" />
                        <strong>  Días de masas:</strong>&nbsp;lunes, miércoles y viernes.
                    </p>
                    <p className="pedido-line">
                        <Bread className="pedido-icon" weight="light" />
                        <strong>  Días de entrega:</strong>&nbsp;martes, jueves y sábado.
                    </p>
                    <p className="pedido-line">
                        <CookingPot className="pedido-icon" weight="light" />
                        <strong> Martes:</strong>&nbsp;solo Tequeños.
                    </p>
                </div>

                <div className="pedidos-deadlines" data-aos="fade-up" data-aos-delay="200">
                    <p className="pedido-line">
                        <Clock className="pedido-icon" weight="light" />
                        <strong> Haz tu pedido antes de:</strong>
                    </p>
                    <ul className="pedido-list">
                        <li><strong>DOMINGO 8:00 pm</strong> → para recibir el <strong>MARTES</strong></li>
                        <li><strong>MARTES 8:00 pm</strong> → para recibir el <strong>JUEVES</strong></li>
                        <li><strong>JUEVES 8:00 pm</strong> → para recibir el <strong>SÁBADO</strong></li>
                    </ul>
                </div>

                <p data-aos="fade-up" data-aos-delay="250" className="pedidos-sello">
                    Solo productos del día: <strong > NUNCA DE AYER, SIEMPRE DE HOY ♡</strong>
                </p>

                <h2 data-aos="zoom-in" data-aos-delay="300">¿Qué se te antoja hoy?</h2>
                <a
                    href="https://wa.me/584121531299?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20%E2%99%A1"
                    className="pedidos-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="zoom-in"
                    data-aos-delay="350"
                >
                    <WhatsappLogo size={22} weight="light" style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                    pídelo aquí ♡
                </a>
            </div>

            <div className="pedidos-image">
                <img data-aos="fade-left" src={pedidoImg} alt="Bolsas de pan SOURAW" />
            </div>
        </section>
    );
};

export default Pedidos;