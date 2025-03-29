import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaServicestack, FaShoppingCart, FaImages, FaPaw, FaClipboardList, FaCog, FaShippingFast, FaDollarSign, FaHeadset } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button for Mobile View */}
      {isOpen && (
        <div className="md:hidden fixed top-4 right-4 z-60 mt-15">
          <button onClick={toggleSidebar} className="text-black text-2xl">
            <FaTimes />
          </button>
        </div>
      )}

      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-60 mt-15">
          <button onClick={toggleSidebar} className="text-black text-2xl">
            <FaBars />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`mt-0 w-64 h-full fixed left-0 top-16 bg-yellow-500 text-black p-5 overflow-y-auto transition-transform duration-300 z-50 ${
          isOpen ? ' w-full transform translate-x-0' : 'transform -translate-x-full'
        } md:transform md:translate-x-0`}
      >
        <ul className="space-y-1">
          <li>
            <Link
              to="/adminpanel/"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex mt-2 items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/about"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaInfoCircle className="text-xl" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/service"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaServicestack className="text-xl" />
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/product"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaShoppingCart className="text-xl" />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/crusal-image"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaImages className="text-xl" />
              <span>Crusal Image</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/pet"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaPaw className="text-xl" />
              <span>Pets</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/application"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaClipboardList className="text-xl" />
              <span>Application</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/appointment"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaClipboardList className="text-xl" />
              <span>Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/settings"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaCog className="text-xl" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/adminpanel/order-history"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaClipboardList className="text-xl" />
              <span>Order History</span>
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaClipboardList className="text-xl" />
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customer-support"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaHeadset className="text-xl" />
              <span>Customer Support</span>
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaInfoCircle className="text-xl" />
              <span>Reviews</span>
            </Link>
          </li>
          <li>
            <Link
              to="/payment"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaDollarSign className="text-xl" />
              <span>Payments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/shipping"
              onClick={toggleSidebar} // Close sidebar on click
              className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
            >
              <FaShippingFast className="text-xl" />
              <span>Shipping</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Background overlay for mobile when the sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
        />
      )}
    </>
  );
}

export default Sidebar;
