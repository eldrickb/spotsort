import React, { useEffect } from "react"

import styles from "styles/components/songs/song-item.module.css"

const AlbumImage = ({ images }) => {
    useEffect(() => {
        if (images) {
            images.sort((first, second) =>
                first.height < second.height ? -1 : 1
            )
        }
    }, [])

    return <img src={images[0].url} alt="" />
}

// TODO reduce all artists into string
const SongItem = ({ track }) => {
    return (
        <div className={styles.this}>
            <div className={styles.firstCol}>
                <div className={styles.art}>
                    <AlbumImage images={track.album.images}></AlbumImage>
                </div>

                <div className={styles.primaryInfo}>
                    <p className={styles.songName}>{track.name}</p>
                    <p>{track.artists[0].name}</p>
                </div>
            </div>

            <div className={styles.secondCol}>
                <div className={styles.secondaryInfo}>
                    <p>{track.album.name}</p>
                </div>
            </div>
        </div>
    )
}

export default SongItem
