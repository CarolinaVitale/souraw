import React from 'react';
import './MenuCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom'

// Imágenes desde assets
import menu10 from '../../assets/4-raices.webp';
import menu11 from '../../assets/hojaldre.webp';
import menu12 from '../../assets/hoagie.webp';
import menu1 from '../../assets/clasico.webp';
import menu2 from '../../assets/integral.webp';
// import menu3 from '../assets/tocineta-cebolla.webp';
// import menu4 from '../assets/aji-tocineta.webp';
// import menu5 from '../assets/queso.png';
import menu6 from '../../assets/cuernitos.webp';
import menu7 from '../../assets/tequenos.webp';
import menu8 from '../../assets/focaccia.webp';
import menu9 from '../../assets/pizza.webp';

const images = [menu10, menu11, menu12, menu1, menu2, menu6, menu7, menu8, menu9];

const MenuCarousel = () => {
    return (
        <section className="menu-carousel">
            {/* <h2 className="menu-title">Nuestros productos</h2> */}
            <br /><br /><br /><br />

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 3 },
                }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Menú ${index + 1}`} className="menu-slide-img" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="catalog-button-wrapper">
                <Link to="/products" className="catalog-button">
                    our products
                </Link>
            </div>
        </section>
    );
};

export default MenuCarousel;