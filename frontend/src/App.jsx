import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import CollectionSection from "./components/collectionsection1";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <CollectionSection />

     
    </div>
  );
};

export default App;
