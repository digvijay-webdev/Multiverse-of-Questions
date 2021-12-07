const mongoose = require("mongoose");
const { isEmail, isAlpha, isAlphanumeric } = require("validator");
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
        lowercase: true,
        validate: [isAlpha, "Please, enter a alphabetic value only"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        maxlength: 14,
        minlength: 2,
        trim: true,
        lowercase: true,
        validate: [isAlpha, "Please, enter a alphabetic value only"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        maxlength: 50,
        minlength: 9,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, "Please, enter a valid email"]
    },
    securityQuestion: {
        type: String,
        required: [true, "security answer is required"],
        minlength: 2,
        maxlength: 14,
        trim: true,
        lowercase: true,
        validate: [isAlphanumeric, "invalid security answer"]
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