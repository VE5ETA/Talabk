import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

import { infoAlert, errorAlert } from "../helper/Options";

// this function is protect critical page
// get user role from context and check if admin or not
export default function AfterLog() {
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState(undefined);

  let isDone = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    // else {
    //   infoAlert("you have logged in successfuly 👋😁");
    // }
  }, [error]);

  useEffect(() => {
    if (isDone.current) {
      navigateTheUser();
      console.log(userContext);
    }
  }, [userContext]);

  function navigateTheUser() {
    // setTimeout(() => {
    if (!userContext.details.workIn && !userContext.isAdmin) {
      navigate("/createBusiness");
    } else if (!userContext.menu && !userContext.isAdmin) {
      navigate("/CreateMenu");
    } else if (userContext.isAdmin) {
      navigate("/adminDashboard");
    } else if (
      !userContext.isAdmin &&
      userContext.details.workIn &&
      userContext.menu
    ) {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }
    // }, 5000);
    // userContext.isAdmin
    //   ? navigate("/adminDashboard")
    //   : // <Navigate to="/adminDashboard" replace state={{ from: location }} />
    //   userContext.details?.workIn && !userContext.isAdmin
    //   ? navigate("/Dashboard")
    //   : // <Navigate to="/Dashboard" replace state={{ from: location }} />
    //   !userContext.isAdmin && !userContext.details?.workIn
    //   ? navigate("/createBusiness")
    //   : // <Navigate to="/createBusiness" replace state={{ from: location }} />
    //     navigate("/");
    // // <Navigate to="/" replace state={{ from: location }} />
  }

  const fetchUserDetails = useCallback(async () => {
    await fetch(url + "user/me", {
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
        await fetch(url + "user/platform/adminTest", {
          method: "GET",
          credentials: "include",
          // Pass authentication token as bearer token in header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        })
          .then(async (r) => {
            console.log(r);
            if (r.ok) {
              setUserContext((oldValues) => {
                return { ...oldValues, isAdmin: true };
              });
              isDone.current = true;
              // navigate("/AdminDashboard"); //this needs to be complete
            } else {
              setUserContext((oldValues) => {
                return { ...oldValues, isAdmin: false };
              });
              await fetch(url + "user/business/menu", {
                method: "GET",
                credentials: "include",
                // Pass authentication token as bearer token in header
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userContext.token}`,
                },
              }).then(async (menuRes) => {
                if (menuRes.ok) {
                  const menuData = await menuRes.json();
                  setUserContext((oldValues) => {
                    return { ...oldValues, menu: menuData };
                  });
                  isDone.current = true;
                } else {
                  setUserContext((oldValues) => {
                    return { ...oldValues, menu: null };
                  });
                  isDone.current = true;
                }
              });
              // isDone.current = true;
            }
          })
          .catch((err) => {
            setUserContext((oldValues) => {
              return { ...oldValues, isAdmin: false };
            });
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
  }, [setUserContext, userContext.token]);
  // }, [setUserContext, userContext.token]);
  let i = 1;
  useEffect(() => {
    // fetch only when user details are not present

    console.log(i++);
    if (
      !userContext.details?.workIn ||
      !userContext.details ||
      !userContext.menu
    ) {
      fetchUserDetails();
    }
  }, []);

  //this needs to be fixed ❗
  console.log(userContext.isAdmin);
  return null;

  // if (userContext.isAdmin) {
  //   return <Navigate to="/adminDashboard" replace state={{ from: location }} />;
  // } else if (userContext.details.workIn && !userContext.isAdmin) {
  //   return <Navigate to="/Dashboard" replace state={{ from: location }} />;
  // } else if (userContext.details.workIn && !userContext.isAdmin) {
  //   return <Navigate to="/Dashboard" replace state={{ from: location }} />;
  // } else {
  //   return <Navigate to="/createBusiness" replace state={{ from: location }} />;
  // }
}
