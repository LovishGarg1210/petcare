const mongoose = require("mongoose");
const SignupSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Contact: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    Password: {
        type: String,
        required: true,
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