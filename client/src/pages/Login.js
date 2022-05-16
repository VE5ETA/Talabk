import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //no
// import Header from "../components/Header"; // moved to Layout.js
import "./Style/styles.min.css";

import { UserContext } from "../context/UserContext";
import { errorAlert } from "../helper/Options";
import { toast } from "react-toastify";

export default function Login() {
  // const [succssed, setSuccssed] = useState(false); // later 🕔
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();
  // const location = useLocation(); //in the future

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
  }, [error]);

  const formSubmitHandler = (e) => {
    toast.clearWaitingQueue();
    toast.dismiss();
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "user/login", {
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
          // setSuccssed(true); // later 🕔
          if (data?.token) {
            navigate("/createBusiness"); // i will change this to location.state?.form
          }
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "111px" }}>
        <div className="row register-form">
          <div className="col">
            <div />
          </div>
          <div
            className="col-md-8 col-xl-7 offset-md-2"
            style={{ marginRight: "0px", marginTop: "0px", marginLeft: 0 }}
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
