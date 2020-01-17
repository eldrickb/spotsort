const dotenv = require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")

require("./config/passport-strategy.js")

const app = express()

// import routes
const authRoutes = require("./routes/auth-routes.js")

// middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

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
app.get("/", (req, res) => {
    res.send("welcome home fam")
})
app.use("/auth", authRoutes)

// start
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`app now listening for requests on port ${PORT}`)
)
