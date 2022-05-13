import React from "react";
// import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import "./Style/styles.min.css";

export default function Login() {
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
              <h1>LOGIN</h1>
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
                    ؛assword
                  </label>
                </div>
                <div className="col-sm-6 input-column">
                  <input className="form-control" type="password" />
                </div>
              </div>
              <button className="btn btn-light submit-button" type="button">
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
