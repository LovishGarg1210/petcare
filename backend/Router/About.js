const express=require("express");
const AboutRouter=express.Router();
const OBJ=require("../Controller/About")


AboutRouter.post("/Save",OBJ.SaveData)
AboutRouter.get("/Get",OBJ.GetAboutData)
AboutRouter.put("/Update/:id",OBJ.UpdateAboutData)
AboutRouter.delete("/Delete/:id",OBJ.DeleteAboutData)

module.exports=AboutRouter;
