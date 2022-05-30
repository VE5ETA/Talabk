import React from "react";
// import "../pages/Style/spinner.css";

export default function LoadingSpinner() {
  return (
    // <div className="spinner-container">
    //   <div className="loading-spinner"></div>
    // </div>
    <div className="container">
      <div className="d-flex justify-content-center">
        {/* <div className="d-flex justify-content-center my-5"> */}
        {/* <div className="spinner-border text-warning  my-5" role="status"> */}
        <div className="spinner-border text-warning my-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
