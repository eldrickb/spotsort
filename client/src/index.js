import React from "react"
import ReactDOM from "react-dom"
import "./utils/styles/tailwind.out.css"
import App from "./App"
import {BrowserRouter} from "react-router-dom"


// store
import { connect, Provider, actions } from "store.js"
ReactDOM.render(

    <Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)
