require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const passport = require("passport")
require("./config/passport-strategy.js")

// custom routes
const authRoutes = require("./routes/auth-routes.js")
const userRoutes = require("./routes/user-routes.js")

const PORT = process.env.PORT || 3001

/*
    middleware
*/
app.use(passport.initialize())
app.use(
    cookieParser({
        expires: 24 * 60 * 60 * 1000,
    })
)
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
)
app.use(express.json())

/*
    connect to db
*/
mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("connected to db")
    }
)

/*
    tell app to use routes
*/
app.use("/auth", authRoutes)
app.use("/user", userRoutes)

/*
    good to go baybee
*/
app.listen(PORT, () =>
    console.log(`app now listening for requests on port ${PORT}`)
)
