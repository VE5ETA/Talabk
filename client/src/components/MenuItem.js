import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function MenuItem(props) {
  let [quantite, setQuantite] = useState(1);
  let [itemDetail, setItemDetail] = useState({});

  // not work
  function plus() {
    if (quantite != 30) {
      setQuantite(quantite + 1);
    }
  }
  function min() {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    }
  }

  function addToCart() {
    setItemDetail({ name: props.name, quantite: quantite });
    console.log(itemDetail);
  }

  return (
    <div className="col-md-4 menu-item-card">
      <div className="card flex-md-row mb-4 box-shadow h-md-200 shadow p-3 mb-5 bg-body rounded">
        <div className="card-body d-flex flex-column align-items-start">
          <img
            src="https://thumbs.dreamstime.com/z/eat-sweet-dessert-cuisine-tart-food-cafe-menu-pastry-products-close-up-delicious-item-restaurant-enjoy-fresh-layered-ca-cake-142773107.jpg"
            className="flex-auto d-md-block menu-item-img mb-2"
            alt="Card image cap"
          />
          <h3 className="mb-0">
            <div className="text-dark text-decoration-none" href="#">
              {props.name}
            </div>
          </h3>
          <strong className="d-inline-block mb-2 text-success">
            resturant
          </strong>
          <div className="mb-1 text-muted">Description</div>
          <p className="card-text mb-auto ">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="d-flex align-items-center d-inline-block mt-2">
            <div className="align-items-center col-md-6">
              <h4 className="mr-1">13.99 SAR</h4>
            </div>

            <button
              onClick={min}
              className="btn btn-outline-danger"
              type="button"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <label
              id="quan"
              style={{ width: "150px" }}
              className="form-control"
            >
              {quantite}
            </label>
            <button
              onClick={plus}
              className="btn btn-outline-success"
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <button
            className="container btn btn-outline-primary btn-sm mt-2"
            type="button"
            onClick={addToCart}
          >
            Add to Card
          </button>
        </div>
      </div>
    </div>
  );
}
