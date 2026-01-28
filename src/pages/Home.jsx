// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import ChoosingUs from '../components/ChoosingUs';
import Carousel from '../components/MenuCarousel';
import Illustration from '../components/Illustration';
import Specialties from '../components/Specialties';
import Contact from '../components/ContactUs';
// import BigLogo from '../components/BigLogo';

const Home = () => {
    return (
        <>
            {/* <BigLogo /> */}
            <Hero />
            <ChoosingUs />
            <Carousel />
            <Specialties />
            <Contact />
            <Illustration />
        </>
    );
};

export default Home;