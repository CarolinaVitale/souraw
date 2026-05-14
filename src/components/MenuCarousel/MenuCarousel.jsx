import React from 'react';
import './MenuCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom'

// Imágenes desde assets
import menu10 from '../../assets/prices/cookies.webp';
import menu11 from '../../assets/prices/classic.webp';
import menu12 from '../../assets/prices/focaccia.webp';
import menu1 from '../../assets/prices/laminated.webp';
import menu2 from '../../assets/prices/4-roots.webp';
import menu3 from '../../assets/prices/tiramisu.webp';
import menu4 from '../../assets/prices/sandwich-loaf.webp';
import menu5 from '../../assets/prices/whole-wheat.webp';
import menu6 from '../../assets/prices/tiramisu.webp';
import menu7 from '../../assets/prices/mini-croissants.webp';
import menu8 from '../../assets/prices/chocolate-babka.webp';
import menu9 from '../../assets/prices/sweet-buns.webp';

const images = [menu10, menu11, menu12, menu3, menu4, menu5, menu1, menu2, menu6, menu7, menu8, menu9];

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