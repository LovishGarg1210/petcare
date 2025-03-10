import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateEmailPassword = () => {
  const [user, setUser] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { currentPassword, newPassword, confirmNewPassword } = user;

    // Basic validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      setLoading(false);
      return;
    }

    try {
      const email = localStorage.getItem('user'); // Get email from localStorage

      // Make a request to update the password
      const response = await axios.put('https://petcare-1.onrender.com/Signup/Update-Password', {
        email, // The current email (for validation)
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully.');
        setLoading(false);
        // Optionally redirect user to profile or login page
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }
    } catch (error) {
      setError('Failed to update password.');
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-4 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Update Password</h2>

          {/* Display success message */}
          {successMessage && (
            <div className="bg-green-200 text-green-800 p-4 rounded-md mb-4">
              {successMessage}
            </div>
          )}

          {/* Display error message */}
          {error && (
            <div className="bg-red-200 text-red-800 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={user.currentPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={user.newPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-800 font-semibold" htmlFor="confirmNewPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={user.confirmNewPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
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

export default UpdateEmailPassword;
