const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    spotifyId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})

const User = mongoose.model("user", userSchema)

module.exports = User
