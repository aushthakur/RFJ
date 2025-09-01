import React, { useState, useEffect } from 'react';
import logo from "../assets/img/logo.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample hero images - replace with your actual images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=777&fit=crop&crop=center",
      alt: "Luxury Jewelry Collection 1"
    },
    {
      url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1920&h=777&fit=crop&crop=center",
      alt: "Luxury Jewelry Collection 2"
    },
    {
      url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&h=777&fit=crop&crop=center",
      alt: "Luxury Jewelry Collection 3"
    },
    {
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&h=777&fit=crop&crop=center",
      alt: "Luxury Jewelry Collection 4"
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[777px] overflow-hidden font-['Poppins']">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-6 ">
            <img
              src={logo}
              alt="Rituals Fine Jewellery Logo"
              className="h-50 w-auto object-contain mb-4"
            />
          </div>

          {/* Brand Name */}
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-light mb-8 tracking-wider">
            RITUALS FINE JEWELLERY
          </h1>

          {/* CTA Button with Diagonal Shine Animation */}
          <button className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl group">
            <span className="relative z-10">Explore Our Latest Collection</span>
            
            {/* Diagonal Shine Animation */}
            <div className="absolute inset-0 -top-2 -bottom-2 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out animate-shine"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => goToSlide((currentSlide + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom CSS for Continuous Shine Animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: skewX(-12deg) translateX(-100%);
          }
          100% {
            transform: skewX(-12deg) translateX(200%);
          }
        }
        
        .animate-shine {
          animation: shine 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;