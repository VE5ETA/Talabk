import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMoneyBill,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { errorAlert, successAlert } from "../helper/Options";
import { UserContext } from "../context/UserContext";
TimeAgo.addDefaultLocale(en);

export default function VerifyBuz(props) {
  const [userContext, setUserContext] = useContext(UserContext);
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;
  const [neww, setNeww] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [done, setDone] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [businessNotes, setBusinessNotes] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");

  useEffect(() => {
    if (error) {
      errorAlert(error);
      setIsSubmitting(false);
    }
    if (succss) {
      successAlert(succss);
      props.updateOrders();
      // navigate("/AfterLog");
    }
  }, [error, succss]);
  // console.log(props.orderDate);
  // const d = new Date(props.orderDate).getTime();
  // const currentDate = new Date().getTime();
  // console.log("result " + d);
  // console.log("current" + currentDate);
  // console.log(currentDate - d);

  // let xt = new Intl.RelativeTimeFormat().format(d - currentDate, "minutes");
  // console.log(xt);

  function sendState(e, type) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      setSuccss("");
      fetch(url + `user/business/order/${type}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
        body: JSON.stringify({
          ID: props.id,
          businessNotes: businessNotes,
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
          setError(error);
        });
    } catch (error) {
      setIsSubmitting(false);
      setError(error);
    }
  }

  useEffect(() => {
    if (!neww && !accepted && !done && !canceled && !rejected) {
      editState();
    }
  }, []);

  function editState() {
    if (props.orderState === "new") {
      setNeww(true);
    } else if (props.orderState === "accepted") {
      setAccepted(true);
    } else if (props.orderState === "done") {
      setDone(true);
    } else if (props.orderState === "rejected") {
      setRejected(true);
    }
  }

  return (
    <div
      href="#"
      // className="list-group-item list-group-item-action active"
      className="list-group-item list-group-item-action rounded mt-4 box-shadow h-md-200 shadow"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.orderType}</h5>
        <small>
          {/* 3 days ago */}
          {<ReactTimeAgo date={props.orderDate} locale="en-US" />}
        </small>
      </div>
      <p className="card-title mb-3">order ID: {props.id}</p>
      <p>
        Order state:
        {neww ? (
          <strong className="d-inline-block mb-2 text-warning">
            &nbsp;{props.orderState}
          </strong>
        ) : accepted ? (
          <strong className="d-inline-block mb-2 text-success">
            &nbsp;{props.orderState}
          </strong>
        ) : null}
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
                  {item.price} sᴀʀ
                </div>
                <span className="badge bg-primary rounded-pill">
                  {item.quantite}
                </span>
              </li>

              // <div key={index} className="d-flex justify-content-between">
              //   <span className="font-weight-bold">
              //     {item.name}(Qty:{item.quantite})
              //   </span>
              //   <span className="text-muted">{item.price}SAR</span>
              // </div>
            );
          })}
        </ol>

        {props.reservationInfo !== null ? (
          <>
            <br></br>
            <span className="theme-color">
              reservation details <FontAwesomeIcon icon={faCreditCard} />
            </span>
            <div className="mb-3">
              <hr className="new1" />
            </div>

            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  Person number: {props.reservationInfo.personNumber}
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  Time: {props.reservationInfo.time}
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  Date: {props.reservationInfo.date}
                </div>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  Reservation time: {props.reservationInfo.reservationTime}
                </div>
              </div>
            </li>
          </>
        ) : null}
        <br></br>

        {props.notes ? (
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Note
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={""}
              value={props.notes}
              disabled
            />
          </div>
        ) : null}

        <span className="theme-color">
          Payment Summary <FontAwesomeIcon icon={faCreditCard} />
        </span>
        <div className="mb-3">
          <hr className="new1" />
        </div>
        <div className="d-flex justify-content-between">
          <span className="font-weight-bold">
            {/* {item.name}(Qty:{item.quantite}) */}
            <FontAwesomeIcon icon={faPhone} /> {props.customerNumber}
          </span>
          {/* <span className="text-muted">{item.price}SAR</span> */}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <span className="font-weight-bold">
            Total 💰
            {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
          </span>
          <span className="font-weight-bold theme-color">
            {props.subTotal}SAR
          </span>
          {/* <div className="col-md-6 d-flex align-items-center justify-content-center"></div> */}
        </div>

        <br />
        {neww ? (
          <div className="row ">
            <button
              style={{ marginLeft: "6%" }}
              className="col-md-5  btn btn-outline-success btn-sm mt-2"
              type="button"
              onClick={(e) => sendState(e, "accept", props.id)}
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Accept"}`}
            >
              Accept ✔{/* <FontAwesomeIcon icon={faRotate} /> */}
            </button>
            <button
              style={{ marginLeft: "6%" }}
              className="col-md-5 btn btn-outline-danger btn-sm mt-2"
              type="button"
              onClick={(e) => sendState(e, "reject", props.id)}
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Reject"}`}
            >
              Reject ❌{/* <FontAwesomeIcon icon={faRotate} /> */}
            </button>
          </div>
        ) : (
          <div className="row">
            <button
              style={{ marginLeft: "6%" }}
              className=" btn col-md-5 btn-outline-primary btn-sm mt-2"
              type="button"
              onClick={(e) => sendState(e, "done", props.id)}
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Done"}`}
            >
              Done ☑{/* <FontAwesomeIcon icon={faRotate} /> */}
            </button>
            <button
              style={{ marginLeft: "6%" }}
              className=" btn col-md-5 btn-outline-danger btn-sm mt-2"
              type="button"
              onClick={(e) => sendState(e, "cancel", props.id)}
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Cancel"}`}
            >
              Cancel ⛔{/* <FontAwesomeIcon icon={faRotate} /> */}
            </button>
          </div>
        )}
        <hr />
      </div>
      {/* <p className="mb-1">Some placeholder content in div paragraph.</p>
      <small>And some small print.</small> */}
    </div>
  );
}
