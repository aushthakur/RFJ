import React, { useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

// product images
import img1a from "../../assets/img/products/prod1a.png";
import img1b from "../../assets/img/products/prod1b.png";
import img2a from "../../assets/img/products/prod2a.png";
import img2b from "../../assets/img/products/prod2b.png";
import img3a from "../../assets/img/products/prod3a.png";
import img3b from "../../assets/img/products/prod3b.png";
import img4a from "../../assets/img/products/prod4a.png";
import img4b from "../../assets/img/products/prod4b.png";

const TrendingProducts = () => {
  const [wishlist, setWishlist] = useState([]);
  const scrollRef = useRef(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  const products = [
    { id: 1, title: "Heart Bracelet", oldPrice: 2990, newPrice: 1990, img: img1a, hoverImg: img1b },
    { id: 2, title: "Wedding Necklace", oldPrice: 2990, newPrice: 1990, img: img2a, hoverImg: img2b },
    { id: 3, title: "Nathni with Stone", oldPrice: 2990, newPrice: 1990, img: img3a, hoverImg: img3b },
    { id: 4, title: "Diamond Ring", oldPrice: 2990, newPrice: 1990, img: img4a, hoverImg: img4b },
    { id: 5, title: "Gold Bangles", oldPrice: 4990, newPrice: 3490, img: img1a, hoverImg: img1b },
    { id: 6, title: "Silver Earrings", oldPrice: 3990, newPrice: 2490, img: img2a, hoverImg: img2b },
    { id: 7, title: "Pearl Necklace", oldPrice: 5990, newPrice: 3990, img: img3a, hoverImg: img3b },
    { id: 8, title: "Emerald Ring", oldPrice: 6990, newPrice: 4990, img: img4a, hoverImg: img4b },
  ];

  return (
    <section className="px-6 lg:px-16 py-12 relative max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Trending Now
      </h2>

      {/* Scroll buttons (kept inside section, no overflow) */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[270px] flex-shrink-0 group transform transition duration-300 hover:-translate-y-2"
          >
            <div className="relative w-[270px] h-[270px] overflow-hidden rounded-lg shadow-md">
              {/* Default Image */}
              <img
                src={product.img}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />

              {/* Hover Image */}
              <img
                src={product.hoverImg}
                alt={`${product.title} alt`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md"
              >
                <Heart
                  size={20}
                  className={`transition-colors ${
                    wishlist.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-4 text-center">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {product.title}
              </h3>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="line-through text-gray-400">
                  ₹ {product.oldPrice}
                </span>
                <span className="text-amber-700 font-bold">
                  ₹ {product.newPrice}
                </span>
                <span className="text-xs text-gray-500">50% OFF</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
