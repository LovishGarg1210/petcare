import React, { useState, useEffect } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";

const AboutPage = () => {
  const [services, setServices] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:4000/About/Get");
        const data = await response.json();
        setServices(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Pattern */}
      <div className="relative overflow-hidden bg-blue-50 py-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute transform rotate-45 border-2 border-blue-200"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: "60px",
                height: "60px",
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-black mb-6">
              About PetCare
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in providing exceptional care and services for your beloved pets.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20">
        <div className="grid gap-12 lg:grid-cols-3 sm:grid-cols-1">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-4 ${
                  index === 0
                    ? "border-blue-500"
                    : index === 1
                    ? "border-purple-500"
                    : "border-green-500"
                }`}
                style={{
                  maxWidth: "400px", // Added max-width for wider cards
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{
                    background: `linear-gradient(to right, ${service.gradientStart} to ${service.gradientEnd})`,
                  }}
                />
                <div className="p-8">
                  <div className="mb-6 flex justify-center">
                    {index === 0 && <Heart className="w-12 h-12 text-blue-500" />}
                    {index === 1 && <Star className="w-12 h-12 text-purple-500" />}
                    {index === 2 && <ShoppingBag className="w-12 h-12 text-green-500" />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {service.heading}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.paragraph}
                  </p>
                </div>
                <img
                  src={service.image}
                  alt={service.heading}
                  className="w-full h-48 object-cover mt-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            <p>Loading services...</p>
          )}
        </div>

        {/* Mission Statement */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-blue-50 transform -skew-y-3 rounded-3xl" />
          <div className="relative px-8 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're dedicated to providing comprehensive pet care services that exceed expectations. Our commitment goes beyond basic services – we strive to create a community where pets and their owners thrive together. Through personalized care, professional veterinary services, and premium products, we ensure your pets live their best lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
