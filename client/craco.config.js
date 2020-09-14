// Craco
const fastRefresh = require("craco-fast-refresh")

// PostCSS
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const precss = require("precss")
const purgecss = require("@fullhuman/postcss-purgecss")

const postcss = {
    plugins: [precss(), tailwindcss("./src/styles/tailwind.js"), autoprefixer],
}

if (process.env.NODE_ENV === "production") {
    postcss.plugins.push(
        purgecss({
            content: ["./src/**.jsx"],
            defaultExtractor: (content) =>
                content.match(/[A-Za-z0-9-_:/]+/g) || [],
        })
    )
}

module.exports = {
    style: {
        postcss: postcss,
    },

    plugins: [{ plugin: fastRefresh }],
}
