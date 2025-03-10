const mongoose = require('mongoose');

// Define the schema for the Product
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,  // You can store the URL of the image here
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the model based on the schema
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
