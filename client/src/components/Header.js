import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-light navbar-expand-lg navigation-clean-button">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            طلبك
          </NavLink>
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  الرئيسية
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  من نحن
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  اتصل بنا
                </NavLink>
              </li>
            </ul>
            <span className="navbar-text actions">
              <NavLink
                className="btn btn-light action-button"
                role="button"
                to="/signUp"
              >
                انضم معنا
              </NavLink>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
