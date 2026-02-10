const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { USER_ROLE, USER_STATUS } = require('../utils/constants');

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
        required: true,
        enum: {
            values: [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN, USER_ROLE.SELLER],
            message: '{VALUE} is not a valid role'
        },
        default: USER_ROLE.CUSTOMER
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.APPROVED, USER_STATUS.PENDING, USER_STATUS.BLOCKED],
            message: '{VALUE} is not a valid status'
        },
        default: USER_STATUS.APPROVED
    }
}, {timestamps: true});

userSchema.pre('save', async function () {
    //a trigger to encrypt the plain password before saving the user
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

/**
 * this is goind to be an instance method for user, to compare a password
 * with the stores encrypted password
 * @param plainPassword ->input password given by user in sign in request
 * @returns -> boolean denoting whether passwords are same or not?
 */
userSchema.methods.isValidPassword = async function (plainPassword) { 
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;