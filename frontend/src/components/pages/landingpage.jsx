import React from "react";
import Hero from "../Home/hero";
import CollectionSection from "../Home/collectionsection1";
import TrendingProducts from "../Home/trendingproducts";
import Features from "../Home/features";
import AboutSection from "../Home/about";
import FeaturedCollection from "../Home/FeaturedCollection";
import NewArrivals from "../Home/NewArrivals";
import InstagramSection from "../Home/InstagramSection";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <CollectionSection />
      <TrendingProducts />
      <Features />
      <AboutSection />
      <FeaturedCollection />
      <NewArrivals />
      <InstagramSection />
    </>
  );
};

export default LandingPage;
