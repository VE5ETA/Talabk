import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

import { infoAlert, errorAlert } from "../helper/Options";

// this function is protect critical page
// get user role from context and check if admin or not
export default function IsLogged() {
  const [error, setError] = useState(undefined);
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    console.log(userContext.token);
    if (error) {
      errorAlert(error);
    } else if (userContext.token) {
      infoAlert("you have logged in successfuly 👋😁");
    }
  }, [error, userContext.token]);

  const location = useLocation();
  //this needs to be fixed ❗
  return userContext.token ? (
    <Navigate to="/AfterLog" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
