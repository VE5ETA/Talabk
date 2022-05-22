import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import "bootstrap/dist/css/bootstrap.min.css"; //this is for production
import "react-toastify/dist/ReactToastify.css"; //alert lib
import { CustomerProvider } from "./context/CustomerContext"; // use CustomerProvider only on

ReactDOM.render(
  <React.StrictMode>
    <CustomerProvider>
      <App />
    </CustomerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
