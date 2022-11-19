const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    // icon: {
    //     type: String,
    //     required: true,
    // },
    groupalRoom: {
        type: Boolean,
        default: false,
    },
    // creator: {
    //     type: new mongoose.Schema({
    //         username: {
    //             type: String,
    //             required: true
    //         }
    //     })
    // },
    // members: [String],
    members: [{
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true,
                unique: true,
            },
            username: {
                type: String,
                required: true,
            },
            joinedAt: {
                type: Date,
                default: Date.now(),
            },
        }, { _id: false })
    }],
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;