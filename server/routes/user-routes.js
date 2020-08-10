const express = require("express")
const router = express.Router()
const passport = require("passport")

const apiBuilder = require("../config/spotify-api.js")

// api builder for each route
const useApi = (req) => new apiBuilder().setAccessToken(req.user.accessToken).build()


// get user profile
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        let api = useApi(req)

        api.getMe().then(_ => res.json(_.body))

    }
)

module.exports = router
