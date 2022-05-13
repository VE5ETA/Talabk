import React from "react";
import { NavLink } from "react-router-dom";

export default function BuzCard(props) {
  return (
    <div class="col-md-3 col-sm-6">
      <NavLink
        className="text-decoration-none text-dark"
        to={props.tradeName + "/menu"}
      >
        <div class="card card-block p-3">
          <img src={props.img} alt="Photo of sunset" />
          <h5 class="card-title mt-3 mb-3">{props.tradeName}</h5>
          <strong class="d-inline-block mb-2 text-primary">{props.type}</strong>
          <div class="mb-1 text-muted">Description</div>
          <p class="card-text">{props.Desc}</p>
        </div>
      </NavLink>
    </div>
  );
}
