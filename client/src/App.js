
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Switch, Route } from "react-router-dom"
import config from "./utils/config.js"

// css
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"


// pages
import HomePage from "pages/home-page.jsx"
import LoginPage from "pages/login-page.jsx"

import AuthLoginRedirectPage from "pages/auth/login-redirect-page.jsx"

// components

const Session = React.createContext(null)

// let User = ({userDetails}) => <p>Hi, {userDetails.display_name}!</p>
// User = connect(({userDetails}) => ({userDetails}))(User)

const App = () => (

    <Switch>
        <Route path="/login">
            <LoginPage></LoginPage>
        </Route>

        {/* auth routes */}
        <Route path="/client-redirect/spotify">
            <AuthLoginRedirectPage></AuthLoginRedirectPage>
        </Route>

        <Route path="/">
            <HomePage></HomePage>
        </Route>
    </Switch>

)


export default App
