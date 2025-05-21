import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Contact: '',
    Address: [
      {
        street: '',
        city: '',
        zip: '',
      }
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details when the component is mounted
    const fetchUserData = async () => {
      const email = localStorage.getItem('user'); // Get email from localStorage

      if (!email) {
        setError('No user email found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/Signup/Get', {
          params: { email },
        });
        
        console.log("API Response:", response.data); // Log the complete response
        
        const userData = response.data.user;
        
        // Ensure Address is always an array with at least one item
        if (!userData.Address || !Array.isArray(userData.Address)) {
          userData.Address = [{ street: '', city: '', zip: '' }];
        } else if (userData.Address.length === 0) {
          userData.Address.push({ street: '', city: '', zip: '' });
        }
        
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load user details');
        setLoading(false);
        console.error('API Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    
    // Create a safe copy of the current address
    const currentAddress = { 
      ...(user.Address && user.Address[0] ? user.Address[0] : {}),
      [name]: value 
    };
    
    setUser({
      ...user,
      Address: [currentAddress],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to update the user profile data
      const email = localStorage.getItem('user');
      const response = await axios.put('http://localhost:4000/Signup/Update', {
        email,
        Name: user.Name,
        Contact: user.Contact,
        Address: user.Address,
      });

      console.log("Update Response:", response.data);

      // If the update was successful, navigate to the profile page
      if (response.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      setError('Failed to update profile');
      console.error('Update Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-4 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="Name">
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={user.Name || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="Email">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={user.Email || ''}
                className="w-full p-2 border border-gray-300 rounded-md"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="Contact">
                Contact
              </label>
              <input
                type="text"
                id="Contact"
                name="Contact"
                value={user.Contact || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="street">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={user.Address && user.Address[0] ? user.Address[0].street || '' : ''}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={user.Address && user.Address[0] ? user.Address[0].city || '' : ''}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="zip">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={user.Address && user.Address[0] ? user.Address[0].zip || '' : ''}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;