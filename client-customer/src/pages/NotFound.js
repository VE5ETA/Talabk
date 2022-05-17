import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();

  return (
    <div className="page-notFound d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <a onClick={() => navigate("/")} className="btn btn-link">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
