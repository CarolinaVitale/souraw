// src/pages/About.jsx
import React from 'react';
import './About.css';
import historiaImg from '../../assets/bread-packaging.webp';
import WhySourdough from '../../components/WhySourdough/WhySourdough';

const About = () => {
    return (
        <section className="about-page">

            <div className="about-content">

                <div className="about-text">
                    <h2 data-aos='fade-right'>Titulo</h2>
                    <p data-aos='fade-up'>
                        &lt;p&gt; Hello world &lt;/p&gt;
                    </p>
                    <p data-aos='fade-up'>
                        If you’re here, it means you want to know a little more about me.    
                    </p>
                    <p data-aos='fade-up'>
                        So here is my story.
                    </p>
                    <p data-aos='fade-up'>
                        My name is Carolina Vitale. I was born in Venezuela and raised in a very small town called Acarigua. All four of my grandparents were Italian, so I grew up surrounded by tradition — especially in the kitchen. Flour on the counter, long conversations around the table, hands always preparing something with love.
                    </p>
                    <p data-aos='fade-up'>
                        Since I was little, I’ve been deeply curious. I always dreamed of traveling, of seeing the world. If I’m honest, I never truly felt like I belonged while living in Venezuela. I was grateful — but restless.
                    </p>
                    
                </div>

                <div className="about-image">
                    <img src={historiaImg} alt="Ilustración historia" data-aos='fade-left' />
                </div>
            </div>

            
            <WhySourdough />
        </section>
    );
};

export default About;