const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true,
    },
    groupalRoom: {
        type: Boolean,
        default: false,
    },
    // members: [String],
    members: [{
        type: new mongoose.Schema({
            username: {
                type: String,
                required: true,
            },
            joinedAt: {
                type: Date,
                default: Date.now(),
            },
        })
    }],
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;