const mongoose = require("mongoose");
const SignupSchema = new mongoose.Schema({
    Name: {
        type: String,
        
        trim: true,
    },
    Email: {
        type: String,
       
    },
    Contact: {
        type: Number,
        
    },
     GoogleId: { type: String },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    Password: {
        type: String,
      
    },
    Address: [
        {

            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },

        }
    ],
    LoginAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

const Signupdata = mongoose.model('Signup', SignupSchema);

module.exports = Signupdata;