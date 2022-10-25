const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,

    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    contactList: [{
        type: String,
        default: [],
        required: false,
    }],
    rooms: [{
        type: String,
        default: [],
        required: false
    }],
}, { timestamps: true });

const userServiceModel = mongoose.model("Users", userSchema);

module.exports = userServiceModel;