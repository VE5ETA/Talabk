import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/styles.min.css";

import { UserContext } from "../context/UserContext";
import { errorAlert, infoAlert } from "../helper/Options";

export default function Login() {
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(undefined);
  const [succssed, setSuccssed] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();
  // const location = useLocation(); //in the future

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succssed) {
      infoAlert("you have logged in successfuly 👋😁");
      // setTimeout(() => {
      navigate("/AfterLog");
      // }, 5000);
    }
  }, [error, succssed]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(url + "user/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid username and password combination.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });

          setSuccssed(true); // later 🕔// now it's the time ⌛
          //the bleow was removed to show an alert ⬇
          // if (data?.token) {
          //   navigate("/createBusiness"); // i will change this to location.state?.form
          // }
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row register-form">
          <div className="col">
            <div />
          </div>
          <div
            className="col-md-8 col-xl-7 offset-md-2"
            style={{ margin: "100px 0 " }}
          >
            <form onSubmit={formSubmitHandler} className="custom-form">
              <h1>LOGIN</h1>
              <div className="row form-group">
                <div className="col-sm-4 label-column">
                  <label className="col-form-label" htmlFor="text-input-field">
                    user name
                  </label>
                </div>
                <div className="col-sm-6 input-column">
                  <input
                    className="form-control"
                    id="username"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-4 label-column">
                  <label
                    className="col-form-label"
                    htmlFor="pawssword-input-field"
                  >
                    password
                  </label>
                </div>
                <div className="col-sm-6 input-column">
                  <input
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-light submit-button"
                intent="primary"
                disabled={isSubmitting}
                text={`${isSubmitting ? "Signing In" : "Sign In"}`}
                // fill //for now
                type="submit"
              >
                login
              </button>
            </form>
          </div>
          <div className="col">
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
