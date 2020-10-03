import React from "react"
import { connect } from "react-redux"

import styles from "styles/components/test-panel.module.css"

const TestPanel = (props) => {
    const testAuthFailure = () => {
        console.log(props.tryFail())
    }
    const refreshAccessToken = () => {
        console.log(props.refreshAccessToken())
    }

    return (
        <div className={styles.this}>
            <span onClick={testAuthFailure}>Test Auth Failure</span>
            <span onClick={refreshAccessToken}>Refresh Auth Token</span>
        </div>
    )
}

const mapState = (state) => ({})

const mapDispatch = (dispatch) => ({
    tryFail: dispatch.session.tryFail,
    refreshAccessToken: dispatch.session.refreshAccessToken,
})

export default connect(mapState, mapDispatch)(TestPanel)
