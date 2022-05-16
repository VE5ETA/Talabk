import React, { useContext, useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import Header from "../components/Header"; // moved to Layout.js
import "./Style/styles.min.css";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { errorAlert, successAlert } from "../helper/Options";
import { ToastContainer } from "react-toastify";

export default function Logout() {
  const [error, setError] = useState("");
  const [succssed, setSuccssed] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
  }, [error]);
  useEffect(() => {
    if (succssed) {
      successAlert("you have logged out successfuly 👋😁");
    }
  }, [succssed]);

  const logggout = () => {
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "user/logout", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ username, password }), //no body
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 400) {
            setError("Bad Request! something want wrong");
          } else if (response.status === 401) {
            setError("you're already logged out .");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
          setSuccssed(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(genericErrorMessage);
      });
  };
  logggout();

  return <div></div>;
}
