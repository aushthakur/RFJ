import React, { useEffect, useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const TrendingProducts = () => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Fetch trending products
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/trending");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };
    fetchTrending();
  }, []);

  const toggleWishlist = (id, e) => {
    e.stopPropagation(); // Prevent click from navigating
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

  return (
    <section className="px-6 lg:px-16 py-12 relative max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-10">Trending Now</h2>

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

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)} // ✅ Navigate to product detail
            className="min-w-[270px] flex-shrink-0 group transform transition duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="relative w-[270px] h-[270px] overflow-hidden rounded-lg shadow-md">
              <img
                src={`http://localhost:5000${product.images?.[0]}`}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              {product.images?.[1] && (
                <img
                  src={`http://localhost:5000${product.images[1]}`}
                  alt={`${product.name} hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}

              <button
                onClick={(e) => toggleWishlist(product._id, e)} // ✅ Stop propagation
                className="absolute top-3 right-3 bg-white/80 rounded-full p-2 shadow-md"
              >
                <Heart
                  size={20}
                  className={`transition-colors ${
                    wishlist.includes(product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {product.name}
              </h3>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="line-through text-gray-400">
                  ₹ {product.regularPrice}
                </span>
                <span className="text-amber-700 font-bold">
                  ₹ {product.salePrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
