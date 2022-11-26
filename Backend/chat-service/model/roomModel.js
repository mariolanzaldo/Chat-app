const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: {
        username: String,
        // required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now(),
    }
}, { _id: false });

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    creator: {
        type: Object,
        required: true
    },
    // icon: {
    //     type: String,
    //     required: true,
    // },
    groupalRoom: {
        type: Boolean,
        default: false,
    },
    // members: [String],
    members: [{
        type: new mongoose.Schema({
            username: {
                type: String,
                unique: true,
                required: true,
            },
            joinedAt: {
                type: Date,
                default: Date.now(),
            },
        }, { _id: false }),
    }],
    // members: [memberSchema],
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;