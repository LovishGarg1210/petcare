var mongoose=require("mongoose")
// const databasename="pet"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n MongoDB CONNECT Successfully!!!!! Host:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB CONECTION FAILD", error);
        process.exit(1);
    }
}

module.exports = connectDB;