const passport = require("passport")
const SpotifyStrategy = require("passport-spotify").Strategy

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy

const { User, findOrCreateUser } = require("../models/user-model.js")

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

            delete user.refreshToken

            user.payload = jwt.sign(
                JSON.stringify({
                    accessToken,
                }),
                jwtSecret
            )

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
                return done(null, { accessToken: jwtPayload.accessToken })
            } else {
                return done(null, false)
            }
        }
    )
)
