const passport = require("passport")
const SpotifyStrategy = require("passport-spotify").Strategy

const { signJwt } = require("../utils/jwt.js")
const jwtSecret = process.env.JWT_SECRET
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy

const { findOrCreateUser } = require("../models/user-model.js")

/*
    spotify strat
*/
passport.use(
    new SpotifyStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/spotify/redirect",
        },
        (accessToken, refreshToken, expires_in, profile, done) => {
            let user = findOrCreateUser(
                { spotifyId: profile.id },
                {
                    spotifyId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    email: profile._json.email,
                    refreshToken: refreshToken,
                    expiresIn: expires_in,
                }
            )

            console.log("strat refresh token" + refreshToken)

            user.payload = signJwt({
                accessToken,
                refreshToken,
            })

            delete user.refreshToken

            done(null, user)
        }
    )
)

/*
    jwt strat (for authenticated routes)
*/
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: (req) => {
                if (req && req.cookies) return req.cookies["jwt"]
                else return null
            },
            secretOrKey: jwtSecret,
        },
        (jwtPayload, done) => {
            if (jwtPayload.accessToken) {
                return done(null, {
                    accessToken: jwtPayload.accessToken,
                    refreshToken: jwtPayload.refreshToken,
                })
            } else {
                return done(null, false)
            }
        }
    )
)
