const PetModel = require("../Model/Pets");
const cloudinary = require("cloudinary").v2;
const path=require("path");
const SavePet = async (req, res) => {
    try {
        let filename="nopic.jpg";
        if(req.files!=null)
        {
            filename=req.files.image.name;
            var filepath=path.join(__dirname,"..","uploads",filename);
            req.files.image.mv(filepath);
            console.log(filepath);
            await cloudinary.uploader.upload(filepath).then(function(result){
                filename=result.url;
            })
        }
        req.body.image=filename;
        const response=await PetModel.create(req.body);
        if (!response)
            return res.status(400).json({ message: "Failed to save pet data" });
        res.json({ message: "Pet data saved successfully" ,data:response});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const GetPets = async (req, res) => {
    try {
        const response = await PetModel.find({});
        if (!response)
            return res.status(404).json({ message: "No pet data found" });
        res.json({ message: "Pet data fetched successfully", data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const GetPetById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await PetModel.findById(id);
        if (!response)
            return res.status(404).json({ message: "No pet data found with this ID" });
        res.json({ message: "Pet data fetched successfully", data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const UpdatePetById = async (req, res) => {
    const id = req.params.id;

console.log(req.files);
    try {
        let filename="nopic.jpg";
        if(req.files!=null)
        {
            filename=req.files.image.name;
            var filepath=path.join(__dirname,"..","uploads",filename);
            req.files.image.mv(filepath);
            console.log(filepath);
            await cloudinary.uploader.upload(filepath).then(function(result){
                filename=result.url;
            })
        }
        req.body.image=filename;
        const data=req.body;
        const response = await PetModel.findByIdAndUpdate(id, data, { new
        : true });  
        if (!response)
            return res.status(404).json({ message: "No pet data found with this ID" });
        res.json({ message: "Pet data updated successfully", data: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const DeletePetById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await PetModel.findByIdAndDelete(id);
        if (!response)
            return res.status(404).json({ message: "No pet data found with this ID" });
        res.json({ message: "Pet data deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    SavePet, GetPets, GetPetById, UpdatePetById, DeletePetById
}
