import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import emailjs from 'emailjs-com';

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    applicationData();
  }, []);

  const applicationData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Application/Get");
      setApplications(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (e, index, status) => {
    e.preventDefault();
    const updatedApplications = [...applications];
    const application = updatedApplications[index];

    try {
      // Update backend status
      await axios.put(
        `http://localhost:4000/Application/Update/${application._id}`,
        { ...application, status }
      );

      // Send email
     

      // Update local state
      updatedApplications[index].status = status;
      setApplications(updatedApplications);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const filteredApplications = applications.filter(app =>
    app.petId?.name.toLowerCase().includes(search.toLowerCase()) ||
    app.petId?._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 md:ml-64 mt-20 md:mt-16 py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">Pet Applications</h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or pet"
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Contact</th>
                  <th className="py-3 px-6">Pet Id</th>
                  <th className="py-3 px-6">Pet Name</th>
                  <th className="py-3 px-6">Reason</th>
                  <th className="py-3 px-6">Experience</th>
                  <th className="py-3 px-6">Home</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="overflow-x-auto max-h-[400px]">
            <table className="min-w-full">
              <tbody className="bg-gray-100">
                {filteredApplications.map((application, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{application.name}</td>
                    <td className="py-3 px-6">{application.contact}</td>
                    <td className="py-3 px-6">{application.petId?._id}</td>
                    <td className="py-3 px-6">{application.petId?.name}</td>
                    <td className="py-3 px-6">{application.adoptReason}</td>
                    <td className="py-3 px-6">{application.adoptExperience}</td>
                    <td className="py-3 px-6">{application.adoptHome}</td>
                    <td className="py-3 px-6 font-semibold">
                      <span
                        className={`${
                          application.status === 'Accepted'
                            ? 'text-green-500'
                            : application.status === 'Rejected'
                            ? 'text-red-500'
                            : 'text-yellow-500'
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {application.status !== 'Accepted' &&
                        application.status !== 'Rejected' && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={(e) => handleStatusChange(e, index, 'Accepted')}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 text-xs md:text-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={(e) => handleStatusChange(e, index, 'Rejected')}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 text-xs md:text-sm"
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
        </div>
      </div>
    </div>
  );
};

export default Application;
