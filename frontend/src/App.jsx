import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import CollectionSection from "./components/collectionsection1";
import TrendingProducts from "./components/trendingproducts";
import Features from "./components/features";
import AboutSection from "./components/about";
import FeaturedCollection from "./components/FeaturedCollection";
import NewArrivals from "./components/NewArrivals";
import InstagramSection from "./components/InstagramSection";
import Footer from "./components/footer";


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
