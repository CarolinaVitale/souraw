import React from 'react';
import Hero from '../components/Hero/Hero';
import Carousel from '../components/MenuCarousel/MenuCarousel';
import Illustration from '../components/Illustration/Illustration';
import Contact from '../components/ContactUs/ContactUs';
import Ribbon from '../components/Ribbon/Ribbon';
import Founder from '../components/Founder/Founder';
import SpecialtiesCollage from '../components/SpecialtiesCollage/SpecialtiesCollage';
import RealIngredients from '../components/Ingredients/Ingredients';

const Home = () => {
    return (
        <>
            <Hero />
            <Ribbon />
            <Founder />
            <RealIngredients />
            <SpecialtiesCollage />
            <Carousel />
            <Contact />
            <Illustration />
        </>
    );
};

export default Home;




