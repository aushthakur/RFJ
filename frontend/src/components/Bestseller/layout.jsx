import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WishlistButton from '../../components/Wishlist/WishlistButton';

// Breadcrumb Component
const Breadcrumb = () => (
  <nav className="text-sm text-gray-600 mb-6">
    <span className="hover:text-yellow-500 cursor-pointer transition-colors">Home</span>
    <span className="mx-2">/</span>
    <span className="text-gray-800">Bestsellers</span>
  </nav>
);

// Filter Sidebar Component (Desktop)
const DesktopFilterSidebar = ({ 
  categories, 
  selectedCategories, 
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onApplyFilters
}) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);

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
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 rounded border-gray-300"
                style={{ accentColor: '#F59E0B' }}
              />
              <span className="text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>

        {categories.length > 4 && (
          <button 
            onClick={() => setShowMoreCategories(!showMoreCategories)}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <span className="text-lg">+</span>
            <span>{showMoreCategories ? 'Show less' : 'Show more'}</span>
          </button>
        )}

        <button 
          onClick={onApplyFilters}
          className="text-sm text-yellow-500 hover:text-yellow-600 mt-3"
        >
          Apply
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-800 mb-3">Price Range</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: '#F59E0B' }}
        />
        <div className="text-sm text-gray-600 mt-2">
          Up to ₹{priceRange[1]}
        </div>
        <button 
          onClick={onApplyFilters}
          className="text-sm text-yellow-500 hover:text-yellow-600 mt-3"
        >
          Apply
        </button>
      </div>

      {/* Sort By Filter */}
      <div>
        <h3 className="text-sm font-normal text-gray-800 mb-3">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'newest', label: 'Newest First' },
            { value: 'price-low-high', label: 'Price: Low to High' },
            { value: 'price-high-low', label: 'Price: High to Low' },
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
        <button 
          onClick={onApplyFilters}
          className="text-sm text-yellow-500 hover:text-yellow-600 mt-3"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// Mobile Filter Sidebar
const MobileFilterSidebar = ({ 
  isOpen, 
  onClose,
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onApplyFilters
}) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const handleApplyAndClose = () => {
    onApplyFilters();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-screen w-72 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        overflow-y-auto
      `}
      >
        <div className="p-6">
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
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-gray-300"
                    style={{ accentColor: '#F59E0B' }}
                  />
                  <span className="text-sm text-gray-600">{category}</span>
                </label>
              ))}
            </div>

            {categories.length > 4 && (
              <button 
                onClick={() => setShowMoreCategories(!showMoreCategories)}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <span className="text-lg">+</span>
                <span>{showMoreCategories ? 'Show less' : 'Show more'}</span>
              </button>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-800 mb-3">Price Range</h3>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#F59E0B' }}
            />
            <div className="text-sm text-gray-600 mt-2">
              Up to ₹{priceRange[1]}
            </div>
          </div>

          {/* Sort By Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-normal text-gray-800 mb-3">Sort By</h3>
            <div className="space-y-2">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'price-low-high', label: 'Price: Low to High' },
                { value: 'price-high-low', label: 'Price: High to Low' },
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
          </div>

          <button
            onClick={handleApplyAndClose}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    return image.startsWith("http") ? image : `http://localhost:5000${image}`;
  };

  const discount = product.regularPrice && product.salePrice 
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-200">
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
            -{discount}%
          </div>
        )}
          <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>
        
        <img 
          src={getImageUrl(product.images?.[0])}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-gray-800 font-normal text-sm mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            {product.regularPrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.regularPrice.toLocaleString()}
              </span>
            )}
            <span className="text-gray-900 font-semibold text-base">
              ₹{product.salePrice?.toLocaleString() || product.regularPrice?.toLocaleString()}
            </span>
          </div>
        </div>

        <button 
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-800 transition-colors duration-200"
          aria-label="Product info"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product._id}`);
          }}
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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('newest');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/filter/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add filters
      if (selectedCategories.length > 0) {
        params.append('category', selectedCategories.join(','));
      }
      params.append('minPrice', priceRange[0]);
      params.append('maxPrice', priceRange[1]);
      params.append('sort', sortBy);
      params.append('bestSeller', 'true'); // Only bestsellers
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const res = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy]); // Auto-fetch when sort changes

  const handleApplyFilters = () => {
    fetchProducts();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <DesktopFilterSidebar 
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-normal text-gray-900">Bestsellers Collection</h1>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                  >
                    <Filter size={16} />
                    Filters
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Search size={16} className="text-white" />
                </button>
              </form>

              {/* Results Count */}
              <p className="text-sm text-gray-600">
                Showing {products.length} item(s)
              </p>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64">
                <p className="text-gray-600 mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 50000]);
                    setSearchQuery('');
                    fetchProducts();
                  }}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default Layout;