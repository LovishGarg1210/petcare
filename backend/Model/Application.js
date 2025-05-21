const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for pet adoption application
const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  petId: { type: Schema.Types.ObjectId, ref: 'Pet',required: true },

  adoptReason: { type: String, required: true },
  adoptExperience: {
    type: String,
    
    required: true
  },
  adoptHome: {
    type: String,
   
    required: true
  },
  status: {
    type: String,
 
    default: 'Pending'
  },
  email:{
    type:String,
    
  }
},
{
  submittedAt: { type: Date, default: Date.now }
  
});

// Create the Application model
const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
