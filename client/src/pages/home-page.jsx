import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import PageWrapper from "../components/wrappers/basic-page-wrapper.jsx"

const HomePage = (props) => (
    <PageWrapper title="Home">
        
        {props.user.loggedIn ? (
            <div>Welcome, {props.user.me.display_name}</div>
        ) : (
            <Link to="/login">Login Here</Link>
        )}
    </PageWrapper>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(HomePage)