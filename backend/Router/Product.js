const express=require("express");
const ProductRouter=express.Router();
const OBJ=require("../Controller/Product.js")

ProductRouter.post("/Save",OBJ.SaveProduct)
ProductRouter.get("/Get",OBJ.GetProducts)

ProductRouter.put("/Update/:id",OBJ.updateProduct)
ProductRouter.delete("/Delete/:id",OBJ.deleteProduct)   

module.exports=ProductRouter;