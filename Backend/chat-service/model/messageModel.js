const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    sendBy: {
        type: String,
        required: true,
    },
    // receiver: {
    //     type: String,
    //     required: true,
    // },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room",
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now(),
    // }

}, { timestamps: true });

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;