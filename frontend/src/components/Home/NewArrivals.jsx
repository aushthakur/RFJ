import React from "react";
import initialImg from "../../assets/initial.png"; // large horizontal image
import bandhanImg from "../../assets/bandhan.png";
import mangalsutraImg from "../../assets/mangalsutra.png";
import expressoImg from "../../assets/expresso.png";
import piqueImg from "../../assets/pique.png";

const NewArrivals = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">New Arrivals</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
          Industry. Lorem Ipsum Has Been The Industry&apos;s Standard Dummy Text
          Ever Since The 1500s,
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Horizontal Image */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-md">
          <img
            src={initialImg}
            alt="Initials Collection"
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Right Grid (4 square images in 2x2) */}
        <div className="grid grid-cols-2 gap-6">
          {[bandhanImg, mangalsutraImg, expressoImg, piqueImg].map(
            (img, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden shadow-md"
              >
                <img
                  src={img}
                  alt={`Collection ${idx + 1}`}
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
