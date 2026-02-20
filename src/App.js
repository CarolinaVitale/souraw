import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import Catalog from './pages/Catalog/Catalog';
import Contact from './pages/Contact/Contact';
import Reviews from './pages/Reviews';
import Orders from './pages/Orders/Orders';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import Prices from './pages/Prices/Prices';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // 👇 Inicia sesión anónima apenas arranca la app
    signInAnonymously(auth).catch((error) => {
      console.error("Error al iniciar sesión anónima:", error);
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/prices" element={<Prices />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;