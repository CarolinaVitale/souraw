import React from 'react';
import './ChoosingUs.css';
import illustration from '../assets/baguette.png';

const ChoosingUs = () => {
    return (
        <section  className="choosing-us" id="about">
            <h2 className="choosing-title">
                <span className="biro">Elegir </span>
                <span className="nauryz">sOURaW </span>
                <span className="biro">es elegirte</span>
            </h2>
            <div data-aos='fade-right' className="illustration-wrapper">
                <img src={illustration} alt="Ilustración SOURAW" />
            </div>
        </section>
    );
};

export default ChoosingUs;