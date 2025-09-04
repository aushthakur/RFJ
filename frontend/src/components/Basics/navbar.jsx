import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import logo from "../assets/img/logo.png"; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'Earrings', href: '#' },
    { name: 'Necklaces', href: '#' },
    { name: 'Festive Special', href: '#' },
    { name: 'Categories', href: '#', hasDropdown: true },
    { name: 'Customize', href: '#' },
    { name: 'Gifting', href: '#' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50 font-['Poppins']">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Layout */}
            <div className="md:hidden flex items-center justify-between w-full">
              {/* Logo - Left on Mobile */}
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-15 w-auto object-contain"
                />
              </div>

              {/* Right Side Icons for Mobile */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200">
                  <User className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </button>
                <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <button 
                  className="p-2 text-gray-600"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center w-full">
              {/* Search Bar - Left */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b border-gray-300 focus:border-amber-600 focus:outline-none focus:ring-0 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Logo - Center */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="flex items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-15 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Side Icons - Desktop */}
              <div className="flex-1 flex items-center justify-end space-x-6">
                {/* Currency Selector */}
                <div className="flex items-center">
                  <select className="text-sm text-gray-700 bg-transparent border-0 focus:outline-none cursor-pointer">
                    <option>India (INR ₹)</option>
                    <option>USA (USD $)</option>
                    <option>EUR (EUR €)</option>
                  </select>
                </div>

                {/* User Icons */}
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200">
                    <User className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative">
                    <Heart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center h-14 space-x-8">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                {link.hasDropdown ? (
                  <button
                    className="flex items-center text-gray-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="text-gray-700 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </a>
                )}
                
                {/* Dropdown for Categories */}
                {link.hasDropdown && isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-100 py-2 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600">Rings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600">Bracelets</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600">Anklets</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600">Pendants</a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-md focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Mobile Currency Selector */}
              <div className="mb-4">
                <select className="w-full p-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md focus:border-amber-600 focus:outline-none">
                  <option>India (INR ₹)</option>
                  <option>USA (USD $)</option>
                  <option>EUR (EUR €)</option>
                </select>
              </div>

              {/* Mobile Nav Links */}
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-left py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      >
                        {link.name}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isCategoriesOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          <a href="#" className="block py-1 text-sm text-gray-600 hover:text-amber-600">Rings</a>
                          <a href="#" className="block py-1 text-sm text-gray-600 hover:text-amber-600">Bracelets</a>
                          <a href="#" className="block py-1 text-sm text-gray-600 hover:text-amber-600">Anklets</a>
                          <a href="#" className="block py-1 text-sm text-gray-600 hover:text-amber-600">Pendants</a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;