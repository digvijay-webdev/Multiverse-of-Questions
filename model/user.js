const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// User Schema
const userSchema = new Schema({
    isVerified: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        maxlength: 14,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        maxlength: 14,
        minlength: 2,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        maxlength: 28,
        minlength: 9,
        trim: true,
        unique: true
    },
    securityQuestion: {
        type: String,
        required: [true, "please, provide a security answer"],
        minlength: 2,
        maxlength: 14,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is Required"],
        minlength: 20,
        trim: true
    }
}, { timestamps: true });


// User Modal
const userModel = mongoose.model("User", userSchema);


module.exports = userModel;