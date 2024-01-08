const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    type: { type: Boolean, default: false },
    password: String
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;