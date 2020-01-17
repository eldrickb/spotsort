const express = require("express")
const router = express.Router()
const passport = require("passport")

// login view
router.get("/login", (req, res) => {
    res.send(
        "<a href='/auth/spotify'>login here fam</a><a href='/auth/logout'>logout here</a>"
    )
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/auth/login")
})

// logout view
router.get("/logout", (req, res) => {
    // handle with passport
    req.logout()
    res.redirect("/")
})

// spotify auth routes
router.get(
    "/spotify",
    passport.authenticate("spotify", {
        //
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
    passport.authenticate("spotify", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("http://localhost:3000/")
    }
)

module.exports = router
