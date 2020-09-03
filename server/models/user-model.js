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
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: String,
        required: false,
    },
})

const User = mongoose.model("user", userSchema)

/**
 * Utility to handle finding or creating a user
 * @param {Object} searchCondition Conditions to seartch with
 * @param {Object} createCondition
 */
// TODO: move to static ?
const findOrCreateUser = (searchCondition, createCondition) => {
    let user

    try {
        user = User.findOne(searchCondition)

        if (!user) {
            user = new User(createCondition).save()
        }
    } catch (err) {
        throw new Error(err)
    }

    return user
}

module.exports = { User, findOrCreateUser }
