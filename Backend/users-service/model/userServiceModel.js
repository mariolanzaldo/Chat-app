const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
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
    avatar: {
        type: String,
    },
    contactList: [{
        type: String,
        default: [],
        required: false,
    }],
    rooms: [Object],
    // requests: [{
    //     type: new mongoose.Schema({
    //         from: {
    //             type: String,
    //             required: true
    //         },
    //         accepted: {
    //             type: Boolean
    //         }
    //     })
    // }],
}, { timestamps: true, _id: false });

const userServiceModel = mongoose.model("Users", userSchema);

module.exports = userServiceModel;