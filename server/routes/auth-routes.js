const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

const generateUserToken = (req, res) => {
    const { spotifyId } = req.user

    const payload = {
        spotifyId,
    }

    // sign token
    const accessToken = jwt.sign(JSON.stringify(payload), jwtSecret)

    res.cookie("jwt", accessToken, { httpOnly: true })
    res.status(200).send({ spotifyId })
}

// logout view
router.get("/logout", (req, res) => {
    req.logout()
    res.clearCookie("jwt")
    res.end()
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
        session: false,
    })
)

// spotify auth callback
router.get(
    "/spotify/redirect",
    passport.authenticate("spotify", { session: false }),
    generateUserToken
)

module.exports = router

/*

router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.write("AUTHORIZED FAM")

        res.write("\n\ncookie\n " + JSON.stringify(req.cookies))

        res.write("\n\nuser\n " + JSON.stringify(req.user))
        res.end()
    }
)

*/
