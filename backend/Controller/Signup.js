const Signupdata = require('../Model/Signup');



const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
let verificationCodes = {}; // Temporary store; use Redis for production
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lgarg1210@gmail.com",      // replace with your email
    pass: "qdhipacwnzybaqrb",         // replace with your app password
  },
});
// Generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();
// Send OTP to email
const sendVerificationCodeForRegister = async (req, res) => {
  const { Email } = req.body;

  if (!Email) return res.status(400).json({ message: "Email is required" });

  // Check if user already exists
  const userExists = await Signupdata.findOne({ Email });
  if (userExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const otp = generateCode();
  verificationCodes[Email] = otp;

  // Send email
  const mailOptions = {
    from: "lgarg1210@gmail.com",
    to: Email,
    subject: "Email Verification OTP",
    html: `<p>Your verification OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email" });

    // Expire OTP after 5 minutes
    setTimeout(() => {
      delete verificationCodes[Email];
    }, 5 * 60 * 1000);

  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

const verifyAndSignup = async (req, res) => {
  try {
    const { Name, Email, Contact, Password, Code } = req.body;

    if (!Name || !Email || !Contact || !Password || !Code) {
      return res.status(400).json({ message: "All fields including OTP are required" });
    }

    // Check OTP
    const storedOtp = verificationCodes[Email];
    if (!storedOtp || storedOtp !== Code) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create user
    const newUser = await Signupdata.create({ Name, Email, Contact, Password });
    delete verificationCodes[Email]; // Clear OTP after success
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route to handle Google Signup
const Signupwithgoogle= async (req, res) => {
  try {
    const { Name, Email, GoogleId } = req.body;

    // Check if the user already exists
    let existingUser = await Signupdata.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists", user: existingUser });
    }

    // Create a new user
    const newUser = new Signupdata({
      Name,
      Email,
      GoogleId,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered via Google", user: newUser });
  } catch (error) {
    console.error("Google Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginuser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await Signupdata
      .findOne({ Email });

    if (!user)
      return res.status(400).json({ message: "User not Found" })
    if (!user.Password) {
      return res.status(403).json({ message: "This account uses Google Sign-In. Use Google to log in." });
    }

    if (Password !== user.Password)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "lovish", {
      expiresIn: "1h"
    })

    res.status(200).json({ message: "Login successful", data: { token, Email, role: user.role } });

  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }

}
// POST /Signup/googlelogin
const googleLogin = async (req, res) => {
  const { Name, Email, GoogleId } = req.body;

  try {
    let user = await Signupdata.findOne({ Email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.GoogleId !== GoogleId) {
      return res.status(403).json({ message: "Google ID does not match" });
    }
    // If the user exists and Google ID matches, generate a token
     const token = jwt.sign({ id: user._id }, "lovish", {
      expiresIn: "1h"
    })


    res.status(200).json({ message: "Google login successful",  data: { token, Email, role: user.role } });
  } catch (err) {
    console.error("Google login failed", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Signupdata.findOne({ Email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = generateCode();
    verificationCodes[email] = code;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lgarg1210@gmail.com", // replace with your Gmail
        pass: "qdhipacwnzybaqrb",    // use app password
      },
    });

    const mailOptions = {
      from: "lgarg1210@gmail.com",
      to: email,
      subject: "Reset Your Password",
      text: `Your password reset code is: ${code}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Verification code sent" });
  } catch (err) {
    console.error("Send Code Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  try {
    if (verificationCodes[email] !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    const user = await Signupdata.findOne({ Email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.Password = newPassword; // Update password directly
    await user.save();

    delete verificationCodes[email];

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
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


module.exports = { resetPassword,sendVerificationCode,verifyAndSignup,sendVerificationCodeForRegister, loginuser, SaveAddress, getUserProfile, updateProfile, updatePassword ,Signupwithgoogle ,googleLogin};


