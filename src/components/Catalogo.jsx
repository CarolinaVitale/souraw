import React, { useEffect, useMemo, useState } from "react";
import { catalogo } from "../data/productos";
import { useDollarRate } from "../hooks/useDollarRate";
import "./Catalogo.css";
import christmas from "../assets/christmas-decor.png";
import PanMune from "../assets/pan-muneca-navidad.png";
import Goodies from "../assets/goodies.webp";
import PanHorno from "../assets/pan-saliendo-del-horno.webp";
import MunecaRosa from "../assets/muneca-rosa-acostada.webp";

export default function Catalogo() {
    const { rate, source } = useDollarRate();
    const [ready, setReady] = useState(false);

    // ✅ esto crea una versión MEMORIZADA del array de imágenes
    const imagesToPreload = useMemo(
        () => [PanMune, Goodies, PanHorno, MunecaRosa],
        []
    );

    useEffect(() => {
        if (!rate) return;

        const loadImages = imagesToPreload.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve;
                })
        );

        Promise.all(loadImages).then(() => {
            setReady(true);
        });
    }, [rate, imagesToPreload]); // ✅ ahora sí: no hay warning

    if (!ready) {
        return (
            <div className="catalogo loading-screen">
                <p className="loading">Cargando precios</p>
            </div>
        );
    }

    const renderLista = (productos) =>
        productos.map((p, i) => (
            <div key={i} className="producto">
                <span>{p.nombre}</span>
                <span className="precio">
                    {(p.precioUSD * rate).toLocaleString("es-VE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}{" "}
                    Bs
                </span>
            </div>
        ));

    return (
        <div className="catalogo">
            <img src={christmas} className='christmas' alt='christmas decor' />
            <div className="imagen-logo-container">
                <img src={Goodies} alt="logo" className="imagen-logo" />
            </div>

            {/* HOGAZAS */}
            <div className="hogazas">
                <img src={PanMune} alt="Pan hogaza" className="imagen" />
                <div className="texto">
                    <h2 className="categoria">HOGAZAS</h2>
                    {renderLista(catalogo.hogazas)}
                </div>
            </div>

            <div className="image-container">
                <img src={PanHorno} alt="Pizza" className="hogaza-imagen" />
            </div>

            {/* CAPRICHOS */}
            <div className="title-caprichos">
                <h2 className="categoria caprichos-texto">PEQUEÑOS CAPRICHOS</h2>
            </div>
            <div className="caprichos">
                <div className="caprichos-container">
                    <div className="caprichos-texto">
                        {renderLista(catalogo.caprichos)}
                    </div>
                    <div className="caprichos-texto">{renderLista(catalogo.pizzas)}</div>
                </div>
            </div>

            {/* MUÑECA + NOTA */}
            <div className="muneca-container">
                <img src={MunecaRosa} alt="Muñeca decorativa" className="muneca" />
            </div>
            <div className="nota">
                *Tasa usada ({source}):{" "}
                {rate.toLocaleString("es-VE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}{" "}
                Bs/USD
            </div>
        </div>
    );
}