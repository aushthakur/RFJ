import React from "react";
import Navbar from "./components/Basics/navbar";
import Footer from "./components/Basics/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landingpage";
import Bestseller from "./components/pages/bestseller";
import EarringsPage from './components/pages/earrings';
import NecklacesPage from './components/pages/necklaces';
import Festival from './components/pages/festival';
import Customized from './components/pages/customize';
import Gifting from "./components/pages/gifting";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
  <Route path="/bestseller" element={<Bestseller />} />
         <Route path="/earrings" element={<EarringsPage />} />
     
         <Route path="/necklaces" element={<NecklacesPage/>} />
         <Route path="/festival" element={<Festival/>} />
         <Route path="/customize" element={<Customized/>} />
            <Route path="/gifting" element={<Gifting/>} />
        


          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
