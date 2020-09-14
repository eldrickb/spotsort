import React from "react"
import { user } from "models"
import { connect } from "react-redux"

import style from "styles/global.module.css"

const PageWrapper = (props) => (
    <div className={style.this}>
        <header className={style.outer}>
            {props.user.loggedIn && (
                <p>hi, {props.user.me.display_name}</p>
            )}
            <h1>{props.title}</h1>
        </header>
        <main>{props.children}</main>
        <footer>&copy; sierra</footer>
    </div>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(PageWrapper)
