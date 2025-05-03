const Signupdata = require('../Model/Signup');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const Signup = async (req, res) => {
  try {
    const { Name, Email, Contact, Password, Address } = req.body;
    const user = await Signupdata.findOne({ Email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    


    await Signupdata.create({ Name, Email, Contact, Password, Address });
    res.status(201).json({ user });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const loginuser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await Signupdata
      .findOne({ Email });

    if (!user)
      return res.status(400).json({ message: "User not Found" })

    // if (Password == user.Password)
    //   return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "lovish", {
      expiresIn: "1h"
    })

    res.status(200).json({ message: "Login successful", data: { token, Email, role: user.role } });

  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }

}
// Assuming you have a User model


// Controller for updating email and password
// userController.js

// Adjust the path to your model

// Controller function to update the password
const updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await Signupdata.findOne({ Email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password is correct (plaintext comparison)
    if (currentPassword !== user.Password) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Directly update the user's password (without hashing)
    user.Password = newPassword;  // Update the password field with the new password

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Server error' });
  }
};





// Save Address
const SaveAddress = async (req, res) => {
  const { email, address } = req.body;

  if (!email || !address) {
    return res.status(400).json({ message: "Email and address are required." });
  }

  try {
    // Find user by email and update address
    let user = await Signupdata.findOne({ "Email": email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // If user exists, update their address
      user.Address = address;
    }

    await user.save();

    res.json({ success: true, message: "Address saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to save address." });
  }
};




const getUserProfile = async (req, res) => {
  try {
    const { email } = req.query; // Extract email from query parameters

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find the user by email
    const user = await Signupdata.findOne({ Email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user profile data (excluding sensitive information like password)
    const { Name, Email, Contact, Address } = user;
    res.status(200).json({
      user: {
        Name,
        Email,
        Contact,
        Address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { email, Name, Contact, Address } = req.body;

    // Ensure all required fields are provided
    if (!email || !Name || !Contact) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user by email
    const user = await Signupdata.findOne({ Email: email });

    // If user does not exist, send error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    user.Name = Name;
    user.Contact = Contact;

    // Check if Address is provided and is an array
    if (Address && Array.isArray(Address)) {
      user.Address = Address;
    } else if (Address) {
      // If Address is provided but not an array, convert it to an array
      user.Address = [Address];
    }

    // Save the updated user document
    await user.save();

    // Respond with updated user data (excluding sensitive information)
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        Name: user.Name,
        Email: user.Email,
        Contact: user.Contact,
        Address: user.Address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};


module.exports = { Signup, loginuser, SaveAddress, getUserProfile, updateProfile, updatePassword };


