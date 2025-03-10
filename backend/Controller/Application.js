const Application = require('../Model/Application')


const SaveApplication = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const response = await Application.create({
            petId: id,...data
        })
        if (!response)
            return res.status(400).json({ message: "Failed to save application data" })
        res.status(201).json({ message: "Application data saved successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const GetApplication = async (req, res) => {
    try {
        const response = await Application.find({})
        .populate('petId', 'name')  // Specify fields to populate from Pet model (example: petName, petType, petAge)
        .exec()
        if (!response)
            return res.status(400).json({ message: "Failed to get application data" })
        res.status(200).json({ data: response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const UpdateApplicationWithStatus = async (req, res) => {
    const { id } = req.params;
    const data=req.body;
    
    try {
        const response = await Application.findByIdAndUpdate(id,data)
        if (!response)
            return res.status(400).json({ message: "Failed to update application data" })
        res.status(200).json({ message: "Application data updated successfully", data: response })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }   
}
module.exports = { SaveApplication, GetApplication, UpdateApplicationWithStatus }

