
import { SpotifyApi } from '@spotify/web-api-ts-sdk';


const scopes = [
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-private",
    "user-read-email"
]

// Choose one of the following:
const sdk = SpotifyApi.withClientCredentials(process.env.CLIENT_ID, process.env.CLIENT_SECRET, ["scope1", "scope2"]);



