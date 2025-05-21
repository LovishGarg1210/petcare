import React, { useState, useRef } from 'react';
import { Camera, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function PetListingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    price: '',
    description: '',
    health: {
      vaccinated: false,
      dewormed: false,
      neutered: false
    },
    sellerInfo: {
      name: '',
      phone: '',
      email: '',
      location: ''
    }
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedInputChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value
      }
    });
  };

  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      health: {
        ...formData.health,
        [field]: !formData.health[field]
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const submitData = new FormData();

    // Add image
    if (image) {
      submitData.append('image', image);
    }

    // Append flat fields
    submitData.append('petName', formData.petName);
    submitData.append('petType', formData.petType);
    submitData.append('breed', formData.breed);
    submitData.append('age', formData.age);
    submitData.append('gender', formData.gender);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);

    // Append health object fields
    submitData.append('healthvaccinated', formData.health.vaccinated);
    submitData.append('healthdewormed', formData.health.dewormed);
    submitData.append('healthneutered', formData.health.neutered);

    // Append sellerInfo object fields
    submitData.append('sellerInfocontact', formData.sellerInfo.phone);
    submitData.append('sellerInfoname', formData.sellerInfo.name);
    submitData.append('sellerInfoemail', formData.sellerInfo.email);
    submitData.append('sellerInfolocation', formData.sellerInfo.location);
    // Submit form
    const response = await fetch('http://localhost:4000/SellPet/save', {
      method: 'POST',
      body: submitData,
    });

    if (!response.ok) throw new Error('Failed to submit form');

    const data = await response.json();
    console.log('Response:', data);

    setSubmitted(true);
  } catch (error) {
    console.error('Error submitting form:', error.message);
  } finally {
    setIsSubmitting(false);
  }
};



  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 " >
            <h2 className="text-xl font-semibold">Pet Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pet Name*</label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pet Type*</label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="fish">Fish</option>
                  <option value="reptile">Reptile</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age*</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. 2 years, 6 months"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (USD)*</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Health & Description</h2>
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-1">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md h-32"
                placeholder="Tell us about your pet's personality, habits, training, etc."
                required
              />
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Health Status</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vaccinated"
                    checked={formData.health.vaccinated}
                    onChange={() => handleCheckboxChange('vaccinated')}
                    className="mr-2"
                  />
                  <label htmlFor="vaccinated">Vaccinated</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dewormed"
                    checked={formData.health.dewormed}
                    onChange={() => handleCheckboxChange('dewormed')}
                    className="mr-2"
                  />
                  <label htmlFor="dewormed">Dewormed</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="neutered"
                    checked={formData.health.neutered}
                    onChange={() => handleCheckboxChange('neutered')}
                    className="mr-2"
                  />
                  <label htmlFor="neutered">Spayed/Neutered</label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Photo Upload</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="space-y-4 w-full">
                  <img 
                    src={previewUrl} 
                    alt="Pet preview" 
                    className="max-w-full h-48 object-contain mx-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-full py-2 bg-blue-100 text-blue-600 font-medium rounded-md hover:bg-blue-200"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <div 
                  onClick={triggerFileInput}
                  className="cursor-pointer text-center space-y-2"
                >
                  <Camera size={48} className="mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload a photo of your pet</p>
                  <p className="text-xs text-gray-400">(JPEG, PNG, max 5MB)</p>
                </div>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Seller Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name*</label>
                <input
                  type="text"
                  value={formData.sellerInfo.name}
                  onChange={(e) => handleNestedInputChange('sellerInfo', 'name', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number*</label>
                <input
                  type="tel"
                  value={formData.sellerInfo.phone}
                  onChange={(e) => handleNestedInputChange('sellerInfo', 'phone', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  value={formData.sellerInfo.email}
                  onChange={(e) => handleNestedInputChange('sellerInfo', 'email', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location*</label>
                <input
                  type="text"
                  value={formData.sellerInfo.location}
                  onChange={(e) => handleNestedInputChange('sellerInfo', 'location', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="City, State"
                  required
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Listing Submitted!</h2>
          <p className="text-gray-600">
            Your pet listing has been successfully submitted. We'll review it shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({
                petName: '',
                petType: '',
                breed: '',
                age: '',
                gender: '',
                price: '',
                description: '',
                health: {
                  vaccinated: false,
                  dewormed: false,
                  neutered: false
                },
                sellerInfo: {
                  name: '',
                  phone: '',
                  email: '',
                  location: ''
                }
              });
              setImage(null);
              setPreviewUrl(null);
            }}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Create Another Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20 mb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center">Sell Your Pet</h1>
        <p className="text-gray-600 text-center">Find your pet a loving new home</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber === step 
                    ? 'bg-blue-600 text-white' 
                    : stepNumber < step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber < step ? <Check size={16} /> : stepNumber}
              </div>
              <span className="text-xs mt-1 hidden sm:block">
                {stepNumber === 1 ? 'Pet Info' : 
                 stepNumber === 2 ? 'Details' : 
                 stepNumber === 3 ? 'Photo' : 'Seller'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 bg-gray-200 relative">
          <div 
            className="absolute h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="mt-6 flex justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowLeft size={16} className="mr-1" />
              Previous
            </button>
          ) : (
            <div></div> // Empty div for spacing
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
              <ArrowRight size={16} className="ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-green-600 text-white rounded-md ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Listing'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}