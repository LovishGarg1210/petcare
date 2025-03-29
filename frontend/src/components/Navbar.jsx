import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../reduxtoolkit/Slice'; // Add setUser action
import { FaUserCircle } from 'react-icons/fa'; // Account icon
import { HiMenu, HiX } from 'react-icons/hi'; // Icons for the hamburger menu

const Navbar = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.account.user); 
  console.log(userEmail); // Get user state from Redux store
 
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user'); // Clear user data from localStorage on logout
  };

  // Set user in Redux store on page load
  useEffect(() => {
    const savedUserEmail = localStorage.getItem('user'); // Get user data from localStorage
    if (savedUserEmail) {
      dispatch(setUser(savedUserEmail)); // Dispatch the action to set the user
    }
  }, [dispatch]);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-2">
          <img
            src="data:image/png;base64,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" // Replace with your logo path
            alt="Pet Logo"
            className="w-15 h-10 object-cover mix-blend-multiply"
          />
          <h1 className="text-2xl font-bold text-black">PetCare</h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`hidden md:flex space-x-6`}>
          <Link to="/" className="text-black text-xl hover:text-gray-200 transition duration-300">Home</Link>
          <Link to="/about" className="text-black text-xl hover:text-gray-200 transition duration-300">About</Link>
          <Link to="/services" className="text-black text-xl hover:text-gray-200 transition duration-300">Services</Link>
          <Link to="/products" className="text-black text-xl hover:text-gray-200 transition duration-300">Products</Link>
          <Link to="/pets" className="text-black text-xl hover:text-gray-200 transition duration-300">Own Pet</Link>
          <Link to="/appointments" className="text-black text-xl hover:text-gray-200 transition duration-300">Appointments</Link>
        </div>

        {/* Account and Login/Signup Buttons */}
        <div className="hidden md:flex space-x-4 relative">
          {userEmail ? (
            <div className="flex items-center space-x-2" onClick={toggleDropdown}>
              <FaUserCircle className="text-xl cursor-pointer" />
              <span className="text-black">{userEmail}</span>
              {dropdownVisible && (
                <div className="absolute right-10 mt-12 bg-white shadow-lg rounded-md w-40 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-black hover:bg-gray-100">My Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-black border-2 border-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300">Login</Link>
              <Link to="/signup" className="text-black border-2 border-gray-100 bg-white px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300">Signup</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-white p-4 shadow-md">
          <Link to="/" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Home</Link>
          <Link to="/about" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">About</Link>
          <Link to="/services" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Services</Link>
          <Link to="/products" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Products</Link>
          <Link to="/pets" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Own Pet</Link>
          <Link to="/appointments" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Appointments</Link>

          {/* Mobile Account/Login/Signup Buttons */}
          {userEmail ? (
            <>
              <Link to="/profile" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">My Profile</Link>
              <button onClick={handleLogout} className="text-black text-lg hover:text-gray-500 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Login</Link>
              <Link to="/signup" onClick={toggleMenu} className="text-black text-lg hover:text-gray-500 transition duration-300">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
