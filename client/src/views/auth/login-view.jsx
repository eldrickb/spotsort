import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"

import PageWrapper from "components/wrappers/app-wrapper.jsx"
import LoginHandler from "components/auth/login-button.jsx"

const LoginPage = (state) => {
    // redirect if logged in

    const history = useHistory()

    useEffect(() => {
        if (state.user.loggedIn) {
            history.push("/")
        }
    }, [state.user])

    return (
        <PageWrapper title="Login">
            <LoginHandler></LoginHandler>
        </PageWrapper>
    )
}

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(LoginPage)
