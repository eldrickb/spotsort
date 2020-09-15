const express = require("express")
const router = express.Router()
const passport = require("passport")

const apiBuilder = require("../config/spotifyApiBuilder.js")

// api builder for each route
const useApi = (req) =>
    new apiBuilder().setAccessToken(req.user.accessToken).build()

// get user profile
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let api = useApi(req)

        api.getMe().then((apiRes) => res.json(apiRes.body))
    }
)

// get user songs
router.get(
    "/songs",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let api = useApi(req)
        api.getMySavedTracks().then((apiRes) => res.json(apiRes.body))
    }
)

router.get(
    "/playlists",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let api = useApi(req)
        api.getUserPlaylists().then((apiRes) => res.json(apiRes.body))
    }
)


module.exports = router
