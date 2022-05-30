import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Style/styles.min.css";

import { UserContext } from "../context/UserContext";
import { errorAlert, infoAlert } from "../helper/Options";

import Img from "../pages/img/Login.png";

import LoadingSpinner from "../components/LoadingSpinner";

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

  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="create-form">
      <div className="wrapper rounded bg-white d-flex justify-content-center align-items-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div
            style={{ border: "none", width: "75%" }}
            className="card  login-form m-4"
          >
            <div className="text-center intro">
              <img src={Img} width={160} />
            </div>
            <form onSubmit={formSubmitHandler}>
              <div className="mt-4 text-center">
                <h4>Log In.</h4>

                <div className="mt-3 inputbox">
                  <input
                    className="form-control"
                    id="username"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="inputbox">
                  <input
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="fa fa-lock" />
                </div>
              </div>
              <div className="mt-2">
                <button className="btn btn-warning btn-block login-btn">
                  Log In
                </button>
              </div>
              <div className="col-lg-12 text-center mt-4">
                <label className="form-label">
                  if you didn't have account create one?
                </label>
                <NavLink to="/signup"> signup here</NavLink>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/// old login design

// <div>
//   <div className="container">
//     <div className="row register-form">
//       <div className="col">
//         <div />
//       </div>
//       <div
//         className="col-md-8 col-xl-7 offset-md-2"
//         style={{ margin: "100px 0 " }}
//       >
//         <form onSubmit={formSubmitHandler} className="custom-form">
//           <h1>LOGIN</h1>
//           <div className="row form-group">
//             <div className="col-sm-4 label-column">
//               <label className="col-form-label" htmlFor="text-input-field">
//                 user name
//               </label>
//             </div>
//             <div className="col-sm-6 input-column">
//               <input
//                 className="form-control"
//                 id="username"
//                 placeholder="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="row form-group">
//             <div className="col-sm-4 label-column">
//               <label
//                 className="col-form-label"
//                 htmlFor="pawssword-input-field"
//               >
//                 password
//               </label>
//             </div>
//             <div className="col-sm-6 input-column">
//               <input
//                 className="form-control"
//                 id="password"
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <button
//             className="btn btn-light submit-button"
//             intent="primary"
//             disabled={isSubmitting}
//             text={`${isSubmitting ? "Signing In" : "Sign In"}`}
//             // fill //for now
//             type="submit"
//           >
//             login
//           </button>
//         </form>
//       </div>
//       <div className="col">
//         <div />
//       </div>
//     </div>
//   </div>
// </div>
