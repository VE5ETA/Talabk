import React, { useEffect, useCallback, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../context/RequireAuth";
import IsLogged from "../context/IsLogged";

import { UserContext } from "../context/UserContext";

import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import AdminDashboard from "./AdminDashboard";
import NewReq from "./plateformPage/NewReq";
// import Menu from "./cutomerPage/Menu"; deleted
// import Cart from "./cutomerPage/Cart";
// import Store from "./Store";
import CreateForm from "./BusinessPage/CreateForm";
import CreateMenu from "./BusinessPage/CreateMenu";

import Logout from "./Logout";
import AfterLog from "../context/AfterLog";
import Dashboard from "./Dashboard";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\

  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public page */}
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/stores" element={<Store />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* for test */}

          {/* <Route path="/stores/:buzname/menu" element={<Menu />} /> */}
          {/* <Route path="/:buzname/menu/:itemName" element={<NewReq />} /> */}

          {/* ~this will protect the user from accessing login/signup page if he's logged in ⛔ */}
          <Route element={<IsLogged />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>
          {/* privete page */}
          <Route path="/AfterLog" element={<AfterLog />} />
          <Route element={<RequireAuth />}>
            {/* <Route element={<AfterLog />}> */}
            {/* <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} /> */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/createBusiness" element={<CreateForm />} />
            <Route path="/CreateMenu" element={<CreateMenu />} />
            <Route path="/logout" element={<Logout />} />
            {/* </Route> */}
          </Route>

          {/* <Route element={<AfterLog />}></Route> */}

          {/* if page not found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
