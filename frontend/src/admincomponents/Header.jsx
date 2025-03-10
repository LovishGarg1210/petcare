import React from 'react';
import { FaBell, FaUserCircle, FaCog } from 'react-icons/fa';

function Header() {
  return (
    <div className="bg-black text-white p-4 flex justify-between fixed top-0   w-full items-center z-50">
      <div className="flex items-center space-x-4">
        {/* Logo or Title */}
        <h1 className="text-2xl font-semibold">Pet E-commerce Dashboard</h1>
      </div>

      {/* Right-side of the header: User & Notifications */}
      <div className="flex items-center space-x-6">
        {/* Notifications Icon */}
        <div className="relative">
          <FaBell className="text-xl cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </div>

        {/* User Profile Icon */}
        <div className="cursor-pointer">
          <FaUserCircle className="text-2xl" />
        </div>

        {/* Settings Icon */}
        <div className="cursor-pointer">
          <FaCog className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default Header;
