const express = require("express")
const router = express.Router()
const passport = require("passport")

const jwtSecret = process.env.JWT_SECRET

const generateUserToken = (req, res) => {
    const { spotifyId } = req.user

    const payload = {
        spotifyId,
    }

    // sign token
    const accessToken = jwt.sign(JSON.stringify(payload), jwtSecret)

    res.cookie("jwt", accessToken, { httpOnly: true })
    res.status(200).send({ username })
}

// logout view
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

// initial spotify auth
router.get(
    "/spotify",
    passport.authenticate("spotify", {
        scope: [
            // user
            "user-read-email",
            "user-read-private",

            // library
            "user-library-read",

            // playlist
            "playlist-read-private",
        ],
    })
)

// spotify auth callback
router.get(
    "/spotify/redirect",
    passport.authenticate("spotify"),
    generateUserToken
)

module.exports = router
