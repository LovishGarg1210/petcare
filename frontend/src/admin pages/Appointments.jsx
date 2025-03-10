import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Fetch appointments from backend (e.g., MongoDB) via API
  useEffect(() => {
    fetchAppointments();
  }, []);
  
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://petcare-1.onrender.com/Appointment/Get'); // Update the endpoint accordingly
      setAppointments(response.data);  // Assuming the API returns an array of appointments
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  // AI-powered feature suggestion (optional)
  const aiSuggestions = (appointment) => {
    // You can add AI-based logic for automated suggestions like "Reschedule" or "Verify Information"
    return appointment.message && appointment.message.includes('check') ? 'Follow up on concerns' : 'No immediate action';
  };

  return (
    <div className="min-h-screen ml-64 mt-16 bg-gray-100 py-12 px-6 w-full">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-4xl font-semibold text-center text-black mb-8">Admin Appointment Dashboard</h2>
        
        {/* Search Input */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={handleSearch}
            className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-1/3"
          />
        </div>

        {/* Appointment Table */}
        {loading ? (
          <p className="text-center text-xl">Loading appointments...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6">Owner Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Phone</th>
                  <th className="py-3 px-6">Appointment Date</th>
                  <th className="py-3 px-6">Appointment Time</th>
                  <th className="py-3 px-6">Message</th>
                  <th className="py-3 px-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{appointment.ownerName}</td>
                    <td className="py-3 px-6">{appointment.email}</td>
                    <td className="py-3 px-6">{appointment.phone}</td>
                    <td className="py-3 px-6">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{appointment.appointmentTime}</td>
                    <td className="py-3 px-6">{appointment.message || 'No message'}</td>
                    <td className="py-3 px-6">
                      {/* AI-powered suggestions */}
                      <span className="text-sm text-gray-600">
                        {aiSuggestions(appointment)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
