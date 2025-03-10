import React, { useEffect, useState } from 'react';

const Success = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [itemsList, setItemsList] = useState([]); // State for storing items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extracting the URL parameters for order details
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const email = urlParams.get('email');
    const totalAmount = parseFloat(urlParams.get('totalAmount'));
    const items = urlParams.get('items'); // Get the 'items' query parameter from the URL

    if (!orderId || !email || !totalAmount || !items) {
      setError('Missing order details.');
      setLoading(false);
      return;
    }

    // Set payment details directly from the URL parameters
    setPaymentDetails({
      orderId,
      email,
      totalAmount,
    });

    // Parse and set items if they are passed in the URL
    try {
      // Decode and parse the items string
      const parsedItems = JSON.parse(decodeURIComponent(items)); // Ensure we decode and parse JSON
      setItemsList(parsedItems); // Store parsed items in the state
    } catch (e) {
      setError('Error parsing items data.');
    }

    setLoading(false);

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Success! Payment Completed</h1>
        
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary:</h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span className="text-gray-700">{paymentDetails.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Total Amount:</span>
              <span className="text-green-600 font-bold">
                ${(paymentDetails.totalAmount / 100).toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Items Purchased:</h3>
          <ul className="divide-y divide-gray-200">
            {itemsList.map((item, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.productName}</span>
                  <span className="block text-sm text-gray-500">
                    ${(item.productPrice / 100).toFixed(2)} x {item.productQuantity}
                  </span>
                </div>
                <span className="font-bold">
                  ${((item.productPrice * item.productQuantity) / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Success;