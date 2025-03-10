const express=require("express");
const ApplicationRouter=express.Router();
const obj= require("../Controller/Application")

ApplicationRouter.post("/Save/:id",obj.SaveApplication);
ApplicationRouter.get("/Get",obj.GetApplication);
ApplicationRouter.put("/Update/:id",obj.UpdateApplicationWithStatus);
module.exports=ApplicationRouter;