import React from "react"
import ReactDOM from "react-dom"
import "./utils/styles/tailwind.out.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)
