const express=require("express");
const SignupRouter=express.Router();

const obj=require("../Controller/Signup")

SignupRouter.post("/Save",obj.verifyAndSignup)
SignupRouter.post("/verifyotp",obj.sendVerificationCodeForRegister)
SignupRouter.post("/validate",obj.loginuser)
SignupRouter.post("/SaveAddress",obj.SaveAddress)
SignupRouter.get("/Get",obj.getUserProfile)

SignupRouter.put("/Update",obj.updateProfile)
SignupRouter.put("/Update-password",obj.updatePassword)
SignupRouter.post("/GoogleSave",obj.Signupwithgoogle)
SignupRouter.post("/GoogleLogin",obj.googleLogin)
SignupRouter.post("/resetPassword",obj.resetPassword)
SignupRouter.post("/sendVerificationCode",obj.sendVerificationCode)

module.exports=SignupRouter;