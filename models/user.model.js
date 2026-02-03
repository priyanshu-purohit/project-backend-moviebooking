const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        trim: true
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

userSchema.pre('save', async function () {
    //a trigger to encrypt the plain password before saving the user
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;