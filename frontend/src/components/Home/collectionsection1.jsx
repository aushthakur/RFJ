import React from "react";
import img1 from "../assets/img/collectionsection1/bangles.png";
import img2 from "../assets/img/collectionsection1/necklace.png";
import img3 from "../assets/img/collectionsection1/nathni.png";
import img4 from "../assets/img/collectionsection1/mangtika.png";

const CollectionSection = () => {
  const collections = [
    { id: 1, title: "Bangles", img: img1 },
    { id: 2, title: "Necklace", img: img2 },
    { id: 3, title: "Nathni", img: img3 },
    { id: 4, title: "Mangtika", img: img4 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-16 py-12">
      {collections.map((item) => (
        <div
          key={item.id}
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
        >
          {/* Image */}
          <img
            src={item.img}
            alt={item.title}
            className="w-[417px] h-[450px] object-cover transform transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500"></div>

          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 text-center text-white font-['Bodoni_MT'] transition-all duration-500">
            <h3 className="text-2xl font-normal mb-3">{item.title}</h3>
            <span className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-lg tracking-wide">
              Shop Now →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionSection;
