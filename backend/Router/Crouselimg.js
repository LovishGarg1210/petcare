const expres=require("express")
const Crouselrouter=expres.Router();

const obj=require("../Controller/Crouselimg")

Crouselrouter.post("/Save",obj.SaveCrouselImage)
Crouselrouter.get("/Get",obj.GetCrouselImages)
Crouselrouter.delete("/Delete/:id",obj.DeleteCrouselImage)
Crouselrouter.put("/Update/:id",obj.UpdateCrouselImage)

module.exports=Crouselrouter;
//     UpdateCrouselImage,