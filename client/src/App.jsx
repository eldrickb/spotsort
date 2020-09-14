import React from "react"
import { Switch, Route } from "react-router-dom"

// pages
import HomePage from "pages/home-page.jsx"
import LoginPage from "pages/login-page.jsx"


import AuthLoginRedirectPage from "pages/auth/login-redirect-page.jsx"



// components


const App = () => (
    <div className="outer" >
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
    </div>
)


export default App
