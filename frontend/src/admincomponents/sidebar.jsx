import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaServicestack, FaShoppingCart, FaImages, FaPaw, FaClipboardList, FaCog, FaShippingFast, FaDollarSign, FaHeadset } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="mt-0 w-64 h-full fixed left-0 top-16 bg-yellow-500 text-black p-5 overflow-y-auto ">
    
      <ul className="space-y-1">
        <li>
          <Link to="/adminpanel/" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/about" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaInfoCircle className="text-xl" />
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/service" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaServicestack className="text-xl" />
            <span>Services</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/product" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaShoppingCart className="text-xl" />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/crusal-image" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaImages className="text-xl" />
            <span>Crusal Image</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/pet" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaPaw className="text-xl" />
            <span>Pets</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/application" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaClipboardList className="text-xl" />
            <span>Application</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/appointment" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaClipboardList className="text-xl" />
            <span>Appointments</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/settings" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaCog className="text-xl" />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/adminpanel/order-history" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaClipboardList className="text-xl" />
            <span>Order History</span>
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaClipboardList className="text-xl" />
            <span>Inventory</span>
          </Link>
        </li>
        <li>
          <Link to="/customer-support" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaHeadset className="text-xl" />
            <span>Customer Support</span>
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaInfoCircle className="text-xl" />
            <span>Reviews</span>
          </Link>
        </li>
        <li>
          <Link to="/payment" className="flex items-center space-x-3 hover:bgray-100 p-3 rounded-lg transition duration-300">
            <FaDollarSign className="text-xl" />
            <span>Payments</span>
          </Link>
        </li>
        <li>
          <Link to="/shipping" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300">
            <FaShippingFast className="text-xl" />
            <span>Shipping</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
