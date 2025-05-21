const mongoose = require('mongoose');

// Appointment Schema
const AppointmentSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    appointmentTime: {
      type: String, // Store time as a string, for example "14:00"
      required: true
    },
    message: {
      type: String,
      trim: true,
      default: ''
    },
    status:{
      type: String,
 
      default: 'Pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Create the Appointment model
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
