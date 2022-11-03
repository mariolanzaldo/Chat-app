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
    contactList: [{
        type: String,
        default: [],
        required: false,
    }],
    rooms: [{
        type: new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            name: {
                type: String,
                required: true,
            },
        }, { _id: false }),
        required: false,
    }],
}, { timestamps: true, _id: false });

const userServiceModel = mongoose.model("Users", userSchema);

module.exports = userServiceModel;