const passport = require("passport")
const SpotifyStrategy = require("passport-spotify").Strategy
const User = require("../models/user-model.js")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    new SpotifyStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/spotify/redirect",
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
            // TODO: move to User.findOrCreate method
            console.log(profile)

            User.findOne({ spotifyId: profile.id })
                .then(thisUser => {
                    if (thisUser) {
                        // if user found
                        console.log("user is: ", thisUser)
                        done(null, thisUser)
                    } else {
                        // if not, create new user
                        new User({
                            spotifyId: profile.id,
                            username: profile.username,
                            display_name: profile.displayName,
                            email: profile._json.email,
                        })
                            .save()
                            .then(newUser => {
                                console.log("new user crated: " + newUser)
                                done(null, newUser)
                            })
                    }
                })
                .catch(console.log)
        }
    )
)
