// src/pages/About.jsx
import React from 'react';
import './About.css';
import historiaImg from '../assets/bread-packaging.webp';
import WhySourdough from '../components/WhySourdough';

const About = () => {
    return (
        <section className="about-page">

            <div className="about-content">

                <div className="about-text">
                    <h2 data-aos='fade-right'>Un propósito fermentado</h2>
                    <p data-aos='fade-up'>
                        SOURAW nació de una búsqueda por el bienestar. En un momento emocionalmente difícil —con cambios familiares, distancias, y un diagnóstico que marcó mi vida— el pan de masa madre apareció como refugio.
                    </p>
                    <p data-aos='fade-up'>
                        Lo que comenzó como un intento por cuidar mi salud digestiva, se convirtió en una rutina sanadora. La harina, el agua, el tiempo… y las manos. Encontré en cada hogaza una pausa, una meditación, un propósito.
                    </p>
                    <p data-aos='fade-up'>
                        SOURAW no es una panadería común. Es un proyecto íntimo, hecho con intención y con ingredientes reales. Es una forma de compartir ese camino de vuelta al cuerpo, a lo natural, y a lo que nos hace bien.
                    </p>
                    <p data-aos='fade-up'>
                        Aquí, cada pan cuenta una historia. Y si estás acá, ya eres parte de ella.
                    </p>
                </div>

                <div className="about-image">
                    <img src={historiaImg} alt="Ilustración historia" data-aos='fade-left' />
                </div>
            </div>
            <WhySourdough />
        </section>
    );
};

export default About;