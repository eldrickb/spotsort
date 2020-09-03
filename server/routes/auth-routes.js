const express = require("express")
const router = express.Router()
const passport = require("passport")

/*
    utils
*/
const bindPayloadToCookie = (req, res, next) => {
    res.cookie("jwt", req.user.payload, { httpOnly: true, maxAge: 3600000 })
    next()
}

/*
    logout route
*/
router.get("/logout", (req, res) => {
    req.logout()
    res.clearCookie("jwt")
    res.end()
})

/*
    initial spotify rouets
*/
router.get(
    "/spotify",
    passport.authenticate("spotify", {
        scope: [
            "user-read-email",
            "user-read-private",
            "user-library-read",
            "playlist-read-private",
        ],
        session: false,
        showDialog: true,
    })
)

/*
    spotify auth callback
*/
router.get(
    "/spotify/redirect",

    passport.authenticate("spotify", {
        session: false,
        failureRedirect: "/spotify-failed",
        showDialog: true,
    }),
    bindPayloadToCookie,
    (req, res) =>
        res.redirect(`${process.env.CLIENT_URL}/client-redirect/spotify`)
)

module.exports = router
