import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import logo from "../../assets/logo-header.png";
import ContactDrawer from "../ContactDrawer/ContactDrawer";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useCart } from "../../context/CartContext";
import { CONTACT_DRAWER_EVENT } from "../../utils/contactDrawer";

function Navbar() {
    const [click, setClick] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { cartCount } = useCart();

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => {
        setClick(false);
        setMoreOpen(false);
    };

    const openContact = (e) => {
        e.preventDefault();
        closeMobileMenu();
        setContactOpen(true);
    };

    const changeBackground = () => {
        setNavbar(window.scrollY >= 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        return () => window.removeEventListener("scroll", changeBackground);
    }, []);

    useEffect(() => {
        document.body.style.overflow = click ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [click]);

    useEffect(() => {
        const handleContactRequest = () => {
            setClick(false);
            setMoreOpen(false);
            setContactOpen(true);
        };

        window.addEventListener(CONTACT_DRAWER_EVENT, handleContactRequest);
        return () => window.removeEventListener(CONTACT_DRAWER_EVENT, handleContactRequest);
    }, []);

    return (
        <>
            <nav className={navbar || click ? "navbar active" : "navbar"}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img className="logo" src={logo} alt="logo" />
                    </Link>

                    <button
                        type="button"
                        className={click ? "menu-icon is-open" : "menu-icon"}
                        onClick={handleClick}
                        aria-label={click ? "Close navigation" : "Open navigation"}
                        aria-expanded={click}
                    >
                        <span />
                        <span />
                    </button>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/orders" className="nav-links" onClick={closeMobileMenu}>
                                ORDERS
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/starter" className="nav-links" onClick={closeMobileMenu}>
                                STARTER
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/souraw-finds" className="nav-links" onClick={closeMobileMenu}>
                                SOURAW FINDS 
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/diy" className="nav-links" onClick={closeMobileMenu}>
                                DIY
                            </Link>
                        </li>

                        <li className="nav-item nav-more">
                            <button
                                type="button"
                                className="nav-links nav-more-btn"
                                onClick={() => setMoreOpen(!moreOpen)}
                                aria-expanded={moreOpen}
                            >
                                <span>MORE</span>
                                <span className="nav-more-mark" aria-hidden="true">+</span>
                            </button>

                            <div className={moreOpen ? "nav-dropdown open" : "nav-dropdown"}>
                                <p className="nav-dropdown-label">Keep exploring</p>

                                <Link to="/menu" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    MENU
                                </Link>

                                <Link to="/about" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    ABOUT
                                </Link>

                                <Link to="/untamed-studio" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    UNTAMED STUDIO
                                </Link>

                                <Link to="#" className="nav-dropdown-link" onClick={openContact}>
                                    CONTACT
                                </Link>

                                <Link to="/schedule" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    SCHEDULE
                                </Link>

                                <Link to="/reviews" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    REVIEWS
                                </Link>
                                
                            </div>
                        </li>

                        
                    </ul>
                    <button
                        className="cart-button"
                        onClick={() => setCartOpen(true)}
                    >
                        <i className="fas fa-shopping-bag cart-icon"></i>

                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                </div>
            </nav>

            <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
}

export default Navbar;
