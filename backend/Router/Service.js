const express=require("express");
const ServiceRouter=express.Router();
const OBJ=require("../Controller/Service.js")


ServiceRouter.post("/Save",OBJ.SaveData)
ServiceRouter.get("/Get",OBJ.GetAboutData)
ServiceRouter.put("/Update/:id",OBJ.UpdateAboutData)
ServiceRouter.delete("/Delete/:id",OBJ.DeleteAboutData)

module.exports=ServiceRouter;
