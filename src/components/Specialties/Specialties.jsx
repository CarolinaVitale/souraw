import React from 'react';
import './Specialties.css';
import img1 from '../../assets/special1.jpeg';
import img5 from '../../assets/special5.jpeg';
import img6 from '../../assets/special6.jpeg';
import img7 from '../../assets/special7.jpeg';
import img8 from '../../assets/special8.jpeg';
import img9 from '../../assets/special9.jpeg';


const specialties = [
    { img: img9},
    { img: img1},
    { img: img5},
    { img: img7},
    { img: img6},
    { img: img8}
];

const Specialties = () => {
    return (
        <section className="specialties" id="specialties">
            <h2 className='specialties-title'>Nuestras especialidades </h2>
            <div className="specialties-grid">
                {specialties.map((item, index) => (
                    <div key={index} className="specialty-card">
                        <img src={item.img} alt={item.name} />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Specialties;