import React from 'react';
import Hero from '../components/Hero/Hero';
import Carousel from '../components/MenuCarousel/MenuCarousel';
import Illustration from '../components/Illustration/Illustration';
import Ribbon from '../components/Ribbon/Ribbon';
import HomeStarterFeature from '../components/HomeConversion/HomeStarterFeature';
import HomePathways from '../components/HomeConversion/HomePathways';
import HomeInstagramFeed from '../components/HomeConversion/HomeInstagramFeed';
import Founder from '../components/Founder/Founder';
import SpecialtiesCollage from '../components/SpecialtiesCollage/SpecialtiesCollage';
import ChoosingUs from '../components/ChoosingUs/ChoosingUs';

const Home = () => {
    return (
        <>
            <Hero />
            <div id="home-after-hero">
                <Ribbon />
            </div>
            <HomeStarterFeature />
            <HomePathways />
            <HomeInstagramFeed />
            <Founder />
            <ChoosingUs />
            <SpecialtiesCollage />
            <Carousel />
            <Illustration />
        </>
    );
};

export default Home;
