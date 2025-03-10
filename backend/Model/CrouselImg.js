const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Image Schema
const CrouselSchema = new Schema(
  {
    Url: {
      type: String,
      required: true, // URL where the image file is stored
    },
    caption: {
      type: String,
      required: false, // Optional caption for the image
      maxlength: 255, // Limit caption length
    },
   
  },
  {
    timestamps: true, // Mongoose will automatically create createdAt and updatedAt fields
  }
);

// Create Model from the Schema
const CrouselImage = mongoose.model('Image', CrouselSchema);

module.exports = CrouselImage;
