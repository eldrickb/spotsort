const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const signJwt = (payload) => {
    return jwt.sign(JSON.stringify(payload), jwtSecret)
}

module.exports = { signJwt }
