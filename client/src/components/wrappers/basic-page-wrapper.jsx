import React from "react"

/*
    css
*/
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

/*
    components
*/

export default ({title = "Unnamed Page", children}) => (
    <React.Fragment>
        <header>
            <h1 css={tw`p-12  bg-gray-100 text-4xl font-black`}>{title}</h1>
        </header>
        <main css={tw`mx-24 my-24`}>
            {children}
        </main>
        <footer css={tw`text-gray-400 bg-gray-600 py-6 px-12`}>
            &copy; she/her codes/code
        </footer>
    </React.Fragment>
)
