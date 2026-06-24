import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import logo from "../../assets/logo-header.png";
import ContactDrawer from "../ContactDrawer/ContactDrawer";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useCart } from "../../context/CartContext";

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

    return (
        <>
            <nav className={navbar ? "navbar active" : "navbar"}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <img className="logo" src={logo} alt="logo" />
                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/orders" className="nav-links" onClick={closeMobileMenu}>
                                ORDERS
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/diy" className="nav-links" onClick={closeMobileMenu}>
                                DIY
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/souraw-finds" className="nav-links" onClick={closeMobileMenu}>
                                SOURAW FINDS 
                            </Link>
                        </li>


                        <li className="nav-item nav-more">
                            <button
                                type="button"
                                className="nav-links nav-more-btn"
                                onClick={() => setMoreOpen(!moreOpen)}
                            >
                                MORE <i className="fa-solid fa-chevron-down nav-chevron"></i>
                            </button>

                            <div className={moreOpen ? "nav-dropdown open" : "nav-dropdown"}>

                                <Link to="/menu" className="nav-links" onClick={closeMobileMenu}>
                                    MENU
                                </Link>

                                <Link to="/about" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    ABOUT
                                </Link>

                                <Link to="#" className="nav-dropdown-link" onClick={openContact}>
                                    CONTACT
                                </Link>

                                <Link to="/schedule" className="nav-links" onClick={closeMobileMenu}>
                                    SCHEDULE
                                </Link>

                                <Link to="/reviews" className="nav-dropdown-link" onClick={closeMobileMenu}>
                                    REVIEWS
                                </Link>
                                
                            </div>
                        </li>

                        <li className="nav-item mobile-only">
                            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                                ABOUT
                            </Link>
                        </li>

                        <li className="nav-item mobile-only">
                            <Link to="#" className="nav-links" onClick={openContact}>
                                CONTACT
                            </Link>
                        </li>

                        <li className="nav-item mobile-only">
                            <Link to="/reviews" className="nav-links" onClick={closeMobileMenu}>
                                REVIEWS
                            </Link>
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