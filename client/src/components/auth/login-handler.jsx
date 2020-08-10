// main
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Route, Link, useHistory } from "react-router-dom"
import config from "utils/config.js"

import { actions } from "store.js"

// css
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

const {API_URL} = config
const relocationLink = "/"

export default () => {

    // TODO: add these to rematch
    const [disabled, setDisabled] = useState(false)
    const [popup, setPopup] = useState(null)

    // popup shit
    let history = useHistory()

    // opens popup that starts auth on server
    const openPopup = () => {
        const width = 600
        const height = 600
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2
        const url = `${API_URL}/auth/spotify`

        let popup = window.open(
            url,
            "",
            `
                toolbar=no, location=no, directories=no, status=no, menubar=no,
                scrollbars=no, resizable=no, copyhistory=no, width=${width},
                height=${height}, top=${top}, left=${left}
            `
        )

        let onMessageRecieved = () => {

            console.log("goteem")

            actions.getUserDetails()
            history.push(relocationLink)

            window.removeEventListener("message", onMessageRecieved)
        }

        window.addEventListener("message", onMessageRecieved)

    }

    // starts the whole thang
    const startAuth = e => {
        if (!disabled) {
            e.preventDefault()
            openPopup()
            setDisabled(true)
        }
    }

    return (
        <div>
            <button onClick={startAuth.bind(this)}>
                click here 2 auth w spotify
            </button>
        </div>
    )
}
