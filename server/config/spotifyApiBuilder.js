const SpotifyWebApi = require("spotify-web-api-node")

const clientCredentials = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

class apiBuilder {

    constructor()   {
        this.api = new SpotifyWebApi({
            clientId: clientCredentials.clientId,
            clientSecret: clientCredentials.clientSecret
        })

        return this
    }

    setAccessToken(token) {
        this.api.setAccessToken(token)
        return this
    }

    build() {
        return this.api
    }
}

module.exports = apiBuilder
