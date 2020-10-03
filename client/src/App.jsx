import React from "react"
import { connect } from "react-redux"
import { Switch, Route } from "react-router-dom"

// pages
import HomeView from "views/home-view.jsx"
import LoginView from "views/auth/login-view.jsx"
import AuthLoginRedirectView from "views/auth/login-redirect-view.jsx"
import PanelView from "views/panel-view.jsx"

// components

const App = (props) => (
    <div className="outer">
        <Switch>
            <Route path="/login">
                <LoginView></LoginView>
            </Route>

            {/* auth routes */}
            <Route path="/client-redirect/spotify">
                <AuthLoginRedirectView></AuthLoginRedirectView>
            </Route>

            <Route path="/">
                {props.user.loggedIn ? (
                    <PanelView></PanelView>
                ) : (
                    <HomeView></HomeView>
                )}
            </Route>
        </Switch>
    </div>
)

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(App)
