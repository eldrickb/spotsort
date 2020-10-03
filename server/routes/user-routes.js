const express = require("express")
const router = express.Router()
const passport = require("passport")

const { useApi } = require("../config/spotifyApiBuilder.js")

// get user profile
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const api = useApi(req)

        api.getMe().then((apiRes) => res.json(apiRes.body))
    }
)

// get user songs
router.get(
    "/songs",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const api = useApi(req)

        api.getMySavedTracks({
            limit: req.query.limit || 50,
            offset: req.query.offset || 0,
        }).then((songsResp) => {
            res.json(songsResp)
        })
    }
)

router.get(
    "/playlists",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const api = useApi(req)
        api.getUserPlaylists().then((apiRes) => res.json(apiRes.body))
    }
)

router.get("/unauthorized", (req, res) => {
    res.status(401).end()
})

module.exports = router
