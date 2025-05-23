import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Pencil, Trash2, Plus, Image } from "lucide-react";

function Crouselimg() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState({ file: null, caption: "" });
  const [editImage, setEditImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  // New state for image preview

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://petcare-1.onrender.com/Crousel/Get");
      if (Array.isArray(response.data.data)) {
        setImages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const addImage = async () => {
    if (!newImage.file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("Url", newImage.file);
    formData.append("caption", newImage.caption);

    try {
      const response = await axios.post("https://petcare-1.onrender.com/Crousel/Save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prevImages) => [...prevImages, response.data.data]);
      setNewImage({ file: null, caption: "" });
      setImagePreview(null); // Reset preview
      setShowModal(false);
    } catch (error) {
      console.error("Error adding image:", error);
      alert("An error occurred while adding the image.");
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`https://petcare-1.onrender.com/Crousel/Delete/${id}`);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    }
  };

  const editImageDetails = async () => {
    if (!editImage.caption) {
      alert("Please enter a caption");
      return;
    }

    try {
      const response = await axios.put(
        `https://petcare-1.onrender.com/Crousel/Update/${editImage._id}`,
        { caption: editImage.caption }
      );
      setImages((prevImages) =>
        prevImages.map((image) =>
          image._id === editImage._id ? response.data.data : image
        )
      );
      setEditImage(null);
      fetchImages();
    } catch (error) {
      console.error("Error editing image:", error);
      alert("An error occurred while editing the image.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type! Please upload a valid image.');
      return;
    }

    // Create a preview URL for the image
    setImagePreview(URL.createObjectURL(file));

    setNewImage({ ...newImage, file });
  };

  return (
    <div className="min-h-screen ml-0 lg:ml-64 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full relative z-0">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-0">Image Gallery</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Image</span>
          </button>
        </div>

        {/* Image Grid with Zigzag Pattern */}
        <div className="relative flex flex-wrap justify-center gap-x-10 md:gap-x-14 gap-y-12 md:gap-y-16">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={image._id} className="relative group">
                {/* Zigzag connector */}
                {index < images.length - 1 && (
                  <>
                    <div 
                      className="absolute w-16 h-1 md:w-24 bg-yellow-300 hidden md:block"
                      style={{
                        right: '-4rem',
                        top: index % 2 === 0 ? '75%' : '25%',
                        transform: `rotate(${index % 2 === 0 ? '45deg' : '-45deg'})`,
                        transformOrigin: index % 2 === 0 ? 'left bottom' : 'left top'
                      }}
                    />
                    <div 
                      className="absolute w-2 h-2 rounded-full bg-indigo-400 hidden md:block"
                      style={{
                        right: '-4rem',
                        top: index % 2 === 0 ? '75%' : '25%',
                        transform: 'translate(50%, -50%)'
                      }}
                    />
                  </>
                )}

                {/* Image Card */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <img
                    src={image.Url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium truncate">
                      {image.caption}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={() => setEditImage(image)}
                      className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4 text-indigo-600" />
                    </button>
                    <button
                      onClick={() => deleteImage(image._id)}
                      className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 md:p-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
              <Image className="w-12 h-12 md:w-16 md:h-16 text-indigo-300 mx-auto mb-4" />
              <p className="text-indigo-900 text-md md:text-lg font-medium">No images available</p>
              <p className="text-indigo-600/70 mt-2">Add some images to get started</p>
            </div>
          )}
        </div>

        {/* Add Image Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 transform transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Image</h2>
              
              <div className="space-y-4 md:space-y-6">
                {/* File Upload Section */}
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors duration-200 bg-indigo-50/50"
                  >
                    <Image className="w-8 h-8 md:w-12 md:h-12 text-indigo-400 mb-2" />
                    <p className="text-sm text-indigo-600">Click to upload an image</p>
                  </label>
                </div>

                {/* Preview */}
                {imagePreview && (
                  <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Caption Input */}
                <input
                  type="text"
                  value={newImage.caption}
                  onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                  placeholder="Enter a caption"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={addImage}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-colors duration-200"
                >
                  Add Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crouselimg;
