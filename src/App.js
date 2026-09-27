import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import Catalog from './pages/Catalog/Catalog';
import Contact from './pages/Contact/Contact';
import Reviews from './pages/Reviews';
import Orders from './pages/Orders/Orders';
import './App.css';
import './styles/photo-banners.css';
import ScrollToTop from './components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import Prices from './pages/Prices/Prices';
import OrderSelection from './pages/Prices/OrderSelection';
import SourawFinds from './pages/SourawFinds/SourawFinds';
import ActivateStarter from "./pages/ActivateStarter/ActivateStarter";
import UnrushedLab from "./pages/UnrushedLab/UnrushedLab";
import DIY from "./pages/DIY/DIY";
import UntamedStudio from "./pages/UntamedStudio/UntamedStudio";
import UntamedStudioFinds from "./pages/UntamedStudioFinds/UntamedStudioFinds";
import Links from './pages/Links/Links';

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
        <Route path="/links" element={<Links />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/schedule" element={<Orders />} />
        <Route path="/orders" element={<OrderSelection />} />
        <Route path="/orders/sourdough" element={<Prices />} />
        <Route path="/orders/sweets" element={<Prices sweets />} />
        <Route path="/souraw-finds" element={<SourawFinds/>}/>
        <Route path="/activate-starter" element={<ActivateStarter />} />
        <Route path="/starter" element={<UnrushedLab />} />
        <Route path="/unrushed-lab" element={<Navigate to="/starter" replace />} />
        <Route path="/diy" element={<DIY />} />
        <Route path="/untamed-studio" element={<UntamedStudio />} />
        <Route path="/untamed-studio-finds" element={<UntamedStudioFinds />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
