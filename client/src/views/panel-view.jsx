import React from "react"

import PageWrapper from "components/wrappers/app-wrapper.jsx"
import SongsPane from "components/songs/songs-pane.jsx"
import PlaylistsPane from "components/playlists/playlists-pane.jsx"

import styles from "styles/views/panel-view.module.css"

const PanelView = () => {
    return (
        <PageWrapper title="Panel">
            <div className={styles.this}>
                <SongsPane className={styles.songs}></SongsPane>
                <PlaylistsPane className={styles.playlists}></PlaylistsPane>
            </div>
        </PageWrapper>
    )
}

export default PanelView
