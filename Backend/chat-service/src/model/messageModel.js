const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sendBy: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
        ref: "Room",
    },
    isScribble: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;