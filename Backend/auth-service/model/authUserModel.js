const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // validate(value) {
        //     const valid = validator.isStrongPassword(value, {
        //         minLength: 8,
        //         minLowercase: 1,
        //         minUppercase: 1,
        //         minNumbers: 1,
        //         minSymbols: 1,
        //         returnScore: true,
        //         pointsPerUnique: 1,
        //         pointsPerRepeat: 0.5,
        //         pointsForContainingLower: 10,
        //         pointsForContainingUpper: 10,
        //         pointsForContainingNumber: 10,
        //         pointsForContainingSymbol: 10,
        //     });

        //     if (valid < 50) {
        //         throw new Error('The password must contain at least an uppercase, lowercase, a number, and a symbol');
        //     }
        // }
    }
});

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