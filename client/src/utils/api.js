import axios from "axios"
import config from "./config.js"
let { API_URL } = config


export default axios.create({
    baseURL: API_URL,
    withCredentials: true
});
