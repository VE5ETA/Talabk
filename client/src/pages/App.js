import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../context/RequireAuth";

import { UserContext } from "../context/UserContext";

import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import NewReq from "./plateformPage/NewReq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public page */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* for test */}
          <Route path="/:buzname/menu" element={<NewReq />} />
          <Route path="/:buzname/menu/:itemName" element={<NewReq />} />

          {/* privete page */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<SignUp />} />
          </Route>

          {/* if page not found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
