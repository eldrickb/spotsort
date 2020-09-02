import React from "react"
import { Link } from "react-router-dom"

/*
    components
*/
import PageWrapper from "../components/wrappers/basic-page-wrapper.jsx"

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
        <Link to="/login">Login Here</Link>
    </PageWrapper>
)
