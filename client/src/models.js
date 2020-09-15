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
    },

    effects: (dispatch) => ({
        async getSongs() {
            const songs = await api.get("/user/songs")

            dispatch.data.setSongs(songs.data.items)
        },

        async getPlaylists() {
            const playlists = await api.get("/user/playlists")

            dispatch.data.setPlaylists(playlists.data)
        },
    }),
}