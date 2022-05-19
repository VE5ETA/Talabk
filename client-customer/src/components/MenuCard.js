import React from "react";
import { NavLink } from "react-router-dom";

export default function BuzCard(props) {
  return (
    <div className="col-md-3 col-sm-6 mb-3">
      <NavLink
        className="text-decoration-none text-dark"
        to={"../" + props.username}
      >
        <div className="card card-block p-3">
          <img src={props.img} alt="Photo of sunset" />
          <h5 className="card-title mt-3 mb-3">{props.name}</h5>
          <strong className="d-inline-block mb-2 text-primary">
            {props.type}
          </strong>
          {props.description ? (
            <>
              <div className="mb-1 text-muted">Description</div>
              <p className="card-text text-break overflow-hidden">
                {props.description}
              </p>
            </>
          ) : null}
        </div>
      </NavLink>
    </div>
  );
}
