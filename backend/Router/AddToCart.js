const express=require("express");
const CartRouter=express.Router();
const obj=require("../Controller/AddToCart");    
CartRouter.post("/Add",obj.addToCart);

CartRouter.get("/Get",obj.getCart);
CartRouter.put("/Update",obj.updateCart);

CartRouter.post("/Delete",obj.removeProductFromCart);

module.exports=CartRouter;  