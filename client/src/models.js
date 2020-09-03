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
            newState.me = payload.data

            return newState
        },
    },

    effects: (dispatch) => ({
        async getProfile() {
            console.log("dispatched")

            const profile = await api.get("/user/profile")

            dispatch.user.setUser(profile)
        },
    }),
}
