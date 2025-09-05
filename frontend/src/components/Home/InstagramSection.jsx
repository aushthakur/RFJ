import React from "react";
import insta1 from "../../assets/img/insta1.jpeg";
import insta2 from "../../assets/img/insta1.jpeg";
import insta3 from "../../assets/img/insta1.jpeg";
import insta4 from "../../assets/img/insta1.jpeg";
import insta5 from "../../assets/img/insta1.jpeg";
import insta6 from "../../assets/img/insta1.jpeg";

const InstagramSection = () => {
  const posts = [
    { img: insta1, link: "https://www.instagram.com/pc_jeweller/p/DN0bL705Ddk/?hl=en" },
    { img: insta2, link: "https://www.instagram.com/pc_jeweller/p/DNnetUgyJeu/?hl=en" },
    { img: insta3, link: "https://www.instagram.com/pc_jeweller/reel/DNsqYmCZCJX/?hl=en" },
    { img: insta4, link: "https://www.instagram.com/pc_jeweller/p/DN3Pf405Cfj/?hl=en" },
   
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-16 py-12 text-center">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        Follow Us On Instagram
      </h2>

      {/* Instagram Posts */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {posts.map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-56 h-56 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={post.img}
              alt={`Instagram post ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </a>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Customized Jewellery for Your Custom needs!
        </h3>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="px-6 py-3 border border-gray-900 rounded-md font-medium hover:bg-gray-100 transition">
            Explore Designs
          </button>
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-md font-medium hover:bg-yellow-600 transition">
            Talk to Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
