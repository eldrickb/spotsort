const passport = require("passport")
const SpotifyStrategy = require("passport-spotify").Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy

const User = require("../models/user-model.js")

const jwtSecret = process.env.JWT_SECRET

// spotify strat
passport.use(
    new SpotifyStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/spotify/redirect",
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
            // TODO: move to User.findOrCreate method for cleanliness

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

// jwt strat (we sessionless baybee)
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: req => req.cookies.jwt,
            secretOrKey: jwtSecret,
        },
        (jwtPayload, done) => {
            // TODO: token expiry (handled by cookie parser?)
            // TODO: what should this pass? (user info?)

            return done(null, jwtPayload)
        }
    )
)
