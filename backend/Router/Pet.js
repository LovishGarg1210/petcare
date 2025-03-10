const express=require('express')
const PetRouter=express.Router();
const obj=require('../Controller/Pets')

PetRouter.post('/save',obj.SavePet)

PetRouter.get('/get',obj.GetPets)

PetRouter.put('/update/:id',obj.UpdatePetById)

PetRouter.delete('/delete/:id',obj.DeletePetById)

module.exports=PetRouter;
