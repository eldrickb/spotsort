const express = require("express")
const router = express.Router()
const passport = require("passport")

// should go somethin like

// get user songs
router.get(
    "/user-songs",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.end()
    }
)

module.expots = router
