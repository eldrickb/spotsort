import React from "react"
import { connect } from "react-redux"

const PlaylistsPane = (props) => {
    return (
        <div className={props.className}>
            <p>Playlists pane</p>
        </div>
    )
}

const mapState = (state) => {
    return {
        playlists: state.playlists,
    }
}

export default connect(mapState)(PlaylistsPane)
