import React from "react";
// import precios from "../assets/price-list.webp";
import './Prices.css'
import PricesList from '../components/Catalogo'

const Prices = () => {
    return (
        <div className="lista-precios-container">
            <PricesList />
            {/* <img
                src={precios}
                alt="Lista de precios"
                className="lista-precios-img"
            /> */}
        </div>
    );
};


export default Prices;