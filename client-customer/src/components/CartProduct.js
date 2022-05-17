import React from "react";

export default function CartProduct(props) {
  if (props.isEmpty) {
    return (
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">your cart is empty</h6>
        </div>
      </li>
    );
  } else {
    return (
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">{props.name}</h6>
          <small className="text-muted">quantite: {props.quantite}</small>
        </div>
        <span className="text-muted">{props.price}SAR</span>
      </li>
    );
  }
}
