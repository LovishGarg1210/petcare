import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PetProductsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // Store products fetched from backend
  const [categories, setCategories] = useState([]); // Store categories extracted from products
  const [sliderImages, setSliderImages] = useState([]); // Store carousel images

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/product/Get'); // Replace with your actual API endpoint
      const productsData = response.data.data; // Assuming the response has the products

      // Set products data
      setProducts(productsData);

      // Extract unique categories from products data
      const uniqueCategories = ["All", ...new Set(productsData.map(product => product.category))];
      setCategories(uniqueCategories); // Set categories (including "All")
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch carousel images from backend
  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Crousel/get'); // Replace with your actual API endpoint
      setSliderImages(response.data.data); // Assuming the response has the images
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };

  // Get cart data
  const Get = async () => {
    try {
      const emailId = localStorage.getItem('user');
      const data = await axios.get(`http://localhost:4000/Cart/Get?emailId=${emailId}`);
      setCart(data.data.data.products);

    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCarouselImages();
    Get();
  }, []);

  // API URL for adding products to the cart
  const apiUrl = "http://localhost:4000/Cart/Add";

  const addToCart = async (product) => {
    const emailId = localStorage.getItem('user');
    if (emailId) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailId,
            productId: product._id,
            productName: product.name,
            productPrice: product.price,
            productImage: product.image,
          }),
        });

        const data = await response.json();
        if (data) {
          Get();
          alert("Product added to cart successfully!");
        } else {
          alert("Failed to add product to cart.");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      navigate('/login');
    }
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Filter products based on search query
  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slide show logic for rotating through the images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <header className="flex items-center justify-between py-4 px-8 bg-white border border-gray-300 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Store</h1>

        {/* Search Bar */}
        <div className="relative flex items-center w-2/3">
          <FaSearch className="absolute left-4 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg shadow-sm text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <button onClick={() => navigate('/cartPage')} className="bg-gray-300 p-3 rounded-full">
            <span role="img" aria-label="cart">🛒</span>
          </button>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{cart.length}</span>
        </div>
      </header>

      {/* Slider Section */}
      <div className="relative mb-8">
        <div
          className="w-full h-64 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${sliderImages[currentSlide]?.Url})` }}
        >
          <div className="absolute inset-0 opacity-50"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between p-4">
            <button
              onClick={() => setCurrentSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length)}
              className="bg-white p-2 rounded-full shadow-md"
            >
              &#10094;
            </button>
            <button
              onClick={() => setCurrentSlide((currentSlide + 1) % sliderImages.length)}
              className="bg-white p-2 rounded-full shadow-md"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Slide Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {sliderImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-blue-500" : "bg-gray-500"}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className="mb-8 text-center py-4 px-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="flex justify-center space-x-9">
          {categories.map((category) => (
            <div key={category} className="text-center">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-black ${selectedCategory === category ? "font-bold" : ""}`}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Layout Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchFilteredProducts.length > 0 ? (
          searchFilteredProducts.map((product) => (
            <div key={product._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 ">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name}</h3>
              <p className="text-lg text-gray-500 mt-2">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full py-2 bg-gray-500 text-white rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default PetProductsPage;
