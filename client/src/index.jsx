import React from "react"
import ReactDOM from "react-dom"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

import "styles/normalize.css"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)
