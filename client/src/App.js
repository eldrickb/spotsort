// main
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Route, Link } from "react-router-dom"

// css
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

// socket
import io from "socket.io-client"
// import { API_URL } from "./utils/config.js"
const API_URL = "localhost:3001"
const socket = io(API_URL, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
})

// components

export default () => (
    <>
        <LoginHandler></LoginHandler>
    </>
)

const LoginHandler = () => {
    const [user, setUser] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [popup, setPopup] = useState(null)

    useEffect(() => {
        socket.on("user", user => {
            console.log(user)
            setUser(user)
            popup.close()
        })
    }, [popup])

    // popup shit

    // interval to check to re-enable login if popup closed without auth
    const checkPopup = () => {
        const check = setInterval(() => {
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                setDisabled(false)
            }
        }, 1000)
    }

    // opens popup that starts auth on server
    const openPopup = () => {
        const width = 600,
            height = 600
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2
        const url = `${API_URL}/auth/spotify/?socketId=${socket.id}`

        return window.open(
            url,
            "",
            `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
        )
    }

    // starts the whole thang
    const startAuth = e => {
        if (!disabled) {
            e.preventDefault()
            setPopup(openPopup())
            checkPopup()
            setDisabled(true)
        }
    }

    const closeCard = () => {
        setUser({})
    }

    return (
        <div>
            {user ? (
                <div>{user.display_name}</div>
            ) : (
                <button onClick={startAuth.bind(this)}>
                    click here 2 auth w spotify
                </button>
            )}
        </div>
    )
}
