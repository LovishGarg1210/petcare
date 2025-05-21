const Application = require('../Model/Application')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lgarg1210@gmail.com',
    pass: 'qdhipacwnzybaqrb' // Use App Password if using Gmail
  }
});


const SaveApplication = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const response = await Application.create({
            petId: id,...data
        })
        if (!response)
            return res.status(400).json({ message: "Failed to save application data" })
        res.status(201).json({ message: "Application data saved successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const GetApplication = async (req, res) => {
    try {
        const response = await Application.find({})
        .populate('petId', 'name')  // Specify fields to populate from Pet model (example: petName, petType, petAge)
        .exec()
        if (!response)
            return res.status(400).json({ message: "Failed to get application data" })
        res.status(200).json({ data: response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const UpdateApplicationWithStatus = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const response = await Application.findByIdAndUpdate(id, data, { new: true });
    if (!response) {
      return res.status(400).json({ message: "Failed to update application data" });
    }

    let mailOptions;

    if (response.status === "Accepted") {
      mailOptions = {
        from: "lgarg1210@gmail.com",
        to: response.email,
        subject: 'Pet Adoption Application Update',
        html: `
          <h2>Congratulations, ${response.name}!</h2>
          <p>Your application has been <strong>accepted</strong> for the next step.</p>
          <p>Our team will visit your place to ensure it's a suitable environment for the pet.</p>
          <p>Please be available for a short visit. After that, we will proceed with the adoption process.</p>
        `
      };
    } else if (response.status === "Rejected") {
      mailOptions = {
        from: "lgarg1210@gmail.com",
        to: response.email,
        subject: 'Pet Adoption Application Update',
        html: `
          <h2>Dear ${response.name},</h2>
          <p>We regret to inform you that your application has been <strong>rejected</strong>.</p>
          <p>Thank you for your interest in adopting a pet. Please feel free to apply again in the future.</p>
        `
      };
    }

    // ✅ Only send email if mailOptions was created
    if (mailOptions) {
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({
      message: "Application data updated successfully",
      data: response
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { SaveApplication, GetApplication, UpdateApplicationWithStatus }

