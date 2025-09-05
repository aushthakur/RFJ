import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Filter,
  X,
  Star,
  Heart,
  Eye,
} from "lucide-react";

// Breadcrumb
const Breadcrumb = () => (
  <nav className="text-sm text-gray-600 mb-4">
    <span className="hover:text-yellow-500 cursor-pointer transition-colors">
      Home
    </span>
    <span className="mx-2">/</span>
    <span className="text-yellow-500 font-medium">Bestsellers</span>
  </nav>
);

// Filter Sidebar
const FilterSidebar = ({ isOpen, onClose }) => {
  const [openFilters, setOpenFilters] = useState({
    category: true,
    availability: true,
    price: true,
    brand: false,
  });

  const toggleFilter = (filterName) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const categories = [
    { name: "Necklaces", count: 45 },
    { name: "Rings", count: 32 },
    { name: "Earrings", count: 28 },
    { name: "Bracelets", count: 19 },
  ];

  const availability = [
    { name: "In Stock", count: 89 },
    { name: "Out of Stock", count: 5 },
  ];

  const brands = [
    "Tanishq",
    "Kalyan Jewellers",
    "PC Jeweller",
    "Senco Gold",
    "Joyalukkas",
  ];

  return (
    <>
      {/* Overlay on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed h-screen sticky lg:static top-0 left-0 h-screen lg:h-auto w-72 lg:w-72 bg-transparent shadow-md lg:shadow-none z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-6 lg:p-0 ">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <Breadcrumb />

          <h2 className="text-lg font-semibold text-gray-800 mb-4">Refine By</h2>

          {/* Category */}
          <div className="mb-6">
            <button
              onClick={() => toggleFilter("category")}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-700">Category</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openFilters.category ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFilters.category && (
              <div className="pt-2 space-y-2">
                {categories.map((c) => (
                  <label
                    key={c.name}
                    className="flex items-center justify-between text-gray-600 hover:text-yellow-500 cursor-pointer"
                  >
                    <span>{c.name}</span>
                    <span className="text-sm text-gray-400">({c.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            <button
              onClick={() => toggleFilter("availability")}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-700">Availability</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openFilters.availability ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFilters.availability && (
              <div className="pt-2 space-y-2">
                {availability.map((a) => (
                  <label
                    key={a.name}
                    className="flex items-center justify-between text-gray-600 hover:text-yellow-500 cursor-pointer"
                  >
                    <span>{a.name}</span>
                    <span className="text-sm text-gray-400">({a.count})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <button
              onClick={() => toggleFilter("price")}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-700">Price</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openFilters.price ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFilters.price && (
              <div className="pt-2">
                <input type="range" min="0" max="50000" className="w-full" />
              </div>
            )}
          </div>

          {/* Brand */}
          <div>
            <button
              onClick={() => toggleFilter("brand")}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <span className="font-medium text-gray-700">Brand</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openFilters.brand ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFilters.brand && (
              <div className="pt-2 space-y-2">
                {brands.map((b) => (
                  <label
                    key={b}
                    className="block text-gray-600 hover:text-yellow-500 cursor-pointer"
                  >
                    {b}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

// Product Card
const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative">
      {product.discount > 0 && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
          -{product.discount}%
        </span>
      )}

      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 p-1 rounded-full bg-white shadow"
      >
        <Heart
          size={18}
          className={isWishlisted ? "text-yellow-500 fill-current" : "text-gray-500"}
        />
      </button>

      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      <h3 className="font-medium text-gray-800 text-base mb-1">
        {product.name}
      </h3>

      <div className="flex items-center text-sm text-gray-500 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
        <span className="ml-2">({product.reviews})</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-yellow-500">
            ₹{product.salePrice.toLocaleString()}
          </span>
          {product.originalPrice > product.salePrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button className="bg-yellow-500 hover:bg-orange-600 text-white p-2 rounded-full">
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

// Layout (Main Bestseller Page)
const Layout = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Gold Necklace ${i + 1}`,
    image: "https://via.placeholder.com/400",
    originalPrice: 20000,
    salePrice: 15000,
    discount: 20,
    rating: 4,
    reviews: 120,
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-34">
      {/* 👆 Padding to push below navbar */}
      <div className="max-w-7xl mx-auto px-4 flex gap-8">
        {/* Sidebar (desktop only) */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <FilterSidebar isOpen />
        </div>

        {/* Main */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">
              Our Collection Of Products
            </h1>

            <div className="flex items-center gap-4">
              {/* Mobile filter button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-orange-600"
              >
                <Filter size={18} />
                Filters
              </button>
              <select className="px-3 py-2 border rounded-lg text-sm">
                <option>Price - Low to High</option>
                <option>Price - High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 mb-20 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {isFilterOpen && (
        <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
