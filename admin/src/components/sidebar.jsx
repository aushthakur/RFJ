import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  ChevronDown, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'DASHBOARD',
      active: true,
      hasSubmenu: false
    },
    {
      icon: Package,
      label: 'ALL PRODUCTS',
      active: false,
      hasSubmenu: false
    },
    {
      icon: ClipboardList,
      label: 'ORDER LIST',
      active: false,
      hasSubmenu: false
    },
    {
      label: 'Categories',
      active: false,
      hasSubmenu: true,
      isOpen: categoriesOpen,
      onClick: () => setCategoriesOpen(!categoriesOpen)
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm"><img src={logo} alt="Logo" className="w-9 h-10 " /></span>
            </div>
          </div>
          <button 
            className="lg:hidden p-1"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <div 
                className={`
                  flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors
                  ${item.active 
                    ? 'bg-orange-400 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                onClick={item.onClick}
              >
                <div className="flex items-center space-x-3">
                  {item.icon && (
                    <item.icon 
                      size={18} 
                      className={item.active ? 'text-white' : 'text-gray-600'} 
                    />
                  )}
                  <span className="font-medium text-sm">
                    {item.label}
                  </span>
                </div>
                {item.hasSubmenu && (
                  <div className="transition-transform duration-200">
                    {item.isOpen ? (
                      <ChevronDown size={16} className={item.active ? 'text-white' : 'text-gray-600'} />
                    ) : (
                      <ChevronRight size={16} className={item.active ? 'text-white' : 'text-gray-600'} />
                    )}
                  </div>
                )}
              </div>
              
              {/* Submenu for Categories */}
              {item.hasSubmenu && item.isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                    Electronics
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                    Clothing
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                    Books
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;