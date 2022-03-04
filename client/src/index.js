import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
