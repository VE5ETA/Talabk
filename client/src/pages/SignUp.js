import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function SignUp() {
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "111px" }}>
        <div className="row register-form">
          <div className="col">
            <div />
          </div>
          <div
            className="col-md-8 col-xl-7 offset-md-2"
            style={{ marginRight: "0px", marginTop: "0px", marginLeft: 0 }}
          >
            <form className="custom-form">
              <h1>JOIN WITH US</h1>
              <div className="row form-group">
                <div className="col-sm-4 label-column">
                  <label className="col-form-label" htmlFor="name-input-field">
                    Name
                  </label>
                </div>
                <div className="col-sm-6 input-column">
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-4 label-column">
                  <label className="col-form-label" htmlFor="email-input-field">
                    Email
                  </label>
                </div>
                <div className="col-sm-6 input-column">
                  <input className="form-control" type="email" />
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
                  <input className="form-control" type="password" />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-4 label-column">
                  <label
                    className="col-form-label"
                    htmlFor="repeat-pawssword-input-field"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="col-sm-6 input-column">
                  <input className="form-control" type="password" />
                </div>
              </div>
              <button className="btn btn-light submit-button" type="button">
                join with us
              </button>
              <div className="col-lg-12 text-center mt-4">
                <label className="form-label">
                  did you have account before?
                </label>
                <NavLink to="/login"> login here</NavLink>
              </div>
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
