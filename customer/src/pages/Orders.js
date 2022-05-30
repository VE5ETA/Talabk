import React, { useEffect, useRef, useState, useCallback } from "react";
import OrdersInfo from "../components/OrdersInfo";
import { errorAlert, successAlert } from "../helper/Options";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Orders() {
  const [customerNumber, setCustomerNumber] = useState();
  const [ordersInfo, setOrdersInfo] = useState();
  // const [number, setNumber] = useState();

  const [succssed, setSuccssed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const phoneRegex = new RegExp(
  //   /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
  // );

  let haveNumber = useRef(localStorage.getItem("customerNumber"));
  let isDone = useRef(false);
  let repter = useRef(() => {
    setTimeout(() => {
      if (haveNumber.current) {
        getOrdersInfo();
      } else {
        clearTimeout(repter.current);
      }
    }, 5000);
  });

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    // setCustomerNumber(localStorage.getItem("customerNumber"));
    console.log(haveNumber.current);

    if (localStorage.getItem("customerNumber")) {
      setIsLoading(true);
      setSuccssed(true);
      getOrdersInfo();
      // localStorage.setItem("customerNumber", haveNumber.current);
      // setTimeout(getOrdersInfo, 5000);
    }
  }, [haveNumber.current]);

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

  const getOrdersInfo = useCallback(
    async (e) => {
      // setError("");
      // if (phoneRegex.test(customerNumber)) {
      if (haveNumber.current) {
        fetch(url + "customer/orders", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerNumber: haveNumber.current,
          }),
        })
          .then(async (res) => {
            // onlyOne.current = true;
            let aa = await res.json();
            if (res.ok) {
              setOrdersInfo(aa);
              localStorage.setItem("customerNumber", haveNumber.current);
              setSuccssed(true);
            } else if (res.status === 404) {
              localStorage.removeItem("customerNumber");
              errorAlert(
                "There's no order registered under this phone number."
              );
              setSuccssed(false);
            } else {
              localStorage.removeItem("customerNumber");
              errorAlert("Something went wrong! Please try again later.");
              setSuccssed(false);
            }
          })
          .catch((error) => {
            localStorage.removeItem("customerNumber");
            // onlyOne.current = true;
            setSuccssed(false);
            errorAlert("Something went wrong! Please try again later.");
          })
          .finally(() => {
            onlyOne.current = true;
            setIsLoading(false);
          });
      }
      // } else {
      //   errorAlert("number is invalid");
      // }
    },
    [url]
  );

  let onlyOne = useRef(true);

  useEffect(() => {
    if (onlyOne.current) {
      if (localStorage.getItem("customerNumber")) {
        onlyOne.current = false;
        repter.current();
        // var x = setTimeout(getOrdersInfo, 5000);
      }
      // else {
      //   return () => clearTimeout(x);
      // }
    }
  });

  if (succssed && haveNumber.current) {
    return (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="container mt-2 res-card">
            <div className="row">
              <div>{handleData()}</div>
              <div>
                <div className="card ">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        clearTimeout(repter.current);
                        setSuccssed(false);
                        haveNumber.current = null;
                        // localStorage.setItem("customerNumber", null);
                        localStorage.removeItem("customerNumber");
                      }}
                    >
                      Change Phone Number
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
                      // onChange={(e) => setCustomerNumber(e.target.value)}
                      onChange={(e) => (haveNumber.current = e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsLoading(true);
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
        )}
      </>
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
