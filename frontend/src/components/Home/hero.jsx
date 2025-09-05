import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/img/logo.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/carousel").then((res) => {
      setHeroImages(res.data);
    });
  }, []);

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  const goToSlide = (index) => setCurrentSlide(index);

  if (heroImages.length === 0) return null; // no images yet

  return (
    <div className="relative w-full h-[777px] overflow-hidden font-['Poppins']">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`http://localhost:5000${image.imageUrl}`}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
          </div>
        ))}
      </div>

      {/* Keep your overlay / logo / CTA as it is */}
      {/* ... (your existing overlay code) ... */}

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
