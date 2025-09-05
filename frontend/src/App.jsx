import React from "react";
import Navbar from "./components/Basics/navbar";
import Footer from "./components/Basics/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landingpage";
import Bestseller from "./components/pages/bestseller";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
  <Route path="/bestseller" element={<Bestseller />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
