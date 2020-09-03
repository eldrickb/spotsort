import React from "react"
import { user } from "models"
import { connect } from "react-redux"

/*
    components
*/

const PageWrapper = (props) => (
    <>
        <header>
            <p>hi, {props.user.me.display_name}</p>
            <h1>{props.title}</h1>
        </header>
        <main>{props.children}</main>
        <footer>&copy; sierra</footer>
    </>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(PageWrapper)
