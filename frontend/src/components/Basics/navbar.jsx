import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import logo from "../../assets/img/logo.png";
import AuthModal from "../AuthModal";
import UserMenu from "../pages/UserMenu";
import ChangePasswordModal from "../pages/ChangePasswordModal";
import { AuthContext } from "../../context/AuthContext";
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext'; // Add this
import WishlistSidebar from '../Wishlist/WishlistSidebar';
import CartSidebar from '../cart/CartSidebar'; // Add this
import OrdersSidebar from '../Order/OrdersSidebar'; // Add this

const Navbar = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Add this
    const [isOrdersOpen, setIsOrdersOpen] = useState(false); // Add this

  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart(); // Add this
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const userButtonMobileRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user?.token;

  // ✅ Detect click outside of user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target) &&
        (!userButtonMobileRef.current ||
          !userButtonMobileRef.current.contains(event.target))
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle user icon click
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      setIsAuthOpen(true);
    }
  };

  // ✅ Logout logic
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // ✅ Change password modal open
  const handleChangePassword = () => {
    setIsUserMenuOpen(false);
    setIsChangePasswordOpen(true);
  };
  const handleMyOrders = () => {
    setIsUserMenuOpen(false);
    setIsOrdersOpen(true);
  };

  // ✅ Search bar logic
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/search?query=${query}`
      );
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const navLinks = [
    { name: "Home", href: "." },
    { name: "Best Sellers", href: "/bestseller" },
    { name: "Earrings", href: "/earrings" },
    { name: "Necklaces", href: "/necklaces" },
    { name: "Festive Special", href: "/festival" },
    { name: "Categories", href: "#", hasDropdown: true },
    { name: "Customize", href: "/customize" },
    { name: "Gifting", href: "/gifting" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50 font-['Poppins']">
      {/* Top Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Layout */}
            <div className="md:hidden flex items-center justify-between w-full">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-15 w-auto object-contain" />
              </div>

              <div className="flex items-center space-x-4">
                {/* User Icon */}
                <div className="relative">
                  <button
                    ref={userButtonMobileRef}
                    className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative"
                    onClick={handleUserIconClick}
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {isUserMenuOpen && isLoggedIn && (
                    <div ref={userMenuRef}>
                      <UserMenu
                        username="User"
                        onLogout={handleLogout}
                        onChangePassword={handleChangePassword}
                        onMyOrders={handleMyOrders}

                      />
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <button 
                  onClick={() => setIsWishlistOpen(true)}
                  className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  className="p-2 text-gray-600"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center w-full">
              {/* Search Bar */}
              <div className="flex-1 max-w-md relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-transparent border-0 border-b border-gray-300 focus:border-amber-600 focus:outline-none focus:ring-0 transition-colors duration-300"
                  />

                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                      {searchResults.map((p) => (
                        <div
                          key={p._id}
                          onClick={() =>
                            (window.location.href = `/product/${p._id}`)
                          }
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                        >
                          <img
                            src={
                              p.images && p.images.length > 0
                                ? `http://localhost:5000${p.images[0]}`
                                : "/placeholder.png"
                            }
                            alt={p.name}
                            className="h-10 w-10 object-cover rounded-md mr-3"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {p.name}
                            </span>
                            <span className="text-gray-600">
                              ₹
                              {p.salePrice
                                ? p.salePrice.toLocaleString()
                                : p.regularPrice
                                ? p.regularPrice.toLocaleString()
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="flex items-center">
                  <img src={logo} alt="Logo" className="h-15 w-auto object-contain" />
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1 flex items-center justify-end space-x-6">
                <div className="flex items-center">
                  <select className="text-sm text-gray-700 bg-transparent border-0 focus:outline-none cursor-pointer">
                    <option>India (INR ₹)</option>
                    <option>USA (USD $)</option>
                    <option>EUR (EUR €)</option>
                  </select>
                </div>

                {/* User Icon */}
                <div className="relative">
                  <button
                    ref={userButtonRef}
                    className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200"
                    onClick={handleUserIconClick}
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {isUserMenuOpen && isLoggedIn && (
                    <div ref={userMenuRef}>
                      <UserMenu
                        username="User"
                        onLogout={handleLogout}
                        onChangePassword={handleChangePassword}
                        onMyOrders={handleMyOrders}
                      />
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <button 
                  onClick={() => setIsWishlistOpen(true)}
                  className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-200 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </div>

      {/* Modals & Sidebars */}
      {isAuthOpen && !isLoggedIn && (
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      )}

      {isChangePasswordOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      )}

      <WishlistSidebar 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <OrdersSidebar 
        isOpen={isOrdersOpen} 
        onClose={() => setIsOrdersOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;