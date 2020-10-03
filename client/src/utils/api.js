import axios from "axios"
import config from "./config.js"
import store from "index.jsx"

const { API_URL } = config
// const { dispatch } = store

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("failure")

        // on 401 unauthorized
        if (error.config && error.response && error.response.status === 401) {
            console.log("401 failure, attempting refresh...")

            let refreshRequest

            try {
                // try to refresh auth token
                refreshRequest = await api.get("/auth/refreshAccessToken")

                // if success, retry the request
                console.log("refreshed")
                // return api.request(error.config)
            } catch (refreshError) {
                // if that doesn't work, logout and redirect to login
                if (refreshError.response.status === 401) {
                    console.log("failed twice")
                    // store.dispatch.reset()
                }
            }

            // return (
            //     api
            //         .get("/auth/refreshAccessToken")
            //         .then((data) => {
            //             // retry if success
            //             console.log("refreshed")
            //             return api.request(error.config)
            //         })
            //         // if that doesn't work, logout and redirect to login
            //         .catch((refreshError) => {
            //             if (refreshError.response.status === 401) {
            //                 console.log("failed twice")
            //                 store.dispatch.reset()
            //                 return
            //             }
            //         })

            // )
        }
    }
)

export default api
