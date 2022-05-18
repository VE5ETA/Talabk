import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomerProvider } from "../context/CustomerContext";

import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Menu from "./cutomerPage/Menu";
import Cart from "./cutomerPage/Cart";
import Store from "./Store";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public page */}
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Store />} />

          {/* for test */}

          <Route path="/stores/@:username" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />

          {/* privete page */}
          {/* <Route element={<RequireAuth />}></Route> */}

          {/* if page not found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
