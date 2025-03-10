import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios

const AppointmentPage = () => {
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      ownerName,
      email,
      phone,
      appointmentDate,
      appointmentTime,
      message,
    };

    try {
      // Send data to backend using axios
      const response = await axios.post("https://petcare-1.onrender.com/Appointment/Save", appointmentData);
      console.log("Appointment booked:", response.data);
      alert(`Appointment for ${ownerName} has been booked!`);
      // Optionally clear the form after successful submission
      setOwnerName('');
      setEmail('');
      setPhone('');
      setAppointmentDate('');
      setAppointmentTime('');
      setMessage('');
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("There was an error booking your appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Left side image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://media.istockphoto.com/id/1205349166/photo/veterinarian-doctor-examining-a-puppy.jpg?s=612x612&w=0&k=20&c=YELBq_IHNQzD9fy_8fqj6mZq56NsRlJ5F4K9ws6FXD4="
            alt="Vet Appointment"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </motion.div>

        {/* Right side form */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-semibold text-black mb-4 text-center">Book an Appointment</h2>
          <p className="text-xl text-gray-600 mb-6 text-center">
            Fill out the form below to schedule an appointment with one of our veterinarians.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="ownerName" className="text-lg font-medium text-gray-700">Owner Name</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Appointment Date */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="appointmentDate" className="text-lg font-medium text-gray-700">Appointment Date</label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Appointment Time */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="appointmentTime" className="text-lg font-medium text-gray-700">Appointment Time</label>
              <input
                type="time"
                id="appointmentTime"
                name="appointmentTime"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-lg font-medium text-gray-700">Additional Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific concerns?"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 mt-6 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Schedule Appointment
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentPage;
