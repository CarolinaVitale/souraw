import React from "react";
import { motion } from "framer-motion";
import "./SpecialtiesCollage.css";

import imgA from "../../assets/special5.jpg";
import imgB from "../../assets/special4.jpg";
import imgC from "../../assets/special7.jpg";
import imgD from "../../assets/special6.jpg";
import imgE from "../../assets/special11.jpeg";
import circular from "../../assets/special8.jpg";
import fermentina from "../../assets/fermentina.gif";

import baguetteDoodle from "../../assets/element-baguette.png";
import breadDoodle from "../../assets/bread-illustration.png";
import crumbs from "../../assets/crumbs.PNG";

const BOARD = [
    { id: "van", src: imgA, alt: "Souraw specialty 1", className: "tile tile--van", washi: "washi--pink" },
    { id: "center", src: imgB, alt: "Souraw specialty 2", className: "tile tile--center", washi: "washi--cream" },
    { id: "palette", src: imgC, alt: "Souraw specialty 3", className: "tile tile--palette", washi: "washi--yellow" },
    { id: "pool", src: imgD, alt: "Souraw specialty 4", className: "tile tile--pool", washi: "washi--green" },
    { id: "surfer", src: imgE, alt: "Souraw specialty 5", className: "tile tile--surfer", washi: "washi--violet" },
    { id: "fermentina", src: fermentina, alt: "Fermentina (starter)", className: "tile tile--fermentina", washi: "washi--violet" },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

const item = {
    hidden: { opacity: 0, y: 18, scale: 0.985, rotate: -0.6 },
    show: { opacity: 1, y: 0, scale: 1, rotate: 0 },
};

const hover = {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.8, ease: "easeOut" },
};

export default function SpecialtiesCollage() {
    return (
        <section className="specBoard" aria-label="Souraw specialties collage">
            <div className="specBoard-wrap">
                {/* ✅ header válido */}
                <motion.header
                    className="specBoard-head"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="sp-kicker">Why Sourdough?</p>
                    <h2 className="sp-h2">
                        FROM OUR OVEN <i className="fa-solid fa-heart" aria-hidden="true" />
                    </h2>
                </motion.header>

                <motion.div
                    className="board"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                >
                    {/* crumbs */}
                    <div className="board-layer board-layer--crumbs" aria-hidden="true">
                        <img src={crumbs} className="crumbs-overlay" alt="" />
                    </div>

                    {/* overlays */}
                    <div className="board-layer board-layer--overlays" aria-hidden="true">
                        <img src={breadDoodle} className="brand-doodle brand-doodle--bread" alt="" />
                        <img src={baguetteDoodle} className="brand-doodle brand-doodle--baguette" alt="" />
                        <div className="doodle doodle--scribble" />
                        <div className="boardTag boardTag--right">BAKED UNRUSHED</div>
                    </div>

                    {/* tiles */}
                    {BOARD.map((t) => (
                        <motion.figure
                            key={t.id}
                            className={t.className}
                            variants={item}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={hover}
                        >
                            <span className={`washi ${t.washi}`} aria-hidden="true" />
                            <img src={t.src} alt={t.alt} loading="lazy" />
                        </motion.figure>
                    ))}

                    {/* circle */}
                    <motion.div
                        className="circle-photo"
                        variants={item}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={hover}
                    >
                        <img src={circular} alt="Souraw specialty" loading="lazy" />
                    </motion.div>

                    {/* caption */}
                    <motion.div
                        className="boardText"
                        variants={item}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        made with time.
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}