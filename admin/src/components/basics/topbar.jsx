import React, { useState } from 'react';
import { Search, Bell, Menu, User, LogOut, X } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    console.log('Logging out...');
    setIsAdminDropdownOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on input when opening search
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    } else {
      // Clear search when closing
      setSearchQuery('');
    }
  };

  return (
    <div className="bg-white  border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Left Section - Menu Button */}
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Center/Spacer */}
      <div className="flex-1"></div>

      {/* Right Section - Search, Notifications and Admin */}
      <div className="flex items-center space-x-3">
        {/* Expandable Search */}
        <div className="relative">
          {/* Search Input - Expandable */}
          <div className={`
            absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out
            ${isSearchOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'}
            overflow-hidden
          `}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-10 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-sm backdrop-blur-sm"
              />
              <button
                onClick={handleSearchToggle}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* Search Toggle Button */}
          {!isSearchOpen && (
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search size={20} className="text-gray-600" />
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>

        {/* Admin Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              ADMIN
            </span>
          </button>

          {/* Dropdown Menu */}
          {isAdminDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;