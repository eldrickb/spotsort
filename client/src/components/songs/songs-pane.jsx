import React, { useEffect } from "react"
import { connect } from "react-redux"

import SongItem from "./song-item.jsx"

const SongsPane = (props) => {


    useEffect(() => {
        if (props.songs === undefined) props.getSongs()
    }, [])
    
    return (
        <div className={props.className}>
            <div className="songs">
                {props.songs &&
                    props.songs.map(({ track }, i) => (
                        <SongItem track={track} key={i} />
                    ))}
            </div>
        </div>
    )
}

const mapState = (state) => ({
    songs: state.data.songs,
})

const mapDispatch = (dispatch) => ({
    getSongs: () => dispatch.data.getSongs(),
})


export default connect(mapState, mapDispatch)(SongsPane)
