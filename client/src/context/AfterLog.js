import React, { useContext, useState, useCallback, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

import { warningAlert, errorAlert } from "../helper/Options";

// this function is protect critical page
// get user role from context and check if admin or not
export default function AfterLog() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState(undefined);

  // const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
  }, [error]);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "user/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
        fetch(process.env.REACT_APP_API_ENDPOINT + "user/platform/adminTest", {
          method: "GET",
          credentials: "include",
          // Pass authentication token as bearer token in header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }).then(async (r) => {
          if (r.ok) {
            setUserContext((oldValues) => {
              return { ...oldValues, isAdmin: true };
            });
            // navigate("/AdminDashboard"); //this needs to be complete
          } else {
          }
        });
      } else {
        if (response.status === 401) {
          setError("something want wrong ❗");
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          // window.location.reload();
        } else {
          setError("something want wrong ❗");
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, []);
  // }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  //this needs to be fixed ❗
  return userContext?.isAdmin ? (
    <Navigate to="/adminDashboard" replace state={{ from: location }} />
  ) : userContext.details?.workIn ? (
    <Navigate to="/Dashboard" replace state={{ from: location }} />
  ) : (
    <Navigate to="/createBusiness" replace state={{ from: location }} />
  );
}
