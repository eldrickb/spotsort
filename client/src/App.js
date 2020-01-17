// main
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Route, link } from "react-router-dom"

// css
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

// components

export default () => {
    let [user, setUser] = useState(null),
        [loggedIn, setLoggedIn] = useState(false)

    // refresh user on first render
    // useEffect(() => {
    //     this.getUser()
    // })
    //
    // let getUser = () => {
    //     axios.get("/user")
    // }

    return <a href="http://localhost:3001/auth/spotify">Login here fam</a>
}
