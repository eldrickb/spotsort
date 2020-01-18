require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")

require("./config/passport-strategy.js")

const authRoutes = require("./routes/auth-routes.js")

const app = express()

// middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(
    cors({
        // TODO: dynamic origin for production variable
        origin: "localhost:3000",
    })
)

app.use(express.json())

// db
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

// routes
app.use("/auth", authRoutes)

// start
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`app now listening for requests on port ${PORT}`)
)
