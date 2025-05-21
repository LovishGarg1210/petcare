const Appointment=require("../Model/Appointments")
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lgarg1210@gmail.com',
    pass: 'qdhipacwnzybaqrb' // Use App Password if using Gmail
  }
});
const SaveAppointment=async(req,res)=>{
    try{
        const appointment=new Appointment(req.body)

        await appointment.save()
        res.status(201).send(appointment)
        
    }
    catch(e){
        res.status(400).send(e)
    }
}

const GetAppointments=async(req,res)=>{
    try{
        const appointments=await Appointment.find({})
        res.status(200).send(appointments)
    }
    catch(e){
        res.status(400).send
    }
}
// Update appointment status



// Setup transporter (use your real email credentials or env variables)


const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Compose the message
    let subject = `Appointment ${status}`;
    let userMessage = '';
    let docMessage = '';

    if (status === 'Accepted') {
      userMessage = `Dear ${updated.ownerName},\n\nYour appointment request has been accepted. Please arrive on the scheduled date: ${updated.appointmentDate} at ${updated.appointmentTime} at this address{ghjwefgjsg}.\n\nWe will check further details to ensure you are a suitable pet owner. Please visit us for the next steps.\n\nThank you!`;
      docMessage = `Doctor,\n\nYou have a new confirmed appointment with ${updated.ownerName} on ${updated.appointmentDate} at ${updated.appointmentTime}. Please prepare accordingly.\n\nRegards,\nPet Care Team`;
    } else if (status === 'Rejected') {
      userMessage = `Dear ${updated.ownerName},\n\nWe regret to inform you that your appointment request has been rejected.\n\nThank you for your interest.`;
      docMessage = `Doctor,\n\nThe appointment with ${updated.ownerName} has been rejected.\n\nRegards,\nPet Care Team`;
    }

    // Send email to user
    await transporter.sendMail({
      from: 'lgarg1210@gmail.com',
      to: updated.email,
      subject,
      text: userMessage
    });

    // Send email to doctor (you can fetch doctor email dynamically if needed)
    await transporter.sendMail({
      from: 'lgarg1210@gmail.com',
      to: 'lgarg1210@gmail.com', // Replace with actual doctor email or fetch from DB
      subject,
      text: docMessage
    });

    res.status(200).json({ message: 'Status updated & email sent', data: updated });
  } catch (error) {
    console.error('Error updating appointment or sending email:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports={
    SaveAppointment,
    GetAppointments,updateAppointmentStatus
}