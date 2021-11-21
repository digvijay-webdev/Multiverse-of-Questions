const mongoose = require("mongoose");
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
    question: {
        type: String,
        required: true,
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