import React from "react"
import { connect } from "react-redux"

import PageWrapper from "../components/wrappers/app-wrapper.jsx"

const HomePage = (props) => (
    <PageWrapper title="Home">
        <p>Home page.</p>
    </PageWrapper>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(HomePage)