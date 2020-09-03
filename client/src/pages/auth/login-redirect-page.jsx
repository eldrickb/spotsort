import React, { useEffect } from "react"

export default () => {
    useEffect(() => {
        // get the URL parameters which will include the auth token
        const params = window.location.search
        if (window.opener) {
            // send them to the opening window
            window.opener.postMessage(params)

            // close the popup
            window.close()
        }
    }, [])

    return <p>hol up a sec...</p>
}
