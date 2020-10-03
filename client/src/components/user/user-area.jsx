import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import config from "utils/config.js"
import store from "store.js"

import styles from "styles/components/user/user-area.module.css"

const { API_URL } = config
const { dispatch } = store

const logout = (history) => {
    // dispatch clear state
    dispatch({ type: "reset" })

    // redirect to home
    // history.push(`${API_URL}/auth/logout`)
}

const UserDropdown = () => (
    <div className={styles.userDropdown}>
        <span onClick={logout}>Logout</span>
    </div>
)
const UserArea = ({ user }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const history = useHistory()

    const handleDropdown = () => {
        setDropdownVisible(!dropdownVisible)
    }

    const handleLogout = () => {
        handleDropdown()
        logout(history)
    }

    return (
        <div className={styles.this}>
            {user.loggedIn ? (
                <div className={styles.userProfile} onClick={handleDropdown}>
                    <img src={user.me.images[0].url} alt="" />

                    <p>{user.me.display_name}</p>

                    <div className={styles.arrowIcon}></div>
                </div>
            ) : (
                <Link to="/login">Login Here</Link>
            )}

            {dropdownVisible && <UserDropdown />}
        </div>
    )
}

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(UserArea)
