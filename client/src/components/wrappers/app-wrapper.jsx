import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import styles from "styles/components/wrappers/app-wrapper.module.css"

const UserStatus = ({ user }) => (
    <div className="user-status">
        {user.loggedIn ? (
            <p>Hi, {user.me.display_name}</p>
        ) : (
            <p>
                <Link to="/login">Login Here</Link>
            </p>
        )}
    </div>
)

const PageWrapper = (props) => (
    <div className={styles.this}>
        <header>
            <div className={styles.location}>
                <span>SpotSort</span>
                <div className={styles.divider}></div>
                <span className={styles.pageTitle}>{props.title}</span>
            </div>

            <UserStatus user={props.user} />
        </header>
        <main>{props.children}</main>

        <footer>&copy; eldrick</footer>
    </div>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(PageWrapper)
