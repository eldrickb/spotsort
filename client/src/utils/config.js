export default {
    API_URL: () => {
        return process.env.NODE_ENV === "production"
            ? "" // TODO: add production URL
            : "https://localhost:8080"
    },
}
