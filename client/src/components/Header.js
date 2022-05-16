import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGripHorizontal,
  faListSquares,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";

export default function Head(props) {
  const [userContext] = useContext(UserContext);

  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontFamily: "'Oswald', sans-serif",
                fontFamily: "'Lobster', cursive",
                fontSize: 50,
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
                <li>
                  <a href="#" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faUtensils} />
                    </svg>
                    Dashboard
                  </a>
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
                  <a href="#" className="nav-link text-white">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faGripHorizontal} />
                    </svg>
                    Products
                  </a>
                </li>
                <li>
                  <div className="dropdown text-end ">
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
                        <a className="dropdown-item text-white" href="#">
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            ) : (
              <div class="text-end">
                <NavLink to="/login">
                  <button type="button" class="btn btn-outline-light me-2">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button type="button" class="btn btn-warning">
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
