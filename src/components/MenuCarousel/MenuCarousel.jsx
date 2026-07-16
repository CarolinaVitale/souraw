import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./MenuCarousel.css";

import cookies from "../../assets/prices/cookies.webp";
import classic from "../../assets/prices/classic.webp";
import focaccia from "../../assets/prices/focaccia.webp";
import laminated from "../../assets/prices/laminated.webp";
import roots from "../../assets/prices/4-roots.webp";
import tiramisu from "../../assets/prices/tiramisu.webp";
import sandwich from "../../assets/prices/sandwich-loaf.webp";
import wholeWheat from "../../assets/prices/whole-wheat.webp";
import croissants from "../../assets/prices/mini-croissants.webp";
import babka from "../../assets/prices/chocolate-babka.webp";
import sweetBuns from "../../assets/prices/sweet-buns.webp";

const products = [
    { image: cookies, name: "chocolate chip cookies", note: "soft center / crisp edge" },
    { image: classic, name: "the classic", note: "crackly / tangy / unrushed" },
    { image: focaccia, name: "focaccia", note: "olive oil / bubbly edges" },
    { image: roots, name: "four roots", note: "deep flavor / real ingredients" },
    { image: laminated, name: "laminated", note: "flaky layers / sourdough" },
    { image: tiramisu, name: "tiramisu", note: "the sweet side of SOURAW" },
    { image: sandwich, name: "sandwich loaf", note: "soft / everyday / slow" },
    { image: wholeWheat, name: "whole wheat", note: "nutty / nourishing" },
    { image: croissants, name: "mini croissants", note: "tiny but mighty" },
    { image: babka, name: "chocolate babka", note: "swirled / rich / fermented" },
    { image: sweetBuns, name: "sweet buns", note: "pillowy / sticky / worth it" },
];

export default function MenuCarousel() {
    return (
        <section className="menu-carousel" aria-labelledby="menu-carousel-title">
            <div className="menu-carousel-head">
                <div>
                    <p className="menu-kicker">from the oven</p>
                    <h2 id="menu-carousel-title">The oven has range.</h2>
                </div>
                <p>
                    Naturally leavened loaves, laminated things, sweets, and
                    small-batch experiments — all made with intention.
                </p>
            </div>

            <Swiper
                className="menu-swiper"
                modules={[Navigation, Pagination]}
                spaceBetween={22}
                slidesPerView={1.08}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    700: { slidesPerView: 2.15 },
                    1050: { slidesPerView: 3.15 },
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={product.name}>
                        <article className={`menu-product-card menu-product-card-${(index % 3) + 1}`}>
                            <span className="menu-product-number">{String(index + 1).padStart(2, "0")}</span>
                            <img src={product.image} alt={product.name} className="menu-slide-img" />
                            <div className="menu-product-copy">
                                <h3>{product.name}</h3>
                                <p>{product.note}</p>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Link to="/menu" className="catalog-button">
                explore all products <span aria-hidden="true">↗</span>
            </Link>
        </section>
    );
}
