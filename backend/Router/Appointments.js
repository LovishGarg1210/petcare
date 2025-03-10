const express=require("express");
const AppointmentRouter=express.Router();
const OBJ=require("../Controller/Appointments.js")

AppointmentRouter.post("/Save",OBJ.SaveAppointment)

AppointmentRouter.get("/Get",OBJ.GetAppointments)
module.exports=AppointmentRouter;