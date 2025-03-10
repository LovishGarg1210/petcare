const Servicedata=require("../Model/Services")
var cloudinary=require("cloudinary")
const path=require("path")
const SaveData=async(req,res)=>{
    try{
        
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
 

    req.body.image=filename; //a

       
        const response=await  Servicedata.create(req.body);
          
        if(!response)
            return res.status(400).json({message:"Failed to save about data"})
        res.status(201).json({message:"About data saved successfully"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const GetAboutData=async(req,res)=>{
    try{
        const response=await Servicedata.find({});
        if(!response)
            return res.status(404).json({message:"No about data found"})
        res.status(200).json({
            message:"About data fetched successfully",
            data:response
        })
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const UpdateAboutData = async (req, res) => {
    const id = req.params.id;
    
  
  
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
 

    req.body.image=filename; //a
    const data = req.body;
      // Correct the syntax: Update the Aboutdata using the passed parameters
      const response = await Servicedata.findByIdAndUpdate(
        id,data
        // Use the `new` option to return the updated document
      );
  
      if (!response) {
        return res.status(404).json({ message: "About data not found" });
      }
  
      res.status(200).json(response); // Send back the updated data
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const DeleteAboutData=async(req,res)=>{
    const id=req.params.id;
    try{
        const response=await Servicedata.findByIdAndDelete(id);
        if(!response)
            return res.status(404).json({message:"About data not found"})
        res.status(200).json({message:"About data deleted successfully"})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={
    SaveData,
    GetAboutData,
    UpdateAboutData,
    DeleteAboutData
}