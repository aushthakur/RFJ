import React from "react";
import Navbar from "./components/Basics/navbar";
import Hero from "./components/Home/hero";
import CollectionSection from "./components/Home/collectionsection1";
import TrendingProducts from "./components/Home/trendingproducts";
import Features from "./components/Home/features";
import AboutSection from "./components/Home/about";
import FeaturedCollection from "./components/Home/FeaturedCollection";
import NewArrivals from "./components/Home/NewArrivals";
import InstagramSection from "./components/Home/InstagramSection";
import Footer from "./components/Basics/footer";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <CollectionSection />
      <TrendingProducts />
      <Features />
      <AboutSection />
      <FeaturedCollection />
      <NewArrivals />
      <InstagramSection />
      <Footer />

     
    </div>
  );
};

export default App;
