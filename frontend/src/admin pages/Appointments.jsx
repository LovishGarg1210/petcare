import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/Appointment/Get');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:4000/Appointment/postStatus/${id}`, {
        status: newStatus
      });
      if (response.status === 200) {
        const updated = appointments.map(app =>
          app._id === id ? { ...app, status: newStatus } : app
        );
        setAppointments(updated);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const aiSuggestions = (appointment) => {
    return appointment.message && appointment.message.includes('check') ? 'Follow up on concerns' : 'No immediate action';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 w-full md:ml-64 md:mt-16 mt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-black mb-8">
          Doctor Appointments
        </h2>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={handleSearch}
            className="w-full md:w-1/3 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Date</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Time</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Message</th>
                  <th className="py-3 px-2 md:px-6 text-xs md:text-base">Status</th>
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
                      <span className={`font-semibold ${appointment.status === 'Accepted' ? 'text-green-500' : appointment.status === 'Rejected' ? 'text-red-500' : 'text-yellow-600'}`}>
                        {appointment.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-2 md:px-6 text-xs md:text-base">
                      {(appointment.status !== 'Accepted' && appointment.status !== 'Rejected') && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(appointment._id, 'Accepted')}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appointment._id, 'Rejected')}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
