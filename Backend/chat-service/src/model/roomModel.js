const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    admin: {
        type: Array,
        required: true
    },
    isGroupalRoom: {
        type: Boolean,
        default: false,
    },
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
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;