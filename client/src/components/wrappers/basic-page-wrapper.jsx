import React from "react"


/*
    components
*/

export default ({title = "Unnamed Page", children}) => (
    <>
        <header>
            <h1 >{title}</h1>
        </header>
        <main>
            {children}
        </main>
        <footer>
            &copy; sierra
        </footer>
    </>
)
