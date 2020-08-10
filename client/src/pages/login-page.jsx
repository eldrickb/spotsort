import React from "react"

/*
    css
*/
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

/*
    components
*/
import PageWrapper from "components/wrappers/basic-page-wrapper.jsx"
import LoginHandler from "components/auth/login-handler.jsx"

export default () => (
    <PageWrapper title="Home">
        <LoginHandler></LoginHandler>
    </PageWrapper>
)
