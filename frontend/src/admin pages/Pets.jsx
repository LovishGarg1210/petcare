import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, PawPrint, Camera } from "lucide-react";
import axios from "axios";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [showPetModal, setShowPetModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
    imagePreview: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredPets(pets.filter((pet) => pet.category === selectedCategory));
    } else {
      setFilteredPets(pets);
    }
  }, [selectedCategory, pets]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://petcare-1.onrender.com/pet/Get");
      const allPets = response.data.data;
      setPets(allPets);
      setFilteredPets(allPets);
      const uniqueCategories = [...new Set(allPets.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      if (editingPet) {
        await axios.put(`https://petcare-1.onrender.com/pet/Update/${editingPet._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("https://petcare-1.onrender.com/pet/Save", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchPets();
      resetForm();
    } catch (error) {
      console.error("Error saving pet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`https://petcare-1.onrender.com/pet/Delete/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
      setFilteredPets(filteredPets.filter((pet) => pet._id !== id));
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
      imagePreview: null,
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
      imagePreview: pet.image,
    });
    setShowPetModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 w-full md:ml-64 mt-20 md:mt-16 flex justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-800 flex items-center gap-3">
              <PawPrint className="w-8 h-8" />
              Pet Registry
            </h1>
            <p className="text-yellow-600 mt-2">Manage your beloved pets</p>
          </div>
          <div className="mt-4 sm:mt-0">
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
          <h2 className="text-xl font-semibold text-yellow-900 mb-3">
            Filter by Category
          </h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-xl ${!selectedCategory ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl ${selectedCategory === category ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Pet List */}
        <div className="space-y-8">
          {filteredPets.map((pet) => (
            <div key={pet._id} className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 flex gap-6 relative transform hover:scale-101 transition-all duration-300 flex-col sm:flex-row">
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden">
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
                        {pet.category || "Uncategorized"}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0">
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

        {/* Modal */}
        {showPetModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-70">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">
                {editingPet ? "Edit Pet" : "Add New Pet"}
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
                    className="flex items-center justify-center h-40 rounded-xl bg-gray-100 border-dashed border-2 cursor-pointer"
                  >
                    {formData.imagePreview ? (
                      <img
                        src={formData.imagePreview}
                        alt="Pet Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <Camera className="mx-auto w-10 h-10" />
                        <p className="mt-2">Upload Pet Image</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-yellow-800 font-medium">Name</label>
                  <input
                    type="text"
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-yellow-800 font-medium">Description</label>
                  <textarea
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-yellow-800 font-medium">Category</label>
                  <input
                    type="text"
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-700 transition-colors duration-300"
                  >
                    {editingPet ? "Save Changes" : "Add Pet"}
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
