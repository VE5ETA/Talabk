import React, { useEffect, useState } from "react";
import OrdersInfo from "../components/OrdersInfo";
import { errorAlert, successAlert } from "../helper/Options";

export default function Orders() {
  const [customerNumber, setCustomerNumber] = useState("");
  const [ordersInfo, setOrdersInfo] = useState();

  const [succssed, setSuccssed] = useState(false);

  const phoneRegex = new RegExp(
    /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
  );

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    handleData();
  }, [ordersInfo]);

  function handleData() {
    if (ordersInfo) {
      return ordersInfo
        .map((order, index) => {
          return (
            <OrdersInfo
              key={index}
              id={order._id}
              orderDate={order.orderDate}
              orderState={order.orderState}
              subTotal={order.subTotal}
              items={order.items}
              businessName={order.BusinessName}
              getOrdersInfo={getOrdersInfo}
            />
          );
        })
        .reverse();
    }
  }

  function getOrdersInfo(e) {
    // setError("");
    if (phoneRegex.test(customerNumber)) {
      fetch(url + "customer/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerNumber: customerNumber,
        }),
      })
        .then(async (res) => {
          let aa = await res.json();
          if (res.ok) {
            setOrdersInfo(aa);
            setSuccssed(true);
            setTimeout(getOrdersInfo, 5000);
          } else if (res.status === 404) {
            errorAlert("you didn't have order");
          } else {
            errorAlert("Something went wrong! Please try again later.");
          }
        })
        .catch((error) => {
          errorAlert("Something went wrong! Please try again later.");
        });
    } else {
      errorAlert("number is invalid");
    }
  }

  if (succssed) {
    return (
      <div className="container mt-2 res-card">
        <div className="row">
          <div>{handleData()}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="create-form mt-5">
        <div className="wrapper rounded bg-white ">
          <div className="h3">Enter phone number</div>
          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Phone number</label>
                <input
                  name="tradeName"
                  id="tradeName"
                  type="text"
                  className="form-control"
                  onChange={(e) => setCustomerNumber(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => {
                getOrdersInfo();
              }}
              type="submit"
              className="btn btn-primary mt-3"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <input onChange={(e) => setCustomerNumber(e.target.value)}></input>
        <button
          onClick={() => {
            getOrdersInfo();
          }}
        >
          send
        </button> */
}
