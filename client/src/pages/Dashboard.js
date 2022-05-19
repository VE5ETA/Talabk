import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();

  return (
    <div className="page-notFound d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block"> 🏪 🏪</span>
            <div className="mb-4 lead">this is Dashboard .</div>
            <a onClick={() => navigate("/")} className="btn btn-link">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
