import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav
        style={{ padding: "20px 0" }}
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <a
                className="btn btn-outline-primary"
                style={{ textDecoration: "none", marginRight: "20px" }}
                href="/Login"
              >
                Login
              </a>
              <a
                className="btn btn-outline-secondary"
                style={{ textDecoration: "none", marginRight: "20px" }}
                href="/SignUp"
              >
                SignUp
              </a>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
