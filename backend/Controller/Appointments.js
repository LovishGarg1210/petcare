const Appointment=require("../Model/Appointments")
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
module.exports={
    SaveAppointment,
    GetAppointments
}