const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    // Reference to the Category model
    required: true,
  },
  image: {
    type: String,  // URL to the uploaded image or file path
    default: null,
  },
}, 
{
  timestamps: true,  // Automatically adds createdAt and updatedAt
});

const PetModel = mongoose.model('Pet', PetSchema);
module.exports=PetModel;
