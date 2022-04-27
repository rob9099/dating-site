const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    datingGender: {
        type: String,
        required: true
    },
    profileBio: {
        type: String,
    },
    employment: {
        type: String,
    },
    hobbies: {
        type: Array,
    },
    profileImage: {
        type: Array,
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    }
});

const User = mongoose.model("User", profileSchema)
module.exports = User