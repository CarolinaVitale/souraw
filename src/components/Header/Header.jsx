import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import logomovil from '../../assets/header-logo-movil.png';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header-full">
            <nav className="top-nav">
                {/* Logo móvil */}
                <NavLink to="/" className="mobile-logo" onClick={closeMenu}>
                    <img src={logomovil} alt="Logo Souraw" />
                </NavLink>

                {/* Nombre Souraw visible solo en desktop */}
                <div className="nav-left">
                    <NavLink to="/" className="navbar-home" onClick={closeMenu}>
                        sOURaW
                    </NavLink>
                </div>

                {/* Navegación */}
                <ul className={`top-nav-list ${menuOpen ? 'show' : ''}`}>
                    <div className="navbar-pages-group">
                        <li className="navbar-pages">
                            <NavLink to="/nosotros" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>nosotros</NavLink>
                        </li>
                        <li className="navbar-pages">
                            <NavLink to="/catalogo" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>catálogo</NavLink>
                        </li>
                        <li className="navbar-pages">
                            <NavLink to="/contacto" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>contacto</NavLink>
                        </li>
                        <li className="navbar-pages">
                            <NavLink to="/pedidos" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>pedidos</NavLink>
                        </li>
                        <li className="navbar-pages">
                            <NavLink to="/resenas" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>reseñas</NavLink>
                        </li>
                    </div>
                </ul>

                {/* Hamburguesa */}
                <button className="hamburger" onClick={toggleMenu}>☰</button>
            </nav>
        </header>
    );
};

export default Header;


