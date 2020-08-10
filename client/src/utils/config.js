export default {
    API_URL: process.env.NODE_ENV === "production"
        ? "" // TODO: add production URL
        : "http://localhost:3001",
}
