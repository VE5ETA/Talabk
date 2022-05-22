import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGripHorizontal,
  faListSquares,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import { errorAlert, infoAlert } from "../helper/Options";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header(props) {
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
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succssed) {
      infoAlert(" good bye 🖐 ");
      navigate("/");
    }
  }, [error, succssed]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";
    fetch(url + "user/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Bad Request! something want wrong");
          } else if (response.status === 401) {
            setError("you're already logged out .");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          setUserContext({});
          setSuccssed(true);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-4">
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontFamily: "'Oswald', sans-serif",
                fontFamily: "'Lobster', cursive",
                fontSize: 55,
              }}
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <NavLink
                style={{ fontSize: 50 }}
                className="navbar-brand text-decoration-none text-white"
                to="/"
              >
                Talabk
              </NavLink>
            </div>
            {userContext.token ? (
              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                {userContext.isAdmin ? (
                  <li>
                    <NavLink
                      to="/adminDashboard"
                      className="nav-link text-white"
                    >
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <FontAwesomeIcon icon={faUtensils} />
                      </svg>
                      Admin Dashboard 🎫
                    </NavLink>
                  </li>
                ) : userContext.details?.workIn ? (
                  userContext.menu ? (
                    <>
                      <li>
                        <NavLink
                          to="/Dashboard"
                          className="nav-link text-white"
                        >
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width={24}
                            height={24}
                          >
                            <FontAwesomeIcon icon={faUtensils} />
                          </svg>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <a href="#" className="nav-link text-white">
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width={24}
                            height={24}
                          >
                            <FontAwesomeIcon icon={faListSquares} />
                          </svg>
                          Orders
                        </a>
                      </li>
                      <li>
                        <NavLink to="/menu" className="nav-link text-white">
                          <svg
                            className="bi d-block mx-auto mb-1"
                            width={24}
                            height={24}
                          >
                            <FontAwesomeIcon icon={faGripHorizontal} />
                          </svg>
                          Menu
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li>
                      <NavLink to="/CreateMenu" className="nav-link text-white">
                        <svg
                          className="bi d-block mx-auto mb-1"
                          width={24}
                          height={24}
                        >
                          <FontAwesomeIcon icon={faGripHorizontal} />
                        </svg>
                        Create Menu 🍨
                      </NavLink>
                    </li>
                  )
                ) : (
                  <NavLink to="/createBusiness" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faUtensils} />
                    </svg>
                    Create Business
                  </NavLink>
                )}

                <li>
                  <div className="dropdown-center text-end ">
                    <a
                      href="#"
                      className="nav-link text-white dropdown-toggle"
                      id="dropdownUser1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </svg>
                      Profile
                    </a>
                    <ul
                      className="dropdown-menu text-small bg-dark text-center"
                      aria-labelledby="dropdownUser1"
                    >
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          New project...
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          Profile
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <form
                          onSubmit={formSubmitHandler}
                          className="dropdown-item text-white"
                          href="#"
                        >
                          <button
                            type="submit"
                            className="btn btn-outline-secondary"
                          >
                            logout
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="text-end">
                <NavLink to="/login">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
