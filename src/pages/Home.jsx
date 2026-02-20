// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero/Hero';
import ChoosingUs from '../components/ChoosingUs/ChoosingUs';
import Carousel from '../components/MenuCarousel/MenuCarousel';
import Illustration from '../components/Illustration/Illustration';
import Specialties from '../components/Specialties/Specialties';
import Contact from '../components/ContactUs/ContactUs';
import Ribbon from '../components/Ribbon/Ribbon';
import Founder from '../components/Founder/Founder'
// import BigLogo from '../components/BigLogo';

const Home = () => {
    return (
        <>
            {/* <BigLogo /> */}
            <Hero />
            <Ribbon />
            <Founder />
            <ChoosingUs />
            <Carousel />
            <Specialties />
            <Contact />
            <Illustration />
        </>
    );
};

export default Home;