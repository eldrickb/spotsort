import React from "react"


/*
    components
*/
import PageWrapper from "../components/wrappers/basic-page-wrapper.jsx"
import LoginHandler from "../components/auth/login-handler.jsx"

export default () => (
    <PageWrapper title="Home">
        <LoginHandler></LoginHandler>
    </PageWrapper>
)
