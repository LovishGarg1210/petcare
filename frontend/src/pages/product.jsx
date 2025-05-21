import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PetProductsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("sliderimages", sliderImages);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/Get");
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      }
      const productsData = response.data.data;
      const uniqueCategories = ["All", ...new Set(productsData.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Crousel/Get");
      if (Array.isArray(response.data.data)) {
        setSliderImages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  const Get = async () => {
    try {
      const emailId = localStorage.getItem("user");
      const data = await axios.get(`http://localhost:4000/Cart/Get?emailId=${emailId}`);
      setCart(data.data.data.products);
    } catch (error) {
      console.error(`Error fetching cart: ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCarouselImages(), Get()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const apiUrl = "http://localhost:4000/Cart/Add";

  const addToCart = async (product) => {
    const emailId = localStorage.getItem("user");
    if (emailId) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
      navigate("/login");
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between py-4 px-6 bg-white border border-gray-300 rounded-lg shadow-lg mb-8">
        <h1 className="hidden md:block text-3xl font-bold text-gray-800">My Store</h1>
        <div className="relative flex items-center w-full md:w-2/3">
          <FaSearch className="absolute left-4 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-lg shadow-sm text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative ml-4">
          <button onClick={() => navigate("/cartPage")} className="bg-gray-300 p-3 rounded-full">
            <span role="img" aria-label="cart">
              🛒
            </span>
          </button>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {cart.length}
          </span>
        </div>
      </header>


      <div className="relative mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
         
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="rounded-lg shadow-lg"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-64 bg-cover bg-no-repeat bg-center rounded-lg"
                style={{backgroundImage : `url('${image.Url}')`}}
              >
               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mb-8 text-center py-4 px-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-black ${selectedCategory === category ? "font-bold" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchFilteredProducts.length > 0 ? (
          searchFilteredProducts.map((product) => (
            <div key={product._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold text-gray-800 mt-4">{product.name}</h3>
              <p className="text-md text-gray-500 mt-2">Rs{product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default PetProductsPage;
