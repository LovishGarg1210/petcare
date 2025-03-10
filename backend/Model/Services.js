const mongoose=require("mongoose")
const ServiceSchema=new mongoose.Schema({
    heading:{type:String,required:true},
    paragraph:{type:String,required:true},
    image:{type:String,required:true,default:null}
});

const Servicedata=mongoose.model('Service',ServiceSchema);

module.exports=Servicedata;
