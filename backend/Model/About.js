const mongoose=require("mongoose")
const AboutSchema=new mongoose.Schema({
    heading:{type:String,required:true},
    paragraph:{type:String,required:true},
    image:{type:String,required:true,default:null}
});

const Aboutdata=mongoose.model('About',AboutSchema);

module.exports=Aboutdata;