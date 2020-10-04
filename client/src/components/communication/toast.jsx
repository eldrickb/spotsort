import React from "react"
import { connect } from "react-redux"

import styles from "styles/components/communication/toast.module.css"

const Toast = (props) => {
    return (
        <div className={styles.this}>
            <p>{props.toast}</p>

            <div className={styles.clearButton} onClick={props.clearToast}>
                ✗
            </div>
        </div>
    )
}

const mapState = (state) => ({
    toast: state.communication.toast,
})

const mapDispatch = (dispatch) => ({
    clearToast: dispatch.communication.clearToast,
})

export default connect(mapState, mapDispatch)(Toast)
