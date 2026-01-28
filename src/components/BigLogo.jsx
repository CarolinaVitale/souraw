import React from 'react';
import logo from '../assets/logo-slogan.png'
import './BigLogo.css';

const BigLogo = () => {
    return (
        <div className='big-logo'>
            <div className="logo-container">
                <img className='big-logo-logo' src={logo} alt="Logo Souraw" />
            </div>
        </div>
    );
};

export default BigLogo;