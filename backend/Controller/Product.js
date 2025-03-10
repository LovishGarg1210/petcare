const Product = require('../Model/Product');

const cloudinary = require('cloudinary').v2;
const path=require("path")

const SaveProduct = async (req, res) => {
    
   
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
      const response=await Product.create(req.body);
        if (!response)
            return res.status(400).json({ message: "Failed to save product data" });
        res.json({ message: "Product data saved successfully" ,data:response});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const GetProducts = async (req, res) => {
    try {
        const response = await Product.find({});
        if (!response)
            return res.status(404).json({ message: "No product data found" });
        res.json({
            message: "Product data fetched successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
const updateProduct = async (req, res) => {
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
  req.body.image=filename;
  const data = req.body;
        const response = await Product.findByIdAndUpdate
        (id, data, { new: true });

        if (!response)
            return res.status(404).json({ message: "No product data found with this ID" });
        res.json({ message: "Product data updated successfully", data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Product.findByIdAndDelete(id);
        if (!response)
            return res.status(404).json({ message: "No product data found with this ID" });
        res.json({ message: "Product data deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    SaveProduct, GetProducts, updateProduct, deleteProduct
}
  