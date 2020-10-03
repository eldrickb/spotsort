import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import config from "utils/config.js"
import { connect } from "react-redux"

const { API_URL } = config
const relocationLink = "/"

const LoginButton = (props) => {
    // TODO: add these to rematch
    const [disabled, setDisabled] = useState(false)
    // const [popup, setPopup] = useState(null)

    // prepare for redirect
    const history = useHistory()

    // opens popup that starts auth on server
    const openPopup = () => {
        const width = 600
        const height = 600
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2
        const url = `${API_URL}/auth/spotify`

        const popup = window.open(
            url,
            "",
            `
                toolbar=no, location=no, directories=no, status=no, menubar=no,
                scrollbars=no, resizable=no, copyhistory=no, width=${width},
                height=${height}, top=${top}, left=${left}
            `
        )

        const onMessageReceived = (e) => {
            window.removeEventListener("message", onMessageReceived)

            props.getProfile()

            history.push(relocationLink)
        }

        window.addEventListener("message", onMessageReceived)
    }

    // starts the whole thang
    const startAuth = (e) => {
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

const mapState = (state) => ({})

const mapDispatch = (dispatch) => ({
    getProfile: dispatch.user.getProfile,
})

export default connect(mapState, mapDispatch)(LoginButton)
