import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { orderInfo } from "../../helper/OrderInfo";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import { CartProduct } from "../../components/CartProduct";
import { CartProduct } from "../../components/CartProduct";
import { CustomerContext } from "../../context/CustomerContext";
import { errorAlert, successAlert } from "../../helper/Options";
import OrderDone from "../../components/OrderDone";
import Logo from "../../image/icon_T.png";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Card() {
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(undefined);
  const [succssed, setSuccssed] = useState(false);
  const [customerContext, setCustomerContext] = useContext(CustomerContext);
  const [isLoading, setIsLoading] = useState(false);

  // order info
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderType, setOrderType] = useState("dining in");
  const [orderNotes, setOrderNotes] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reservationTime, setReservationTime] = useState("30m");
  let price = 0;
  let itemsCount = 0;

  // this will display alert on error or success
  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succssed) {
      successAlert(`your order is send to ${customerContext?.username}`);
    }
  }, [error, succssed]);

  // send order to api
  function onClickHandler(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setIsLoading(true);

    const genericErrorMessage = "Something went wrong! Please try again later.";

    if (customerContext?.orderType === "reservation") {
      if (customerContext?.reservationInfo?.personNumber === "") {
        setError("person number is invalid");
        setIsSubmitting(false);
      } else if (customerContext?.reservationInfo?.date === "") {
        setError("date is invalid");
        setIsSubmitting(false);
      } else if (customerContext?.reservationInfo?.time === "") {
        setError("time is invalid");
        setIsSubmitting(false);
      } else if (customerContext?.ID !== undefined) {
        fetch(url + "customer/", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerContext),
        })
          .then(async (res) => {
            const resJson = await res.json();
            if (!res.ok) {
              setIsSubmitting(false);
              if (res.status === 500) {
                setError(resJson.message);
              } else if (res.status === 404) {
                setError("business not found");
              } else {
                setError(genericErrorMessage);
              }
            } else {
              setIsSubmitting(false);
              setSuccssed(true);
            }
          })
          .catch((error) => {
            setError(genericErrorMessage);
            setIsSubmitting(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setError("you don't choise a business");
        setIsSubmitting(false);
      }
    } else if (
      //changed here 🥤⌚
      Object.keys(customerContext).length != 0 &&
      customerContext?.ID !== undefined &&
      customerContext?.orderType !== "reservation"
    ) {
      fetch(url + "customer/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerContext),
      })
        .then(async (res) => {
          const resJson = await res.json();
          if (!res.ok) {
            setIsSubmitting(false);
            if (res.status === 500) {
              setError(resJson.message);
            } else if (res.status === 404) {
              setError("business not found");
            } else {
              setError(genericErrorMessage);
            }
          } else {
            setIsSubmitting(false);
            setSuccssed(true);
          }
        })
        .catch((error) => {
          setError(genericErrorMessage);
          setIsSubmitting(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (customerContext?.orderType !== "reservation") {
      setError("you can't create order without items");
      setIsSubmitting(false);

      setIsLoading(false);
    }
  }

  // show cart product it right side
  function orderItems() {
    if (customerContext?.items != undefined) {
      if (Object.keys(customerContext?.items).length !== 0) {
        return Object.values(customerContext?.items).map((item, index) => {
          price = price + item.price * item.quantite;
          itemsCount = itemsCount + item.quantite;
          return (
            <CartProduct
              key={item.id}
              name={item.name}
              quantite={item.quantite}
              price={item.price}
            />
          );
        });
      }
    } else {
      return <CartProduct isEmpty={true} />;
    }
  }

  // update reservationTime value on change
  useEffect(() => {
    setCustomerContext((oldValues) => {
      return {
        ...oldValues,
        reservationInfo: {
          reservationTime: reservationTime,
          date: date,
          time: time,
          personNumber: personNumber,
        },
      };
    });
  }, [reservationTime, date, time, personNumber]);

  // delete reservationInfo if order type id not reservation
  useEffect(() => {
    if (orderType !== "reservation") {
      setCustomerContext((oldValues) => {
        return {
          ...oldValues,
          reservationInfo: null,
        };
      });
    }
  }, [orderType]);

  // update notes, customerNumber and orderType value on change
  useEffect(() => {
    setCustomerContext((oldValues) => {
      return {
        ...oldValues,
        notes: orderNotes,
        customerNumber: phoneNumber,
        orderType: orderType,
        tableNumber: tableNumber,
      };
    });
  }, [orderNotes, phoneNumber, orderType, tableNumber]);

  // change sub total value in context
  function setTotal() {
    setCustomerContext((oldValues) => {
      return {
        ...oldValues,
        subTotal: price,
      };
    });
  }

  // if price is updated will update value it context
  useEffect(() => {
    setTotal();
  }, [price]);

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  if (succssed) {
    return <OrderDone />;
  } else {
    return (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="cart bg-light">
            <div className="container">
              <div className="py-5 text-center">
                <img
                  className="d-block mx-auto mb-4"
                  src={Logo}
                  alt=""
                  width={72}
                  height={72}
                />
                <h2>Checkout</h2>
                {/* <p className="lead">
              Below is an example form built entirely with Bootstrap's form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p> */}
              </div>
              <div className="row ">
                <div className="col-md-4 order-md-2 mb-4">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                    <span className="badge bg-primary badge-pill">
                      {itemsCount}
                    </span>
                  </h4>
                  <ul className="list-group mb-3">
                    {/* render the cart items here */}
                    {orderItems()}
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Total </h6>
                        <small className="text-muted">
                          items: {itemsCount}
                        </small>
                      </div>
                      <span className="text-muted">{price}SAR</span>
                    </li>
                    <li className=" list-group-item lh-condensed">
                      <h6 className="my-0 mb-2">Order type: </h6>
                      <div
                        className="btn-group d-flex justify-content-center"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          onClick={(e) => setOrderType(e.target.value)}
                          value="dining in"
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio1"
                          autoComplete="off"
                          defaultChecked
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio1"
                        >
                          dining in
                        </label>
                        <input
                          onClick={(e) => setOrderType(e.target.value)}
                          value="pickup"
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio2"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio2"
                        >
                          pickup
                        </label>
                        <input
                          onClick={(e) => setOrderType(e.target.value)}
                          value="reservation"
                          type="radio"
                          className="btn-check"
                          name="btnradio"
                          id="btnradio3"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="btnradio3"
                        >
                          reservation
                        </label>
                      </div>
                    </li>
                  </ul>
                  {/* promo code not work in this version */}
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
                  <form className="needs-validation">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Phone number</label>
                        <input
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Enter your number"
                          required
                        />
                      </div>
                      {orderType === "dining in" ? (
                        <div className="col-md-6 mb-3">
                          <label htmlFor="firstName">Table number</label>
                          <input
                            onChange={(e) => setTableNumber(e.target.value)}
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter table number"
                            required
                          />
                        </div>
                      ) : null}

                      {orderType === "reservation" ? (
                        <>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">number of person</label>
                            <input
                              onChange={(e) => setPersonNumber(e.target.value)}
                              type="text"
                              className="form-control"
                              id="phoneNumber"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">date</label>
                            <input
                              onChange={(e) => setDate(e.target.value)}
                              type="date"
                              className="form-control"
                              id="time"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">time</label>
                            <input
                              onChange={(e) => setTime(e.target.value)}
                              type="time"
                              className="form-control"
                              id="time"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">reservation time</label>
                            <select
                              onChange={(e) =>
                                setReservationTime(e.target.value)
                              }
                              className="form-select"
                            >
                              <option value="30m">half an hour</option>
                              <option value="1 hour">One hour</option>
                              <option value="2 hour">Two hour</option>
                              <option value="3 hour">Three hour</option>
                              <option value="more than 3 hour">
                                more than 3 hour
                              </option>
                            </select>
                          </div>
                        </>
                      ) : null}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">Note</label>
                        <textarea
                          onChange={(e) => setOrderNotes(e.target.value)}
                          className="form-control"
                          rows="2"
                        ></textarea>
                      </div>
                    </div>

                    <hr className="mb-4" />

                    {/* payment not work in this version */}
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
                        <label
                          className="custom-control-label"
                          htmlFor="credit"
                        >
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
                        <label
                          className="custom-control-label"
                          htmlFor="paypal"
                        >
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
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div>
                    <hr className="mb-4" />

                    <div className="d-flex justify-content-center">
                      {customerContext?.username ? (
                        <NavLink
                          to={`../${customerContext?.username}`}
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          <FontAwesomeIcon icon={faAnglesLeft} />
                        </NavLink>
                      ) : null}
                      <button
                        onClick={onClickHandler}
                        className="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Continue to checkout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
