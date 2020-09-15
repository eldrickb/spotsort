import React from "react"
import { connect } from "react-redux"

const SongsPane = (props) => {
    return (
        <div className={props.className}>
            <p>Songs pane</p>
        </div>
    )
}

const mapState = (state) => {
    return {
        songs: state.songs,
    }
}

export default connect(mapState)(SongsPane)
