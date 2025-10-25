import React, { useState } from 'react';

const NecklacesSection = () => {
  const products = [
    {
      id: 1,
      name: 'Pearl Statement Necklace',
      price: 200.00,
      originalPrice: 230.00,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Golden Chain Necklace',
      price: 200.00,
      originalPrice: 230.00,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Gemstone Pendant Necklace',
      price: 200.00,
      originalPrice: 230.00,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Layered Gold Necklace',
      price: 200.00,
      originalPrice: 230.00,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-normal text-gray-800 mb-12">Necklaces for you</h1>
      
      {/* Main Content Section - Image Left, Text Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Side - Image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop"
            alt="Featured Necklaces"
            className="w-full h-full rounded-3xl object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>
        
        {/* Right Side - Text Content (Exact right of image) */}
        <div className="flex flex-col justify-start">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Timeless Elegance in Every Piece
          </h2>
          
          <div className="space-y-4 text-gray-700 text-base leading-relaxed">
            <p>
              Explore our stunning collection of handcrafted necklaces, each meticulously designed from premium 925 sterling silver and brass, finished with a luxurious 3 to 5-micron coating of 18-karat gold. Every piece in our fine jewellery collection embodies the perfect fusion of traditional artisanship and modern elegance, created by master silversmiths who preserve time-honored techniques while embracing contemporary aesthetics.
            </p>
            
            <p>
              Our necklaces showcase carefully curated natural gemstones and precious materials, with each stone selected for its unique brilliance and character. From delicate pendant designs to bold statement pieces, every necklace is crafted to enhance your natural beauty and complement your personal style. Whether you're celebrating a special moment or adding to your everyday collection, our pieces offer enduring sophistication that stands the test of time.
            </p>
            <p>
              Each design is carefully conceived to transition seamlessly from casual daywear to elegant evening occasions, making them treasured pieces that can be cherished for generations. Our skilled artisans devote meticulous attention to every detail—from the intricacy of the chain links to the perfection of the clasp—ensuring that each necklace is both exceptionally beautiful and built to last. 
            </p>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-3xl bg-gray-100">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-gray-800 font-normal text-base mb-2">
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
              
              {/* Add to Cart Button - Simple circle with plus */}
              <button 
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 group"
                aria-label="Add to cart"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  className="text-gray-800 group-hover:text-white"
                >
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4.5v7M4.5 8h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductCatalog = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Churrasqueira']);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('best-reviewed');
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const catalogProducts = [
    {
      id: 1,
      name: 'Statement Pearl Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Gold Chain Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Diamond Pendant Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Layered Gold Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Emerald Pendant Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Ruby Stone Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Sapphire Drop Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Crystal Pendant Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'
    },
    {
      id: 9,
      name: 'Vintage Gold Necklace',
      price: 200.00,
      originalPrice: 230.00,
      discount: 13,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
    }
  ];

  const categories = [
    { name: 'Churrasqueira', checked: true },
    { name: 'Piscina', checked: false },
    { name: 'Varanda', checked: false },
    { name: 'Quintal', checked: false },
    { name: 'Garden', checked: false },
    { name: 'Outdoor', checked: false }
  ];

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex gap-8">
        {/* Left Sidebar - Filters */}
        <div className="w-64 flex-shrink-0">
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

        {/* Right Side - Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogProducts.map((product) => (
              <div key={product.id} className="group">
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
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-normal text-gray-900 mb-8">
          Customized Jewellery for Your Custom needs!
        </h2>
        <div className="flex items-center justify-center gap-4">
          <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 font-medium">
            EXPLORE DESIGNS
          </button>
          <button className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium">
            TALK TO US
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component that combines both sections
const NecklacesPage = () => {
  return (
    <div className="bg-white">
      <NecklacesSection />
      <ProductCatalog />
    </div>
  );
};

export default NecklacesPage;