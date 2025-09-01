import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import CollectionSection from "./components/collectionsection1";
import TrendingProducts from "./components/trendingproducts";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <CollectionSection />
      <TrendingProducts />

     
    </div>
  );
};

export default App;
