import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();

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
          <form className="custom-form">
            <h1>page not found</h1>
            <br></br>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="btn btn-primary"
            >
              Go back to home page
            </button>
          </form>
        </div>
        <div className="col">
          <div />
        </div>
      </div>
    </div>
  );
}
