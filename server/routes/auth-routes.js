const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user-model.js")

// logout view
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
}

const emitUser = (req, res) => {
    const io = req.app.get("io")
    console.log("finna emit " + req.user)
    io.in(req.session.socketId).emit("user", req.user)
    res.end()
}

// spotify auth routes
router.get(
    "/spotify",
    addSocketIdtoSession,
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
router.get("/spotify/redirect", passport.authenticate("spotify"), emitUser)

module.exports = router
