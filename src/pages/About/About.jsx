// src/pages/About.jsx
import React from 'react';
import WhySourdough from '../../components/WhySourdough/WhySourdough';
import AboutTimeline from '../../components/About/About';

const About = () => {
    return (
        <main className="about-page">
            <AboutTimeline />
            <WhySourdough />
        </main>
    );
};

export default About;
