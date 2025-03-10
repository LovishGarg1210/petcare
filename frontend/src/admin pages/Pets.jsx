import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, PawPrint, Camera } from "lucide-react";
import axios from "axios";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [showPetModal, setShowPetModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
    imagePreview: null // Add this for image preview
  });
  const [categories, setCategories] = useState([]); // State to store unique categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredPets(pets.filter(pet => pet.category === selectedCategory));
    } else {
      setFilteredPets(pets); // Show all pets if no category is selected
    }
  }, [selectedCategory, pets]);

  const fetchPets = async () => {
    try {
      const response = await axios.get("https://petcare-1.onrender.com/pet/Get");
      const allPets = response.data.data;
      setPets(allPets);
      setFilteredPets(allPets);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(allPets.map((pet) => pet.category).filter((category) => category))
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    
    // Only append image if a new file is selected
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      if (editingPet) {
        // For PUT requests, only include image if it's changed
        await axios.put(
          `https://petcare-1.onrender.com/pet/Update/${editingPet._id}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          "https://petcare-1.onrender.com/pet/Save",
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      await fetchPets();
      resetForm();
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`https://petcare-1.onrender.com/pet/Delete/${id}`);
      setPets(pets.filter(pet => pet._id !== id));
      setFilteredPets(filteredPets.filter(pet => pet._id !== id));
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      image: null,
      imagePreview: null
    });
    setEditingPet(null);
    setShowPetModal(false);
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      description: pet.description,
      category: pet.category,
      image: pet.image,
      imagePreview: pet.image // Use existing image URL as preview
    });
    setShowPetModal(true);
  };

  return (
    <div className="min-h-screen ml-64 mt-16  py-12 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-yellow-800 flex items-center gap-3">
              <PawPrint className="w-8 h-8" />
              Pet Registry
            </h1>
            <p className="text-yellow-600 mt-2">Manage your beloved pets</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowPetModal(true)}
              className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Pet
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-yellow-900 mb-3">Filter by Category</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-xl ${!selectedCategory ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl ${selectedCategory === category ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Pet List */}
        <div className="space-y-8 relative">
          {filteredPets.map((pet, index) => (
            <div key={pet._id} className="relative">
              {index < filteredPets.length - 1 && (
                <div className="absolute left-16 top-full w-1 h-8 bg-yellow-200" />
              )}
              <div className="bg-white rounded-2xl shadow-xl p-6 flex gap-6 relative transform hover:scale-101 transition-all duration-300">
                <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={pet.image || "/api/placeholder/128/128"}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-yellow-900">{pet.name}</h2>
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-600 mt-2">
                        {pet.category || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(pet)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                      >
                        <Pencil className="w-5 h-5 text-yellow-600" />
                      </button>
                      <button
                        onClick={() => deletePet(pet._id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3 line-clamp-2">{pet.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Pet Modal */}
        {showPetModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">
                {editingPet ? 'Edit Pet' : 'Add New Pet'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    id="pet-image"
                    accept="image/*"
                  />
                  <label
                    htmlFor="pet-image"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 transition-colors duration-200 bg-purple-50/50"
                  >
                    {formData.imagePreview ? (
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <Camera className="w-12 h-12 text-purple-400 mb-2" />
                        <p className="text-sm text-purple-600">Upload pet photo</p>
                        <p className="text-xs text-purple-400 mt-1">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Pet Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  required
                />

                <input
                  type="text"
                  placeholder="Pet Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                  required
                />

                <textarea
                  placeholder="Pet Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 min-h-[100px]"
                  required
                />

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200"
                  >
                    {editingPet ? 'Save Changes' : 'Add Pet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;
