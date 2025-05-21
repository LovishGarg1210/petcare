import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // User icon
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Profile = () => {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Contact: '',
    Address: {},
  });

  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch user details from the backend API
    const fetchUserData = async () => {
      const email = localStorage.getItem('user'); // Get email from localStorage

      if (!email) {
        setError('No user email found');
        setLoading(false);
        return;
      }

      try {
        // Make a GET request to fetch user data using the email
        const response = await axios.get('http://localhost:4000/Signup/Get', {
          params: { email }, // Pass email as query parameter
        });
        console.log(response.data);
        setUser(response.data.user); // Set the user data to the state
      } catch (error) {
        setError('Failed to load user details'); // Set error message if request fails
        console.error(error);
      }
    };

    // Fetch order details from the backend API
    const fetchOrders = async () => {
      const email = localStorage.getItem('user'); // Get email from localStorage

      if (!email) {
        setError('No user email found');
        setLoading(false);
        return;
      }

      try {
        // Make a GET request with the email as a query parameter for orders
        const response = await axios.get('http://localhost:4000/Order/Orderhistory', {
          params: { email }, // Pass email as query parameter
        });
        console.log(response.data);
        setOrders(response.data); // Set the orders to the state
      } catch (error) {
        setError('Failed to load order details'); // Set error message if request fails
        console.error(error);
      }
    };

    // Fetch both user data and order history in parallel
    const fetchData = async () => {
      await Promise.all([fetchUserData(), fetchOrders()]);
      setLoading(false);
    };

    fetchData();
  }, []); // No dependency on user.email here, just run once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if there is one
  }

  // Extract address fields (city, street, zip) from the address object
  if(user?.Address.length === 0) {
    return <div>No data found</div>; // Handle case where address is not available 
  }
  
  const { city, street, zip } = user?.Address[0];
  
  
  return (
    <div className="bg-gray-100 min-h-screen pt-4 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.Name}</h2>
              <p className="text-gray-600">{user.Email}</p>
              <p className="text-gray-600">{user.Contact}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Address:</span>
              <p className="text-gray-600">
                {street}, {city}, {zip}
              </p>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link
              to="/update-profile"
              className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </Link>
            <Link
              to="/change-password"
              className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
            >
              Change Password
            </Link>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Order History</h3>
          <div className="space-y-4">
            {orders?.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="flex justify-between border-b py-4">
                  <div>
                    <p className="text-gray-800 font-semibold">Order #{order._id}</p>
                    <p className="text-gray-600">Date: {order.createdAt}</p>
                    {order.items.map((item) => (
                      <p key={item.productId} className="text-gray-600">
                        {item.productName} x {item.productQuantity}
                      </p>
                    ))}
                    <p className="text-gray-600">Items: {order.items.length}</p>
                    <p className="text-gray-600">Total Amount: {order.totalAmount}</p>
                    <p className="text-gray-600">Payment: {order.paymentStatus}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.status === 'Delivered'
                          ? 'bg-green-500'
                          : order.status === 'Shipped'
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {order.Status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
