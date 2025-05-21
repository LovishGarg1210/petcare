// Model/PetModals.js
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petName: {
    type: String,
   
    trim: true,
   
  },
  petType: {
    type: String,
   
    default: 'Other'
  },
  breed: {
    type: String,
   
   
  },
  age: {
    type: String,
    required:true,
    
  },
  gender: {
    type: String,
    
   
    default: 'Unknown'
  },
  price: {
    type: Number,
   
  },
  description: {
    type: String,
    
 
   
  },
  imagePath: {
    type: String,

  },

  health: {
    vaccinated: {
      type: Boolean,
      default: false
    },
    dewormed: {
      type: Boolean,
      default: false
    },
    neutered: {
      type: Boolean,
      default: false
    }
  },
  sellerInfo: {
    name: {
      type: String,
     
     
    },
    phone: {
      type: String,
     
     
    },
    email: {
      type: String,
     
      
    },
    location: {
      type: String,
     
     
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.models.Sellpet || mongoose.model('Sellpet', PetSchema);