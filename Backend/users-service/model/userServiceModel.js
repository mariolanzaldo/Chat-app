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
    contactList: [{ type: String, default: [], required: false }],
    // contactList: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    // }],
    // groupList: {
    //     type: Object,
    //     default: [],
    // }
    // avatar: {
    //  type:    
    // }
}, { timestamps: true });

const userServiceModel = mongoose.model("Users", userSchema);

module.exports = userServiceModel;