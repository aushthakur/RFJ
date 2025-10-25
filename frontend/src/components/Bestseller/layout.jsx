import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

// Breadcrumb Component
const Breadcrumb = () => (
  <nav className="text-sm text-gray-600 mb-6">
    <span className="hover:text-yellow-500 cursor-pointer transition-colors">Home</span>
    <span className="mx-2">/</span>
    <span className="text-gray-800">Bestsellers</span>
  </nav>
);

// Filter Sidebar Component (Desktop - Simplified)
const DesktopFilterSidebar = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Traditional']);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('best-reviewed');
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const categories = [
    { name: 'Traditional', checked: true },
    { name: 'Contemporary', checked: false },
    { name: 'Bridal', checked: false },
    { name: 'Daily Wear', checked: false },
    { name: 'Statement Pieces', checked: false },
    { name: 'Vintage Collection', checked: false }
  ];

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <div>
      <Breadcrumb />
      
      <h2 className="text-lg font-normal text-gray-800 mb-6">Refine By -</h2>

      {/* Category Filter */}
      <div className="mb-8">
        <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-900 text-white rounded-full text-sm mb-4">
          <span>Category</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="space-y-3 mb-3">
          {categories.slice(0, showMoreCategories ? categories.length : 4).map((category) => (
            <label key={category.name} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => toggleCategory(category.name)}
                className="w-4 h-4 rounded border-gray-300"
                style={{ accentColor: '#F59E0B' }}
              />
              <span className="text-sm text-gray-600">{category.name}</span>
            </label>
          ))}
        </div>

        <button 
          onClick={() => setShowMoreCategories(!showMoreCategories)}
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
        >
          <span className="text-lg">+</span>
          <span>{showMoreCategories ? 'Show less' : 'Mostrar mais'}</span>
        </button>

        <button className="text-sm text-yellow-500 hover:text-yellow-600 mt-3">
          Apply
        </button>
      </div>

      {/* Availability Filter */}
      <div className="mb-8">
        <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-900 text-white rounded-full text-sm mb-4">
          <span>Availability</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>R$ {priceRange[0]}</span>
          <span>R$ {priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: '#F59E0B' }}
        />
        <div className="text-sm text-gray-600 mt-2">
          Até R$ {priceRange[1]}
        </div>
        <button className="text-sm text-yellow-500 hover:text-yellow-600 mt-3">
          Apply
        </button>
      </div>

      {/* Sort By Filter */}
      <div>
        <h3 className="text-sm font-normal text-gray-800 mb-3">Ordenar por</h3>
        <div className="space-y-2">
          {[
            { value: 'best-reviewed', label: 'Bem avaliadas primeiro' },
            { value: 'recently-reviewed', label: 'Bem avaliadas por último' },
            { value: 'rating-4+', label: 'Mais de 4 estrelas' },
            { value: 'rating-3+', label: 'Mais de 3 estrelas' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-4 h-4"
                style={{ accentColor: '#F59E0B' }}
              />
              <span className="text-sm text-gray-600">{option.label}</span>
            </label>
          ))}
        </div>
        <button className="text-sm text-yellow-500 hover:text-yellow-600 mt-3">
          Aplicar
        </button>
      </div>
    </div>
  );
};

// Mobile Filter Sidebar
const MobileFilterSidebar = ({ isOpen, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState(['Traditional']);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('best-reviewed');
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const categories = [
    { name: 'Traditional', checked: true },
    { name: 'Contemporary', checked: false },
    { name: 'Bridal', checked: false },
    { name: 'Daily Wear', checked: false },
    { name: 'Statement Pieces', checked: false },
    { name: 'Vintage Collection', checked: false }
  ];

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        overflow-y-auto
      `}
      >
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <Breadcrumb />

          <h2 className="text-lg font-normal text-gray-800 mb-6">Refine By -</h2>

          {/* Category Filter */}
          <div className="mb-8">
            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-900 text-white rounded-full text-sm mb-4">
              <span>Category</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="space-y-3 mb-3">
              {categories.slice(0, showMoreCategories ? categories.length : 4).map((category) => (
                <label key={category.name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="w-4 h-4 rounded border-gray-300"
                    style={{ accentColor: '#F59E0B' }}
                  />
                  <span className="text-sm text-gray-600">{category.name}</span>
                </label>
              ))}
            </div>

            <button 
              onClick={() => setShowMoreCategories(!showMoreCategories)}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <span className="text-lg">+</span>
              <span>{showMoreCategories ? 'Show less' : 'Mostrar mais'}</span>
            </button>

            <button className="text-sm text-yellow-500 hover:text-yellow-600 mt-3">
              Apply
            </button>
          </div>

          {/* Availability Filter */}
          <div className="mb-8">
            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-900 text-white rounded-full text-sm mb-4">
              <span>Availability</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#F59E0B' }}
            />
            <div className="text-sm text-gray-600 mt-2">
              Até R$ {priceRange[1]}
            </div>
            <button className="text-sm text-yellow-500 hover:text-yellow-600 mt-3">
              Apply
            </button>
          </div>

          {/* Sort By Filter */}
          <div>
            <h3 className="text-sm font-normal text-gray-800 mb-3">Ordenar por</h3>
            <div className="space-y-2">
              {[
                { value: 'best-reviewed', label: 'Bem avaliadas primeiro' },
                { value: 'recently-reviewed', label: 'Bem avaliadas por último' },
                { value: 'rating-4+', label: 'Mais de 4 estrelas' },
                { value: 'rating-3+', label: 'Mais de 3 estrelas' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#F59E0B' }}
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
            <button className="text-sm text-yellow-500 hover:text-yellow-600 mt-3">
              Aplicar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-200">
        <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
          -{product.discount}%
        </div>
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-gray-800 font-normal text-sm mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-gray-900 font-semibold text-base">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Info Button */}
        <button 
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-800 transition-colors duration-200"
          aria-label="Product info"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 11.5v-3M8 5.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Main Bestsellers Page
const Layout = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const bestsellerProducts = [
    {
      id: 1,
      name: 'Heritage Gold Necklace Set',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Diamond Pendant Earrings',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Ruby & Gold Bracelet',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Emerald Statement Ring',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Pearl Choker Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Sapphire Drop Earrings',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Traditional Gold Bangles',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Vintage Diamond Ring',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
    },
    {
      id: 9,
      name: 'Kundan Pendant Set',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'
    },
    {
      id: 10,
      name: 'Gold Layered Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
    },
    {
      id: 11,
      name: 'Crystal Chandelier Earrings',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    },
    {
      id: 12,
      name: 'Polki Bridal Set',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen mt-30 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <DesktopFilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Search and Sort */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-normal text-gray-900">Our Collection Of Products</h1>
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                  >
                    <Filter size={16} />
                    Filters
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors">
                    Price Low - High
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search An Item"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Search size={16} className="text-white" />
                </button>
              </div>

              {/* Results Count */}
              <p className="text-sm text-gray-600">
                Showing 1-12 of 24 item(s)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestsellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  );
};

export default Layout;