import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { orderInfo } from "../../helper/OrderInfo";
import CartProduct from "../../components/CartProduct";
import { itemCount } from "../../helper/OrderInfo";
import { NavLink } from "react-router-dom";

export default function Card() {
  // const [subTotal, setSubTotal] = useState(0);
  // const [count, setCount] = useState(0);
  const [orderType, setOrderType] = useState("inside");
  let subTotal = 0;
  let count = 0;

  return (
    <div className="cart bg-light">
      <div className="container">
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            alt=""
            width={72}
            height={72}
          />
          <h2>Checkout form</h2>
          <p className="lead">
            Below is an example form built entirely with Bootstrap's form
            controls. Each required form group has a validation state that can
            be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge bg-primary badge-pill">{count}</span>
            </h4>
            <ul className="list-group mb-3">
              {orderInfo.items.length !== 0 ? (
                orderInfo.items.map((item, index) => {
                  subTotal += item.price * item.quantite;
                  count += item.quantite;
                  return (
                    <CartProduct
                      key={item.id}
                      name={item.name}
                      quantite={item.quantite}
                      price={item.price}
                    />
                  );
                })
              ) : (
                <CartProduct isEmpty={true} />
              )}
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Total: </h6>
                  <small className="text-muted">items: {count}</small>
                </div>
                <span className="text-muted">{subTotal}SAR</span>
              </li>
            </ul>
            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            {/* <h4 className="mb-3">Billing address</h4> */}
            <form className="needs-validation">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="PhoneNumber"
                    placeholder="Enter your number"
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
              </div>

              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    defaultChecked
                    required
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    required
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    required
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />

              <NavLink
                to={"../"}
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                go back
              </NavLink>
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
