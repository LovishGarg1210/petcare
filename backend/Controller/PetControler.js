// controllers/petController.js
const Sellpet = require('../Model/PetModals');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail'
  auth: {
    user: "lgarg1210@gmail.com",
    pass:"qdhipacwnzybaqrb"
  }
});

// @desc    Create new pet listing
// @route   POST /api/pets
// @access  Public

// controllers/petController.js

 // Email transporter config

// controllers/petController.js

 // Ensure this is configured

exports.createPet = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    let imageUrl = "nopic.jpg";

    // Image upload handling
    if (req.files && req.files.image) {
      const file = req.files.image;
      const uniqueName = `${Date.now()}-${file.name}`;
      const localPath = path.join(__dirname, "..", "uploads", uniqueName);

      await file.mv(localPath);

      const result = await cloudinary.uploader.upload(localPath);
      imageUrl = result.secure_url;

      fs.unlinkSync(localPath); // Optional: clean up after upload
    }

    // Extract and validate required fields
    const {
      petName,
      petType,
      breed,
      age,
      gender,
      price,
      description,

      healthvaccinated,
      healthdewormed,
    healthneutered,
    sellerInfoname,
    sellerInfocontact,
    sellerInfoemail,
    sellerInfolocation,


     
    } = req.body;
    
    if (
      !petName || !petType || !breed || !age || !gender || !price || !description ||
        !healthvaccinated || !healthdewormed || !healthneutered ||
        !sellerInfoname || !sellerInfocontact || !sellerInfoemail || !sellerInfolocation
      
    ) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newPet = new Sellpet({
      petName,
      petType,
      breed,
      age: Number(age),
      gender,
      price: Number(price),
      description,
      imagePath: imageUrl,
      health: {
        vaccinated: healthvaccinated, 
        dewormed: healthdewormed,
        neutered: healthneutered,
      },
      sellerInfo: {
        name: sellerInfoname,
        phone: sellerInfocontact,
        email: sellerInfoemail,
        location: sellerInfolocation,
      }
    });

    const savedPet = await newPet.save();

    // Send confirmation email
    const mailOptions = {
      from: "lgarg1210@gmail.com",
      to: sellerInfoemail,
      subject: "Pet Listing Confirmation",
      html: `
        <h1>Thank you for listing your pet!</h1>
        <p>Your listing for <strong>${savedPet.petName}</strong> has been successfully submitted.</p>
        <ul>
          <li>Pet Name: ${savedPet.petName}</li>
          <li>Type: ${savedPet.petType}</li>
          <li>Breed: ${savedPet.breed}</li>
          <li>Price: $${savedPet.price}</li>
        </ul>
        <img src="${savedPet.imagePath}" alt="${savedPet.petName}" style="max-width: 300px;">
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, data: savedPet });

  } catch (error) {
    console.error("Error creating pet listing:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// @desc    Get all pet listings
// @route   GET /api/pets
// @access  Public
exports.getPet = async (req, res) => {
  try {
    const pet = await Sellpet.find({});
    if(!pet) {
      return res.status(404).json({
        success: false,
        message: 'No pet listings found'
      });
    }
   
    
  
    
    res.status(200).json({
      success: true,
      count: pet.length,
      data: pet
    });
  } catch (error) {
    console.error('Error fetching pet listings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single pet listing
// @route   GET /api/pets/:id
// @access  Public
// exports.getPet = async (req, res) => {
//   try {
//     const pet = await Pet.findById(req.params.id);
    
//     if (!pet) {
//       return res.status(404).json({
//         success: false,
//         message: 'Pet listing not found'
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: pet
//     });
//   } catch (error) {
//     console.error('Error fetching pet listing:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };

// @desc    Update pet listing
// @route   PUT /api/pets/:id
// @access  Private (would require authentication)
exports.updatePet = async (req, res) => {
  const { status } = req.body;

  try {
    let pet = await Sellpet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet listing not found'
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // ✅ Correct update with { status }
    const updatedPet = await Sellpet.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // ✅ Send notification email
    if (pet.sellerInfo && pet.sellerInfo.email) {
      const mailOptions = {
        from: "lgarg1210@gmail.com",
        to: pet.sellerInfo.email,
        subject: 'Pet Listing Updated',
        html: `
          <h1>Your pet listing has been updated</h1>
          <p>The listing for <strong>${pet.petName}</strong> has been successfully updated to <b>${status.toUpperCase()}</b>.</p>
          <p>plz visit us here and further decisions will be taken here.</p>
          <img src="${pet.imagePath}" alt="${pet.petName}" style="max-width: 300px;">
        `
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({
      success: true,
      data: updatedPet
    });
  } catch (error) {
    console.error('Error updating pet listing:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete pet listing
// @route   DELETE /api/pets/:id
// @access  Private (would require authentication)
// exports.deletePet = async (req, res) => {
//   try {
//     const pet = await Pet.findById(req.params.id);
    
//     if (!pet) {
//       return res.status(404).json({
//         success: false,
//         message: 'Pet listing not found'
//       });
//     }
    
//     // Delete image from Cloudinary
//     if (pet.cloudinaryId) {
//       await cloudinary.uploader.destroy(pet.cloudinaryId);
//     }

//     // Send deletion notification if email exists
//     if (pet.sellerInfo && pet.sellerInfo.email) {
//       const mailOptions = {
//         from: process.env.EMAIL_FROM,
//         to: pet.sellerInfo.email,
//         subject: 'Pet Listing Deleted',
//         html: `
//           <h1>Your pet listing has been deleted</h1>
//           <p>The listing for <strong>${pet.petName}</strong> has been removed from our platform.</p>
//           <p>If you did not request this action, please contact our support team.</p>
//         `
//       };

//       await transporter.sendMail(mailOptions);
//     }
    
//     await pet.deleteOne();
    
//     res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (error) {
//     console.error('Error deleting pet listing:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// };