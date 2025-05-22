
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { ShoppingCart, Trash2, MapPin, CreditCard, AlertCircle, CheckCircle, Package } from 'lucide-react';

const stripePromise = loadStripe('pk_test_51PIxspSIBLFcktovP20SaIS5WelD6phB4X5qn0zdaZxcje1xrVgg4l3EgxHJAMvcp0FrFmwNAn4pCe5nUULXHSjh00qqfPbM22'); 

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(true);

    // Fetch cart data from the backend
    const fetchCartData = async () => {
        const emailId = localStorage.getItem('user'); // Get emailId from localStorage
        if (emailId) {
            try {
                const response = await axios.get(`https://petcare-1.onrender.com/Cart/Get?emailId=${emailId}`);
                setCartItems(response.data.data.products); // Assuming products are in `data.products`
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setLoading(false);
            }
        }
        else{
            // Redirect to login page if no user is logged in
            window.location.href = '/login';
        }
    };
    const handleQuantityChange = async (id, type) => {
      const updatedItems = cartItems.map((item) => 
          item.productId === id
              ? { ...item, productQuantity: type === "inc" ? item.productQuantity + 1 : item.productQuantity - 1 }
              : item
      );

      // Ensure quantity doesn't go below 1
      if (type === "dec" && updatedItems.find(item => item.productId === id).productQuantity < 1) {
          return; // Don't allow quantity to be less than 1
      }

      setCartItems(updatedItems); // Update cart locally
      await updateCartInBackend(updatedItems); // Update cart on the backend
  };

  // Update cart on the backend
  const updateCartInBackend = async (updatedItems) => {
      const emailId = localStorage.getItem('user');
      if (emailId) {
          try {
              await axios.put('https://petcare-1.onrender.com/Cart/Update', { emailId, products: updatedItems });
          } catch (error) {
              console.error('Error updating cart:', error);
          }
      }
  };

    // Handle address input change
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Validate the address form
    const validateAddress = () => {
        const { street, city, state, zip } = address;
        if (street && city && state && zip) {
            setIsAddressValid(true);
            return true;
        } else {
            setIsAddressValid(false);
            return false;
        }
    };

    // Save the address to the backend
    const handleSaveAddress = async () => {
        const email = localStorage.getItem('user');
        if (validateAddress()) {
            if (email) {
                try {
                    await axios.post('https://petcare-1.onrender.com/Signup/SaveAddress', { email, address });
                    setIsAddressSaved(true); // Mark address as saved
                } catch (error) {
                    console.error("Error saving address", error);
                }
            }
        } else {
            alert("Please fill in all address fields");
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.productPrice * item.productQuantity,
            0
        );
    };

    const handlePayment = async () => {
        if (!isAddressSaved) {
            alert("Please provide a shipping address before proceeding to checkout.");
            return;
        }
    
        const emailId = localStorage.getItem('user');
        const orderData = {
            emailId,
            items: cartItems,
            totalAmount: calculateTotal(),
        };
    
        try {
            const response = await axios.post('https://petcare-1.onrender.com/Order/create-payment-intent', orderData);
            const { id } = response.data;
    
            const stripe = await stripePromise;
    
            // Check if user is on mobile by checking the window width
            const isMobile = window.innerWidth <= 768;
    
            if (isMobile) {
                // On mobile, redirect to Stripe Checkout in the same tab
                const { error } = await stripe.redirectToCheckout({
                    sessionId: id,
                });
    
                if (error) {
                    console.error("Error redirecting to Checkout:", error);
                }
            } else {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: id,
                });
    
                if (error) {
                    console.error("Error redirecting to Checkout:", error);
                }
               
            }
    
        } catch (error) {
            console.error("Error starting checkout process", error);
            alert("An error occurred while processing your payment. Please try again.");
        }
    };
    

    // Handle remove item
    const handleRemoveItem = async (productId) => {
        const emailId = localStorage.getItem('user');
        
        try {
            // Sending the request with emailId and productId in the request body
            const response = await axios.post("https://petcare-1.onrender.com/Cart/Delete", { emailId, productId});
    
            if (response.status === 200) {
                alert("Item removed successfully");
                fetchCartData(); // Refresh the cart data after removing the item
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    
    // Fetch cart data when component mounts
    useEffect(() => {
        fetchCartData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-700 font-medium">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-center mb-8">
                <ShoppingCart className="text-blue-600 mr-3 h-8 w-8" />
                <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 shadow-md">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                            <div className="border-b border-gray-200 bg-gray-50 py-4 px-6">
                                <h2 className="text-lg font-semibold text-gray-800">Cart Items ({cartItems.length})</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div key={item.productId} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                                            <h3 className="font-medium text-gray-800">{item.productName}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Product ID: {item.productId}</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full sm:w-1/2">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-500">Price</p>
                                                <p className="font-medium">Rs{item.productPrice.toFixed(2)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-500">Quantity</p>
                                                <button
                                    onClick={() => handleQuantityChange(item.productId, "dec")}
                                    disabled={item.quantity <= 1}
                                    className="px-2 py-1  rounded"
                                >
                                    -
                                </button>
                                {item.productQuantity}
                                <button
                                    onClick={() => handleQuantityChange(item.productId, "inc")}
                                    className="px-2 py-1  rounded"
                                >
                                    +
                                </button>
                                               
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="font-medium">Rs{(item.productPrice * item.productQuantity).toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.productId)}
                                                className="ml-4 text-red-500 hover:text-red-700 transition duration-200"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {/* Address Form */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                            <div className="border-b border-gray-200 bg-gray-50 py-4 px-6 flex items-center">
                                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                                <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            name="street"
                                            value={address.street}
                                            onChange={handleAddressChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="Enter your street address"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={address.city}
                                            onChange={handleAddressChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="Enter your city"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={address.state}
                                                onChange={handleAddressChange}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                placeholder="Enter state"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={address.zip}
                                                onChange={handleAddressChange}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                placeholder="Enter zip code"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {!isAddressValid && (
                                    <div className="mt-4 p-3 bg-red-50 rounded-md flex items-start">
                                        <AlertCircle className="text-red-500 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-600">Please fill in all the address fields to proceed.</p>
                                    </div>
                                )}
                                
                                {isAddressSaved && (
                                    <div className="mt-4 p-3 bg-green-50 rounded-md flex items-start">
                                        <CheckCircle className="text-green-500 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-green-600">Address saved successfully!</p>
                                    </div>
                                )}
                                
                                <button
                                    onClick={handleSaveAddress}
                                    className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                                >
                                    <MapPin className="mr-2 h-4 w-4" />
                                    {isAddressSaved ? 'Update Address' : 'Save Address'}
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="border-b border-gray-200 bg-gray-50 py-4 px-6">
                                <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">$0.00</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold">Total</span>
                                            <span className="text-lg font-semibold">${calculateTotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    className={`mt-6 w-full py-3 px-4 rounded-md flex items-center justify-center transition duration-200 ${
                                        isAddressSaved 
                                            ? "bg-green-600 hover:bg-green-700 text-white" 
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                    onClick={handlePayment}
                                    disabled={!isAddressSaved}
                                >
                                    <CreditCard className="mr-2 h-5 w-5" />
                                    Proceed to Checkout
                                </button>
                                
                                {!isAddressSaved && (
                                    <p className="mt-3 text-sm text-center text-gray-500">
                                        Please save your shipping address first
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;