import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { errorAlert, successAlert } from "../helper/Options";

export default function SignUp() {
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.CODESPACE_NAME +
        "-" +
        process.env.PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succssed, setSuccssed] = useState(false);

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succssed) {
      successAlert("your account has been created successfuly 👋😁");
      navigate("/AfterLog");
    }
  }, [error, succssed]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(url + "user/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else if (response.status === 500) {
            console.log(response);
            const data = await response.json();
            if (data.message) setError(data.message || genericErrorMessage);
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
          setSuccssed(true); // later 🕔// now it's the time ⌛
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  // html
  return (
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
            <h1>JOIN WITH US</h1>
            <div className="row form-group">
              <div className="col-sm-4 label-column">
                <label className="col-form-label" htmlFor="name-input-field">
                  Name
                </label>
              </div>
              <div className="col-sm-6 input-column">
                <input
                  className="form-control"
                  id="name"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4 label-column">
                <label
                  className="col-form-label"
                  htmlFor="userName-input-field"
                >
                  User Name
                </label>
              </div>
              <div className="col-sm-6 input-column">
                <input
                  className="form-control"
                  id="username"
                  placeholder="User Name"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4 label-column">
                <label className="col-form-label" htmlFor="email-input-field">
                  Email
                </label>
              </div>
              <div className="col-sm-6 input-column">
                <input
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4 label-column">
                <label
                  className="col-form-label"
                  htmlFor="pawssword-input-field"
                >
                  Password
                </label>
              </div>
              <div className="col-sm-6 input-column">
                <input
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4 label-column">
                {/* ❗ need to complate this ❗ */}
                <label
                  className="col-form-label"
                  htmlFor="repeat-pawssword-input-field"
                >
                  Confirm Password
                </label>
              </div>
              <div className="col-sm-6 input-column">
                <input
                  className="form-control"
                  placeholder="this needs to be complate ❗"
                  type="password"
                />
              </div>
            </div>
            <button
              className="btn btn-light submit-button"
              intent="primary"
              disabled={isSubmitting}
              text={`${isSubmitting ? "Registering" : "Register"}`}
              // fill //not needed
              type="submit"
            >
              join with us
            </button>
            <div className="col-lg-12 text-center mt-4">
              <label className="form-label">did you have account before?</label>
              <NavLink to="/login"> login here</NavLink>
            </div>
          </form>
        </div>
        <div className="col">
          <div />
        </div>
      </div>
    </div>
  );
}
