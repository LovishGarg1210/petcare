const Cart = require("../Model/AddToCart");

// Add product to cart
const addToCart = async (req, res) => {
  const { emailId, productId, productName, productPrice, productImage } = req.body;

  try {
    
    if (!emailId) {
      return res.status(400).json({ message: "Email ID is required" });
    }

    let cart = await Cart.findOne({ emailId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ emailId, products: [] });
    }

    const productIndex = cart.products.findIndex((product) => product.productId === productId);

    if (productIndex === -1) {
      // Add product if not already in the cart
      cart.products.push({ productId, productName, productPrice, productImage });
    } else {
      // Optionally, you can update the quantity here
      cart.products[productIndex].quantity = (cart.products[productIndex].quantity || 0) + 1;
    }

    // Save cart to the database
    await cart.save();
    return res.status(200).json({ message: "Product added to cart successfully!" });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    return res.status(500).json({ message: "Server error while adding product to cart" });
  }
};

// Other cart-related functionalities could be here as additional methods
// For example, get the cart or remove a product from the cart

const getCart = async (req, res) => {
  const { emailId } = req.query;
  console.log(emailId)

  try {
    const cart = await Cart.findOne({ emailId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({data:cart});
  } catch (err) {
    console.error("Error fetching cart:", err);
    return res.status(500).json({ message: "Error fetching cart" });
  }
};
// Backend: cartController.js
const updateCart = async (req, res) => {
    const { emailId, products } = req.body;
  
    try {
      const cart = await Cart.findOne({ emailId });
      
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Update the products in the cart
      cart.products = products;
      await cart.save();
  
      return res.status(200).json({ message: "Cart updated successfully" });
    } catch (err) {
      console.error("Error updating cart:", err);
      return res.status(500).json({ message: "Error updating cart" });
    }
  };
  
  const removeProductFromCart = async (req, res) => {
    const { emailId, productId } = req.body;

    try {
        // Find the cart using the emailId
        const cart = await Cart.findOne({ emailId: emailId });

        // If no cart is found for the emailId, return an error
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the product by productId
        const updatedProducts = cart.products.filter((product) => product.productId !== productId);

        // If no product was removed, return an error message
        if (updatedProducts.length === cart.products.length) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update the cart's products list
        cart.products = updatedProducts;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: "Product removed from cart successfully!" });
    } catch (err) {
        console.error("Error removing product from cart:", err);
        return res.status(500).json({ message: "Server error while removing product from cart" });
    }
};

// Export all functions as an object
module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeProductFromCart,
};
