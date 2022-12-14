const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authUserSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { _id: false });

authUserSchema.pre("save", async function (next) {
    const user = this;
    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;
    next();
});

authUserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const authUserModel = mongoose.model("User", authUserSchema);

module.exports = authUserModel;