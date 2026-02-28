import React from 'react';
import panes from '../../data/panes';
import dulces from '../../data/dulces';
import otros from '../../data/otros';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Catalog.css';
import PageBanner from '../../components/PageBanner/PageBanner';
import bannerImage from '../../assets/banner3.jpg'

// import { Link } from 'react-router-dom'

const Catalog = () => (

    <>
        <PageBanner image={bannerImage} kicker="Our Bread..." title="SLOWLY MADE. WILDLY SOURAW" />

        <section className="catalog">
            <h2 data-aos='fade-up'>Crust & Crumb <i className="fa-solid fa-heart"></i></h2>
            <div className="catalog-grid" data-aos='fade-up' data-aos-delay="100">
                {panes.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            <h2 data-aos='fade-up'>Slow Cravings <i className="fa-solid fa-heart"></i></h2>
            <div className="catalog-grid" data-aos='fade-up' data-aos-delay="100">
                {otros.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            <h2 data-aos='fade-up'>Sweet Pauses <i className="fa-solid fa-heart"></i></h2>
            <div className="catalog-grid" data-aos='fade-up' data-aos-delay="100">
                {dulces.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            {/* <h2 data-aos='fade-up'>Lista de precios</h2>
        ˝<div className='catalogo-price-image' data-aos='fade-up' data-aos-delay="100">
            <img src={ listaPrecios } alt='lista-de-precios'/>
        </div> */}

            {/* <div className="list-button">
            <Link to="/lista-de-precios" className="catalog-button">
                ver lista de precios ♡
            </Link>
        </div> */}

        </section>
    </>

);

export default Catalog;