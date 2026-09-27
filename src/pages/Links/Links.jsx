import React from 'react';
import { Link } from 'react-router-dom';
import { FaAddressCard, FaInstagram, FaTiktok, FaArrowRight, FaShoppingBag, FaHeart } from 'react-icons/fa';
import face from '../../assets/brand-elements/face-pink.png';
import './Links.css';

const destinations = [
    { href: '/souraw.vcf', download: 'SOURAW.vcf', title: 'Save our CONTACT', emphasis: 'CONTACT', description: 'Keep SOURAW a tap away.', icon: FaAddressCard, color: 'cream' },
    { to: '/orders', title: 'ORDERS', emphasis: 'ORDERS', description: 'Your next sourdough obsession starts here.', icon: FaShoppingBag, color: 'red' },
    { to: '/souraw-finds', title: 'SOURAW finds', description: 'The tools & little things we love.', icon: FaHeart, color: 'yellow' },
];

export default function Links() {
    return (
        <main className="souraw-links-page">
            <div className="souraw-links-background" aria-hidden="true">
                <span className="souraw-links-orbit souraw-links-orbit--pink" />
                <span className="souraw-links-orbit souraw-links-orbit--blue" />
                <span className="souraw-links-bubble souraw-links-bubble--pink" />
            </div>
            <div className="souraw-links-shell">
                <header className="souraw-links-intro">
                    <h1><i className="fa-solid fa-heart top-heart"></i></h1>
                    <h1>
                        <span className="souraw-links-heading-line"><span className="souraw-links-daily">Your daily</span> <img className="souraw-links-avatar" src={face} alt="" /></span>
                        <span className="souraw-links-heading-accent">dose of SOURAW.</span>
                    </h1>
                    <p className="souraw-links-kicker">a little bit of everything</p>
                    <p>Bread, finds & good things. All in one place.</p>
                </header>

                <nav className="souraw-links-list" aria-label="Explore SOURAW">
                    {destinations.map(({ to, href, download, title, emphasis, description, icon: Icon, color }) => {
                        const content = <>
                            <span className="souraw-links-icon"><Icon aria-hidden="true" /></span>
                            <span className="souraw-links-label"><strong>{emphasis ? <>{title.slice(0, title.indexOf(emphasis))}<span className="souraw-links-emphasis">{emphasis}</span></> : title}</strong><span>{description}</span></span>
                            <FaArrowRight className="souraw-links-arrow" aria-hidden="true" />
                        </>;
                        const className = `souraw-links-card souraw-links-card--${color}`;
                        return to ? <Link key={title} to={to} className={className}>{content}</Link> :
                            <a key={title} href={href} download={download} className={className}>{content}</a>;
                    })}
                </nav>

                <section className="souraw-links-social" aria-labelledby="souraw-social-title">
                    <h2 id="souraw-social-title">Follow the good stuff</h2>
                    <div className="souraw-links-social-grid">
                        <a href="https://www.instagram.com/souraw.us" target="_blank" rel="noopener noreferrer">
                            <FaInstagram aria-hidden="true" /><span><strong>Instagram</strong><span>@souraw.us</span></span><span aria-hidden="true">↗</span>
                        </a>
                        <a href="https://www.tiktok.com/@souraw.cv" target="_blank" rel="noopener noreferrer">
                            <FaTiktok aria-hidden="true" /><span><strong>TikTok</strong><span>@souraw.cv</span></span><span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </section>
                <Link className="souraw-links-home" to="/">Explore the whole SOURAW world <span aria-hidden="true">↗</span></Link>
                <p className="souraw-links-signoff">untamed • unrushed • unapologetic</p>
            </div>
        </main>
    );
}
