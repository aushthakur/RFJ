import React from "react";
import braceletImg from "../assets/img/bracelet.png"; // <-- replace with your image path

const AboutSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src={braceletImg}
            alt="Bracelet"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-gray-700 mb-3">Lorem Ispum</p>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
            Industry.
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
            Industry. Lorem Ipsum Has Been The Industry&apos;s Standard Dummy
            Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of
            Type And Scrambled It To Make A Type Specimen Book. It Has Survived
            Not Only Five Centuries, But Also The Leap Into Electronic
            Typesetting, Remaining Essentially Unchanged. It Was Popularised In
            The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum
            Passages, And More Recently With Desktop Publishing Software Like
            Aldus PageMaker Including Versions Of Lorem Ipsum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
