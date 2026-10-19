import React from 'react';
import { Link } from 'react-router-dom';
import { FaAddressCard, FaInstagram, FaTiktok, FaArrowRight, FaShoppingBag, FaHeart, FaEtsy } from 'react-icons/fa';
import face from '../../assets/brand-elements/face-pink.png';
import './Links.css';

const destinations = [
    { href: '/souraw.vcf', download: 'SOURAW.vcf', title: 'Save our CONTACT', emphasis: 'CONTACT', description: 'Keep SOURAW a tap away.', icon: FaAddressCard, color: 'cream' },
    { to: '/orders', title: 'ORDERS', emphasis: 'ORDERS', description: 'Your next sourdough obsession starts here.', icon: FaShoppingBag, color: 'red' },
    { href: 'https://souraw.etsy.com', external: true, title: 'Shop on ETSY', emphasis: 'ETSY', description: 'Visit our SOURAW shop on Etsy.', icon: FaEtsy, color: 'cream' },
    { to: '/souraw-finds', title: 'SOURAW finds', description: 'The tools & little things we love.', icon: FaHeart, color: 'yellow' },
];

export default function Links() {
    return (
        <main className="souraw-links-page">
            <div className="souraw-links-shell">
                <header className="souraw-links-intro">
                    <p className="souraw-links-eyebrow">THE SOURAW EDIT / GOOD THINGS, GATHERED.</p>
                    <h1>Your daily<br />dose of <span>SOURAW.</span></h1>
                    <div className="souraw-links-intro-note">
                        <p>Bread, finds &amp; good things.<br />A little bit of everything. All in one place.</p>
                        <img className="souraw-links-avatar" src={face} alt="" />
                    </div>
                </header>

                <nav className="souraw-links-list" aria-label="Explore SOURAW">
                    {destinations.map(({ to, href, download, external, title, emphasis, description, icon: Icon, color }, index) => {
                        const content = <>
                            <span className="souraw-links-number" aria-hidden="true">0{index + 1}</span>
                            <span className="souraw-links-icon"><Icon aria-hidden="true" /></span>
                            <span className="souraw-links-label"><strong>{emphasis ? <>{title.slice(0, title.indexOf(emphasis))}<span className="souraw-links-emphasis">{emphasis}</span></> : title}</strong><span>{description}</span></span>
                            <FaArrowRight className="souraw-links-arrow" aria-hidden="true" />
                        </>;
                        const className = `souraw-links-card souraw-links-card--${color}`;
                        return to ? <Link key={title} to={to} className={className}>{content}</Link> :
                            <a key={title} href={href} download={download} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={className}>{content}</a>;
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
