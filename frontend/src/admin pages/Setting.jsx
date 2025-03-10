import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const [profile, setProfile] = useState({
    Name: '',
    Email: '',
    Contact: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('user');
      try {
        const response = await axios.get('http://localhost:4000/Signup/Get', { params: { email } });
        console.log(response);
        setProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('user');
    try {
      await axios.put('http://localhost:4000/Signup/Update', {
        email,
        Name: profile.Name,
        Contact: profile.Contact,
      });
      alert('Profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('user');
    if (passwords.newPassword === passwords.confirmNewPassword) {
      try {
        await axios.put('http://localhost:4000/Signup/Update-password', {
          email,
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        });
        alert('Password updated');
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } else {
      console.log('Passwords do not match');
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:4000/admin/updateNotifications', notifications);
      console.log('Notifications updated');
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="mx-auto min-h-screen ml-64 mt-16 py-12 px-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      
      {/* Profile Settings */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold">Username</label>
              <input
                type="text"
                name="Name"
                value={profile.Name}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="Email"
                value={profile.Email}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="text"
              name="Contact"
              value={profile.Contact}
              onChange={handleProfileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Password Settings */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Notification Settings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <form onSubmit={handleNotificationSubmit} className="space-y-4">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox"
              />
              <span className="ml-2">Email Notifications</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox"
              />
              <span className="ml-2">SMS Notifications</span>
            </label>
          </div>

          {/* Align the buttons to the right */}
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Save Notifications
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
