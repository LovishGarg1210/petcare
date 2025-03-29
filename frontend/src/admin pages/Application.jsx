import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com'; // Import EmailJS

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch application data from API
  useEffect(() => {
    applicationData();
  }, []);

  const applicationData = async () => {
    try {
      const response = await axios.get("https://petcare-1.onrender.com/Application/Get");
      setApplications(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Send email using EmailJS
  const sendEmail = (email, name, status) => {
    const message = status === 'Accepted'
      ? `Your application has been accepted! The pet will be delivered to you by next Monday.`
      : `We regret to inform you that your application has been rejected. Thank you for your interest.`;

    const templateParams = {
      to_email: email,
      from_name: 'Admin',  // Customize the name as you wish
      message: message,
      user_name: name,
    };

    emailjs.send(
      'service_jyfg39t', // Replace with your Service ID
      'template_nr9im5i', // Replace with your Template ID
      templateParams,
      '1t-3x6N7-qJupnd7z' // Replace with your User ID
    )
    .then(response => {
      console.log('Email sent successfully:', response);
    })
    .catch(error => {
      console.error('Email sending failed:', error);
    });
  };

  // Update the status of an application (for Admin)
  const handleStatusChange = async (e, index, status) => {
    e.preventDefault();
    try {
      const updatedApplications = [...applications];
      updatedApplications[index].status = status;
      console.log(updatedApplications[index]);

      const response = await axios.put(
        `https://petcare-1.onrender.com/Application/Update/${updatedApplications[index]._id}`,
        updatedApplications[index]
      );

      console.log("hahaha", response);
      setApplications(updatedApplications); // Update state without refetching data

      // Send email after status change
      const application = updatedApplications[index];
      const email = application.contact;
      const name = application.name;
      
      // Customize delivery date as needed

      sendEmail(email, name, status);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app =>
    app.petId?.name.toLowerCase().includes(search.toLowerCase()) ||
    app.petId?._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 md:ml-64 mt-20 md:mt-16 py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">Admin Dashboard</h2>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or pet"
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table header */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-sm md:text-base">Name</th>
                  <th className="py-3 px-6 text-sm md:text-base">Contact</th>
                  <th className="py-3 px-6 text-sm md:text-base">Pet Id</th>
                  <th className="py-3 px-6 text-sm md:text-base">Pet Name</th>
                  <th className="py-3 px-6 text-sm md:text-base">Reason</th>
                  <th className="py-3 px-6 text-sm md:text-base">Experience</th>
                  <th className="py-3 px-6 text-sm md:text-base">Home</th>
                  <th className="py-3 px-6 text-sm md:text-base">Status</th>
                  <th className="py-3 px-6 text-sm md:text-base">Actions</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Table body with scrollable content */}
          <div className="overflow-x-auto max-h-[400px]">
            <table className="min-w-full">
              <tbody className="bg-gray-100">
                {filteredApplications.map((application, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-sm md:text-base">{application.name}</td>
                    <td className="py-3 px-6 text-sm md:text-base">{application.contact}</td>
                    <td className="py-3 px-6 text-sm md:text-base">{application.petId?._id}</td>
                    <td className="py-3 px-6 text-sm md:text-base">{application.petId?.name}</td>
                    <td className="py-3 px-6 text-sm md:text-base">{application.adoptReason}</td>
                    <td className="py-3 px-6 text-sm md:text-base">{application.adoptExperience}</td>
                    <td className="py-3 px-6 text-sm md:text-base">{application.adoptHome}</td>
                    <td className="py-3 px-6 text-sm md:text-base">
                      <span
                        className={`font-semibold ${application.status === 'Accepted' ? 'text-green-500' : application.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm md:text-base">
                      {(application.status !== 'Accepted' && application.status !== 'Rejected') && (
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
