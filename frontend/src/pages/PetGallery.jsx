import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ChevronRight, Play } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PetGallery = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      category: 'grooming',
      title: 'Premium Grooming Services',
      image: 'https://media.istockphoto.com/id/530364973/photo/dog-grooming.webp?a=1&b=1&s=612x612&w=0&k=20&c=RchPz8JI-3IFHC2o3OH8_rWTxn38IyH5RfFjxuNs0yw=',
      rating: 4.9,
      reviews: 156,
      description: 'Professional grooming with premium products'
    },
    {
      id: 2,
      type: 'video',
      category: 'training',
      title: 'Dog Training Sessions',
      image: 'https://media.istockphoto.com/id/912145654/photo/here-you-go-human-you-can-have-my-paw.jpg?s=612x612&w=0&k=20&c=3TqTdeubAjgw-un7PBYHUN1YFIqmFzDc4Kd0GHa3TKk=',
      rating: 4.8,
      reviews: 89,
      description: 'Expert training for all dog breeds'
    },
    {
      id: 3,
      type: 'image',
      category: 'boarding',
      title: 'Luxury Pet Boarding',
      image: 'https://media.istockphoto.com/id/2201889186/photo/adopt-me.jpg?s=612x612&w=0&k=20&c=Kz2Lg5FYn-zYG4Nw_jponw2zgPne5RPhyupirldpqyw=',
      rating: 4.9,
      reviews: 234,
      description: 'Safe and comfortable boarding facilities'
    },
    {
      id: 4,
      type: 'image',
      category: 'veterinary',
      title: 'Veterinary Care',
      image: 'https://media.istockphoto.com/id/174830487/photo/veterinarian-examining-guinea-pig.jpg?s=612x612&w=0&k=20&c=EjrfrIbGiLwaXoUiSE1NvlybQnLXLknqFMVVuWyPddI=',
      rating: 5.0,
      reviews: 312,
      description: 'Professional veterinary services'
    },
    {
      id: 5,
      type: 'image',
      category: 'grooming',
      title: 'Spa & Wellness',
      image: 'https://media.istockphoto.com/id/467178943/photo/female-groomer-haircut-yorkshire-terrier.jpg?s=612x612&w=0&k=20&c=6GzAzeLk-W-7ZWgX4Vsd8fUGNIKtMpzG7CHDbJOu09w=',
      rating: 4.7,
      reviews: 98,
      description: 'Relaxing spa treatments for pets'
    },
    {
      id: 6,
      type: 'video',
      category: 'training',
      title: 'Puppy Socialization',
      image: 'https://media.istockphoto.com/id/919014040/photo/two-dogs-laying-obey-training.jpg?s=612x612&w=0&k=20&c=xNtP5iITM91CIrdQPjMzOsa4kHmFrWt6uZuI7qeiC3c=',
      rating: 4.8,
      reviews: 67,
      description: 'Early socialization programs'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services', color: 'bg-orange-500' },
    { id: 'grooming', label: 'Grooming', color: 'bg-blue-500' },
    { id: 'training', label: 'Training', color: 'bg-green-500' },
    { id: 'boarding', label: 'Boarding', color: 'bg-purple-500' },
    { id: 'veterinary', label: 'Veterinary', color: 'bg-red-500' }
  ];

  const filteredItems = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12" data-aos="zoom-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Our Services Gallery
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional Pet Care
              <span className="text-orange-500"> Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of pet care services designed to keep your furry friends happy, healthy, and looking their best.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? `${category.color} text-white shadow-lg transform scale-105`
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Video Play Button */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-orange-500" />
                      </div>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      categories.find(cat => cat.id === item.category)?.color || 'bg-gray-500'
                    }`}>
                      {categories.find(cat => cat.id === item.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>{item.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16" data-aos="zoom-in-up">
            <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Give Your Pet the Best Care?
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Book an appointment today and experience our premium pet care services
              </p>
              <button
                onClick={() => navigate("/appointments")}
                className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors hover:shadow-lg"
              >
                Schedule Appointment
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16" data-aos="fade-up">
            {[
              { number: '5000+', label: 'Happy Pets' },
              { number: '15+', label: 'Years Experience' },
              { number: '50+', label: 'Expert Staff' },
              { number: '4.9/5', label: 'Customer Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PetGallery;
