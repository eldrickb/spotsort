import api from "./utils/api"
import config from "./utils/config"

export const user = {
    state: {
        loggedIn: false,
        me: {
            display_name: "",
        },
    },

    reducers: {
        setUser(state, payload) {
            const newState = { ...state }

            newState.loggedIn = true
            newState.me = payload

            return newState
        },
    },

    effects: (dispatch) => ({
        async getProfile() {
            const profile = await api.get("/user/profile")

            dispatch.user.setUser(profile.data)
        },
    }),
}

export const data = {
    state: {
        songs: undefined,
        totalSongs: -1,
        playlists: {},
    },

    reducers: {
        setSongs(state, payload) {
            const newState = { ...state }

            newState.songs = payload

            return newState
        },
        setPlaylists(state, payload) {
            const newState = { ...state }

            newState.playlists = payload

            return newState
        },
        setTotalSongs(state, payload) {
            const newState = { ...state }

            newState.totalSongs = payload

            return newState
        },
    },

    effects: (dispatch) => ({
        async getSongs() {
            let songs = []
            let total = 0
            let offset = 0

            // communicate fetching started
            dispatch.communication.setFetchingStatus("songs")

            // set offset
            await api
                .get("/user/songs?limit=1")
                .then((resp) => resp.data.body)
                .then((data) => {
                    // console.log(data.total)
                    total = data.total
                })

            dispatch.data.setTotalSongs(total)

            // get all songs
            // TODO remove soft limit
            while (offset < 70) {
                // fetch next songs
                const nextSongs = await api.get(`/user/songs?offset=${offset}`)

                // add songs, update offset
                nextSongs.data.body.items.forEach((song) => {
                    songs.push(song)
                    offset++
                })

                // communicate progress
                dispatch.communication.setProgress({
                    current: offset,
                    finished: total,
                })
            }

            // set songs
            dispatch.data.setSongs(songs)

            // communicate fetching finished
            dispatch.communication.setFetchingStatus(undefined)
        },

        async getPlaylists() {
            const playlists = await api.get("/user/playlists")

            dispatch.data.setPlaylists(playlists.data)
        },
    }),
}

export const communication = {
    state: {
        toast: undefined,
        fetching: undefined,
        progress: {},
    },

    reducers: {
        throwToast(state, payload) {
            const newState = { ...state }
            newState.toast = payload
            return newState
        },
        clearToast(state) {
            const newState = { ...state }
            newState.toast = undefined
            return newState
        },
        setFetchingStatus(state, payload) {
            const newState = { ...state }

            newState.fetching = payload

            return newState
        },

        setProgress(state, payload) {
            const newState = { ...state }

            newState.progress = payload

            return newState
        },
    },
}

export const session = {
    state: {},

    reducers: {},
    effects: (dispatch) => ({
        async tryFail() {
            return await api.get("/user/unauthorized")
        },

        async refreshAccessToken() {
            return await api.get("/auth/refreshAccessToken")
        },
    }),
}
