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
        required: true
    },
    expiresIn: {
        type: String,
        required: false
    }
})


const User = mongoose.model("user", userSchema)


/* functions */

User.findOrCreate = (serachCondition,  createCondition) => {
    return User.findOne(serachCondition).then(user => {
        if (user) {
            return user
        } else {
            return new User(createCondition).save()
        }

    })
}

module.exports = User
