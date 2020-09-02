import React from "react"
import ReactDOM from "react-dom"
import "./utils/styles/tailwind.out.css"
import App from "./App"
import {BrowserRouter} from "react-router-dom"


// store
ReactDOM.render(

        <BrowserRouter>
            <App />
        </BrowserRouter>, 
    document.getElementById("root")
)
