import React, { Component } from "react";
import MenuItem from "./MenuItem";

class Menu extends Component {
  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="Tap1-tab"
              data-bs-toggle="tab"
              data-bs-target="#Tap1"
              type="button"
              role="tab"
              aria-controls="Tap1"
              aria-selected="true"
            >
              Tap1
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="Tap2-tab"
              data-bs-toggle="tab"
              data-bs-target="#Tap2"
              type="button"
              role="tab"
              aria-controls="Tap2"
              aria-selected="false"
            >
              Tap2
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="Tap3-tab"
              data-bs-toggle="tab"
              data-bs-target="#Tap3"
              type="button"
              role="tab"
              aria-controls="Tap3"
              aria-selected="false"
            >
              Tap3
            </button>
          </li>
        </ul>
        <MenuItem />
      </div>
    );
  }
}

export default Menu;
