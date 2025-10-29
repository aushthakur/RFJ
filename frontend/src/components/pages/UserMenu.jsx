import React from "react";
import { LogOut, ChevronRight } from "lucide-react";

const UserMenu = ({ username = "Admin", onLogout, onChangePassword, onMyOrders }) => {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl border border-gray-200 z-50">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">{username}</h3>
      </div>
      <div className="p-2">
        {/* Change Password */}
        <button 
          onClick={onChangePassword}
          className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <span>Change Password</span>
          <ChevronRight className="w-4 h-4" />
        </button>
         <button 
          onClick={onMyOrders}
          className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <span>My Orders</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        {/* Log Out */}
        <button
          onClick={onLogout}
          className="flex justify-between items-center w-full px-3 py-2 mt-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
        >
          <span>Log Out</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserMenu;