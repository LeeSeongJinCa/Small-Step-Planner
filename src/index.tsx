import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "./reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
