const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        lowercase: true,
        trim: TextTrackCueList
    },
    password: {
        type: String,
        requried: true,
        minLength: 6
    },
    userRole: {
        type: String,
        requires: true,
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;