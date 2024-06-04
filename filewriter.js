const fs = require("node:fs")




const writeLog = (data) => {
    fs.writeFile("out.json", data, err => console.err)
}

module.exports = writeLog