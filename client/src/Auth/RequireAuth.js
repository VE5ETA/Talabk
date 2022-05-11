import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// this function is protect critical page
// get user role from context and check if admin or not
export default function RequireAuth() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
