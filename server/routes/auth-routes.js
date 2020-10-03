const express = require("express")
const router = express.Router()
const passport = require("passport")
const { useApi } = require("../config/spotifyApiBuilder.js")
const { signJwt } = require("../utils/jwt.js")

/*
    utils
*/
const bindPayloadToCookie = (req, res, next) => {
    res.cookie("jwt", req.user.payload, { httpOnly: true, maxAge: 86400000 })
    next()
}

/*
    refresh auth token
 */
router.get(
    "/refreshAccessToken",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        const api = useApi(req)

        console.log("refresh request received, attempting to refresh")

        api.refreshAccessToken()
            // if refresh successful,
            // refresh cookie with new access token
            .then((data) => {
                req.user.payload = signJwt({
                    accessToken: data.body["access_token"],
                    refreshToken: req.user.refreshToken,
                })

                console.log(
                    `old: ${req.user.accessToken}; new: ${data.body["access_token"]}`
                )
                next()
            })

            // if refresh failed
            .catch((err) => {
                console.log("refresh failed")
                next(err)
            })
    },
    bindPayloadToCookie
)

/*
    logout route
*/
router.get("/logout", (req, res) => {
    req.logout()
    res.clearCookie("jwt")
    res.redirect(`${process.env.CLIENT_URL}`)
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
