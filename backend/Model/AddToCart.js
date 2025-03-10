const mongoose = require("mongoose");

// Define the Schema for Cart
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productQuantity:{type:Number,default:1},
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  products: [productSchema], // Array of product items
});

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
