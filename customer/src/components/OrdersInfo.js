import React, { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../helper/Options";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import LoadingSpinner from "../components/LoadingSpinner";
TimeAgo.addDefaultLocale(en);

export default function OrdersInfo(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    if (error) {
      errorAlert(error);
      setIsSubmitting(false);
    }
    if (succss) {
      props.getOrdersInfo();
      successAlert(succss);
    }
  }, [error, succss]);

  function sendState(e) {
    try {
      // e.preventDefault();
      setIsSubmitting(true);
      setError("");
      setSuccss("");
      setIsLoading(true);
      fetch(url + `customer/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: props.id,
        }),
      })
        .then(async (res) => {
          setIsSubmitting(false);
          let aa = await res.json();
          if (res.ok) {
            setSuccss(aa.message);
          } else {
            setError(aa.message);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError("Something went wrong! Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      setIsSubmitting(false);
      setError("Something went wrong! Please try again later.");
    }
  }

  return (
    <div className="col-md-3 col-sm-6 mb-3">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="card card-block p-3">
          <p className="card-title mb-3">
            {<ReactTimeAgo date={Date.parse(props.orderDate)} locale="en-US" />}
          </p>
          <h5 className="card-title mb-3">Business: {props.businessName}</h5>
          <p className="card-title mb-3">order ID: {props.id}</p>
          <p>
            Order state:
            {props.orderState === "accepted" || props.orderState === "done" ? (
              <strong className="d-inline-block mb-2 text-success">
                &nbsp;{props.orderState}
              </strong>
            ) : props.orderState === "new" ? (
              <strong className="d-inline-block mb-2 text-primary">
                &nbsp;{props.orderState}
              </strong>
            ) : (
              <strong className="d-inline-block mb-2 text-danger">
                &nbsp;{props.orderState}
              </strong>
            )}
          </p>

          <div>
            <span className="theme-color">Order details</span>
            <div className="mb-3">
              <hr className="new1" />
            </div>
            <ol className="list-group list-group-numbered">
              {Object.values(props.items).map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.name}</div>
                      {item.price} s?????
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      {item.quantite}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="d-flex justify-content-between mt-3">
              <span className="font-weight-bold">Total</span>
              <span className="font-weight-bold theme-color">
                {props.subTotal} SAR
              </span>
            </div>

            {props.orderState === "new" ? (
              <button
                className=" btn btn-outline-danger btn-sm mt-2"
                type="button"
                onClick={() => sendState()}
                disabled={isSubmitting}
                text={`${isSubmitting ? "..." : "canceled"}`}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
