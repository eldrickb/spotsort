require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")
const session = require("express-session")
const http = require("http")
const socketio = require("socket.io")

require("./config/passport-strategy.js")

const authRoutes = require("./routes/auth-routes.js")

const app = express()
const server = http.Server(app)

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
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)

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

// socketio setup
const io = socketio(server)
app.set("io", io)

// start
const PORT = process.env.PORT || 3001
server.listen(PORT, () =>
    console.log(`app now listening for requests on port ${PORT}`)
)
