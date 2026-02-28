// src/pages/About.jsx
import React from 'react';
import WhySourdough from '../../components/WhySourdough/WhySourdough';
import AboutTimeline from '../../components/About/About';

const About = () => {
    return (
        <section className="about-page">
            <AboutTimeline />
            <WhySourdough />
        </section>
    );
};

export default About;