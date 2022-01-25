import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Profile from "./Profile";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CodeWarehouseTheme } from "./theme";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={CodeWarehouseTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
