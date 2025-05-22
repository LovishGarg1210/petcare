import React, { useState, useEffect } from "react";

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    // Replace with your actual backend API URL
    fetch("https://petcare-1.onrender.com/Service/Get")
      .then((response) => response.json())
      .then((data) => setServices(data.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover the wide range of services we offer to ensure the well-being and happiness of your pets.
          </p>
        </div>

     {/* Services Section */}
<div className="mt-12 grid gap-12 lg:grid-cols-3 sm:grid-cols-1">
  {services.length > 0 ? (
    services.map((service, index) => (
      <div key={index} className="relative bg-white rounded-lg shadow-xl overflow-hidden">
        <img
          src={service.image}
          alt={service.heading}
          className="w-full h-72 object-cover transition-all duration-300 ease-in-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">{service.heading}</h2>
          <p className="text-lg">{service.paragraph}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="flex justify-center items-center h-40 w-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}
</div>


        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Ready to Give Your Pet the Best Care?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're looking to adopt a new pet, purchase high-quality pet products, or provide veterinary care,
            we are here for you and your pet's needs.
          </p>
          <a
            href="/contact"
            className="bg-gray-600 text-white px-6 py-3 rounded-md text-xl font-semibold hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
