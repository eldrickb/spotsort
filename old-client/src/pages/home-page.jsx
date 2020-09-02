import React from "react"
import { Link } from "react-router-dom"

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

let ContextualizedSwitch = state => (
        <>
            {/* {state.loggedIn ?
                <div>
                    Welcome, {state.userDetails.display_name}
                </div>
                :
                <Link to="/login">Login Here</Link>
            } */}
        </>
)
export default () => (
    <PageWrapper title="Home">
    </PageWrapper>
)
