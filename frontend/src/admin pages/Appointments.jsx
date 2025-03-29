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
      setAppointments(response.data); // Assuming the API returns an array of appointments
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 w-full md:ml-64 md:mt-16  py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-black mb-8">
          Admin Appointment Dashboard
        </h2>

        {/* Search Input */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={handleSearch}
            className="w-full md:w-1/3 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
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
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Owner Name</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Email</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Phone</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Appointment Date</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Appointment Time</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Message</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">{appointment.ownerName}</td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">{appointment.email}</td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">{appointment.phone}</td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">{appointment.appointmentTime}</td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">{appointment.message || 'No message'}</td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">
                      {/* AI-powered suggestions */}
                      <span className="text-xs md:text-sm text-gray-600">
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
