import React from "react"
import { connect } from "react-redux"

import UserArea from "components/user/user-area.jsx"
import TestPanel from "components/test-panel.jsx"

import styles from "styles/components/wrappers/app-wrapper.module.css"

const PageWrapper = (props) => (
    <div className={styles.this}>
        <header>
            <div className={styles.location}>
                <span>SpotSort</span>
                <div className={styles.divider}></div>
                <span className={styles.pageTitle}>{props.title}</span>
            </div>

            <UserArea />
        </header>
        <main>{props.children}</main>

        <TestPanel />
    </div>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(PageWrapper)
