import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-5">
            <div
              style={{
                fontFamily: "'Anton', sans-serif",
                fontFamily: "'Oswald', sans-serif",
                fontFamily: "'Lobster', cursive",
                fontSize: 55,
              }}
              className="m-4 d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <NavLink
                className="navbar-brand text-decoration-none text-white"
                to="/"
              >
                Talabk
                {/* <img style={{ maxWidth: "15%" }} src={Logotype} /> */}
              </NavLink>
            </div>

            <div className="text-end">
              <NavLink to="/orders">
                <button type="button" className="btn btn-warning">
                  orders
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
