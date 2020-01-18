// main
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Route, Link } from "react-router-dom"

// css
import styled from "@emotion/styled"
import tw from "tailwind.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

// socket
import io from "socket.io-client"

// components
import LoginHandler from "./components/auth/login-handler.jsx"
// import { API_URL } from "./utils/config.js"
const API_URL = "localhost:3001"
const socket = io(API_URL)

export default () => (
    <>
        <LoginHandler socket={socket} API_URL={API_URL}></LoginHandler>
    </>
)
