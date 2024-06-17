import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./style/global";
import { ThemeContext, state } from "./context/themeContext";


async function mountApp (){

  if(process.env.NODE_ENV === "development"){
    const {worker} = require("./mock/browser");
    await worker.start(); //msw 시작
  }


  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}

mountApp();