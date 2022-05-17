import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3">
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
            <NavLink to="/cart">
              <button
                type="button"
                className="btn btn-secondary position-relative"
              >
                Inbox
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  99+
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
