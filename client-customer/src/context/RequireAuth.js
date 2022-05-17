import React, { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

// this function is protect critical page
// get user role from context and check if admin or not
export default function RequireAuth() {
  const [userContext, setUserContext] = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  //this needs to be fixed ❗
  return userContext.token ? (
    location.state?.from ? (
      navigate(location.state.from) // this needs to be  checked 📃
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
