import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';
import logo from '../../assets/logo-header.png'
import ContactDrawer from '../ContactDrawer/ContactDrawer';

function Navbar() {
    const [click, setClick] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => window.removeEventListener('scroll', changeBackground);
    }, []);

    return (
        <>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img className='logo' src={logo} alt='logo' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        <li className='nav-item'>
                            <Link
                                to='/about'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                ABOUT
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
                            <Link
                                to='/products'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                PRODUCTS
                            </Link>
                        </li> */}

                        <li className='nav-item'>
                            <Link
                                to="#"
                                className="nav-links"
                                onClick={(e) => {
                                    e.preventDefault();
                                    closeMobileMenu();
                                    setContactOpen(true);
                                }}
                            >
                                CONTACT
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/reviews'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                REVIEWS
                            </Link>
                        </li>
                        {/* <li className='nav-item'>
                            <Link
                                to='/orders'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                ORDERS
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
            <ContactDrawer
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
}

export default Navbar;


