import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./components/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { Config } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("config", Config.clientId);
root.render(
  <GoogleOAuthProvider clientId={Config.clientId}>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
