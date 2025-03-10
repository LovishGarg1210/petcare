import React from 'react';
import { Link } from 'react-router-dom';  // For React Router Navigation

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 py-6">
      <div className="max-w-7xl mx-auto  px-6 sm:px-8">
        <div className="grid ml-27 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="text-gray-800">
              We offer a wide range of pet products and services, including veterinary care, grooming, and pet supplies. Our mission is to provide the best care for your furry friends.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-800 hover:text-white">Home</Link></li>
              <li><Link to="/shop" className="text-gray-800 hover:text-white">Shop</Link></li>
              <li><Link to="/veterinary" className="text-gray-800 hover:text-white">Veterinary Services</Link></li>
              <li><Link to="/contact" className="text-gray-800 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-800">Phone: (123) 456-7890</li>
              <li className="text-gray-800">Email: info@petstore.com</li>
              <li className="text-gray-800">Address: 123 Pet Street, City, State</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-600 pt-4">
          <p className="text-center text-gray-900 text-sm">
            &copy; {new Date().getFullYear()} Pet Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
