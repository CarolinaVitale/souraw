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
import SourawFinds from './pages/SourawFinds/SourawFinds';
import ActivateStarter from "./pages/ActivateStarter/ActivateStarter";
import UnrushedLab from "./pages/UnrushedLab/UnrushedLab";
import DIY from "./pages/DIY/DIY";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

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
        <Route path="/menu" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/schedule" element={<Orders />} />
        <Route path="/orders" element={<Prices />} />
        <Route path="/souraw-finds" element={<SourawFinds/>}/>
        <Route path="/activate-starter" element={<ActivateStarter />} />
        <Route path="/unrushed-lab" element={<UnrushedLab />} />
        <Route path="/diy" element={<DIY />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;