import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetStorePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
   
    Pets();
  }, []);

  const Pets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/pet/get");
      console.log(response.data.data);
      setPets(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loader after fetch
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    adoptReason: '',
    adoptExperience: '',
    adoptHome: ''
  });

  const handleOpenModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    formData.email = localStorage.getItem("user");
    console.log(formData)
    const response = await axios.post(`http://localhost:4000/Application/Save/${selectedPet._id}`, formData);
    console.log(response);
    alert("Application submitted successfully!");
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl text-orange-500 font-bold text-black mb-8">Adopt Your New Best Friend</h2>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {pets.map((pet) => (
              <div key={pet._id} className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h3>
                <p className="text-gray-500 text-lg mb-2">{pet.category}</p>
                <p className="text-gray-700 mb-4">{pet.description}</p>
                <button
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 w-full"
                  onClick={() => handleOpenModal(pet)}
                >
                  New Friend
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal (unchanged) */}
      {isModalOpen && selectedPet && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Adopt {selectedPet.name}</h2>
            <form onSubmit={handleSubmit}>
              {/* form fields here */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-gray-700 mb-2">Contact Information</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your contact information"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="adoptReason" className="block text-gray-700 mb-2">Why do you want to adopt {selectedPet.name}?</label>
                <textarea
                  id="adoptReason"
                  name="adoptReason"
                  value={formData.adoptReason}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Tell us your reason..."
                />
              </div>
              <div className="mb-4">
                <label htmlFor="adoptExperience" className="block text-gray-700 mb-2">Do you have experience with pets?</label>
                <select
                  id="adoptExperience"
                  name="adoptExperience"
                  value={formData.adoptExperience}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="adoptHome" className="block text-gray-700 mb-2">Do you have a suitable home for {selectedPet.name}?</label>
                <select
                  id="adoptHome"
                  name="adoptHome"
                  value={formData.adoptHome}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetStorePage;
