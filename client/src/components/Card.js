import React from "react";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 style={{ color: "black" }} className="card-title">
          {props.tradeName}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p style={{ color: "black" }} className="card-text">
          {props.businessType}
        </p>
        <p style={{ color: "black" }} className="card-text">
          {props.id}
        </p>
        <NavLink to="/" className="card-link">
          Card link
        </NavLink>
        <NavLink to="/" className="card-link">
          Another link
        </NavLink>
      </div>
    </div>
  );
}
