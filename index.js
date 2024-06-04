
const { SpotifyApi } = require('@spotify/web-api-ts-sdk');
const bodyParser = require("body-parser")
const express = require("express")
require('dotenv').config()

const fw = require("./filewriter.js")

// Initial express stuff 
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const scopes = [
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-private",
    "user-read-email"
]

// Choose one of the following:
const sdk = SpotifyApi.withClientCredentials(process.env.CLIENT_ID, process.env.CLIENT_SECRET, scopes);

const test = async () => {
    const items = await sdk.search("The Beatles", ["artist"]);

    const parsed = JSON.stringify(items)
    console.log(parsed)

    fw(parsed)

}

test();



