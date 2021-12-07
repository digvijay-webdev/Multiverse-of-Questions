const mongoose = require("mongoose");
const { isAlpha } = require("validator");
const Schema = mongoose.Schema;

/*
User's _id
question
AnonymousPost
*/

// Questions Schema
const questionsSchema = new Schema({
    _uid: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        maxlength: 14,
        minlength: 2,
        trim: true,
        lowercase: true,
        validate: [isAlpha, "Please use alphabetes only"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        maxlength: 14,
        minlength: 2,
        trim: true,
        lowercase: true,
        validate: [isAlpha, "Please use alphabetes only"]
    },
    question: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 15,
        trime: true,
        lowercase: true,
        unique: true
    },
    isAnonymousPost: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

// Questions Model
const questionsModel = mongoose.model("Questions", questionsSchema);


module.exports = questionsModel;