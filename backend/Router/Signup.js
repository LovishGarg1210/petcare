const express=require("express");
const SignupRouter=express.Router();

const obj=require("../Controller/Signup")

SignupRouter.post("/Save",obj.Signup)
SignupRouter.post("/validate",obj.loginuser)
SignupRouter.post("/SaveAddress",obj.SaveAddress)
SignupRouter.get("/Get",obj.getUserProfile)

SignupRouter.put("/Update",obj.updateProfile)
SignupRouter.put("/Update-password",obj.updatePassword)

module.exports=SignupRouter;