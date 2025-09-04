import React from "react";
import weddingImg from "../assets/FeaturedCollection/wedding.png";
import ethnicImg from "../assets/FeaturedCollection/ethnic.png";   
import diwaliImg from "../assets/FeaturedCollection/diwali.png";   

const collections = [
  {
    title: "Wedding",
    img: weddingImg,
  },
  {
    title: "Diwali Special",
    img: diwaliImg,
  },
  {
    title: "Ethnic Special",
    img: ethnicImg,
  },
  
];

const FeaturedCollection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        Featured Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-md"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[420px] object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />

            {/* Overlay with animation */}
            <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

            {/* Title animation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <p className="text-white text-lg md:text-xl font-medium flex items-center gap-2">
                {item.title} <span className="text-2xl">→</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;
