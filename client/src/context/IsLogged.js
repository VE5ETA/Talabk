import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

import { warningAlert } from "../helper/Options";

// this function is protect critical page
// get user role from context and check if admin or not
export default function IsLogged() {
  const [userContext, setUserContext] = useContext(UserContext);
  const location = useLocation();
  //this needs to be fixed ❗
  return userContext.token ? (
    <Navigate to="/AfterLog" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
