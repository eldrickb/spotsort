import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import SongItem from "./song-item.jsx"

const SongsPane = (props) => {
    const [fetching, setIsFetching] = useState(false)

    useEffect(() => {
        if (props.songs === undefined) props.getSongs()
    }, [])

    const refetch = () => props.getSongs

    const Content = () => {
        if (props.fetching && props.fetching == "songs") {
            // render progress
            return (
                <>
                    <p>Rendering in progress...</p>
                    <p>
                        {props.progress.current} of {props.progress.finished}
                    </p>
                </>
            )
        } else {
            if (props.songs) {
                return props.songs.map(({ track }, i) => (
                    <SongItem track={track} key={i} />
                ))
            } else {
                return (
                    <p>
                        No songs found.
                        <span onClick={refetch}>Fetch them?</span>
                    </p>
                )
            }
        }
    }

    return (
        <div className={props.className}>
            <div className="songs">
                <Content></Content>
            </div>
        </div>
    )
}

const mapState = (state) => ({
    songs: state.data.songs,
    totalSongs: state.data.totalSongs,
    fetching: state.communication.fetching,
    progress: state.communication.progress,
})

const mapDispatch = (dispatch) => ({
    getSongs: () => dispatch.data.getSongs(),
})

export default connect(mapState, mapDispatch)(SongsPane)
