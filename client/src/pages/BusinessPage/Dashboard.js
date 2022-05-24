import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../helper/Options";
import { UserContext } from "../../context/UserContext";
import NewOrders from "../../components/NewOrders";

export default function Dashboard() {
  const [userContext, setUserContext] = useContext(UserContext);

  const [newOrders, setNewOrders] = useState();
  const [activeOrder, setActiveOrder] = useState();

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  let navigate = useNavigate();

  const getNewOrders = useCallback(async () => {
    // setError("");
    if (userContext.details?.workIn) {
      fetch(url + "user/business/order/showNewOrder", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      })
        .then(async (res) => {
          let aa = await res.json();
          if (res.ok) {
            setNewOrders(aa);
            // setSuccssed(true);
            setTimeout(getNewOrders, 10000);
          } else {
            errorAlert("Something went wrong! Please try again later.");
          }
        })
        .catch((error) => {
          errorAlert(error);
        });
    }
  }, [setNewOrders]);

  useEffect(() => {
    // if (isverifyUserDone.current) {
    //   isverifyUserDone.current = false;
    getNewOrders();
    // }
  }, [getNewOrders]);

  useEffect(() => {
    handleData();
  }, [newOrders]);

  function handleData() {
    if (newOrders) {
      return newOrders
        .map((order, index) => {
          return (
            <>
              <NewOrders
                updateOrders={getNewOrders}
                key={index}
                id={order._id}
                reservationInfo={order.reservationInfo}
                orderType={order.orderType}
                orderState={order.orderState}
                customerNumber={order.customerNumber}
                items={order.items}
                subTotal={order.subTotal}
                notes={order.notes}
                orderDate={order.orderDate}
                businessName={order.BusinessName}
              />
            </>
          );
        })
        .reverse();
    }
  }
  return (
    // <div className="page-notFound d-flex flex-row align-items-center">
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-md-12 text-center">
    //         <span className="display-1 d-block">
    //           {" "}
    //           🏪
    //           <img
    //             style={{ maxWidth: "10% " }}
    //             src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
    //             className="card-image"
    //             alt={useContext.menu?.name + " logo"}
    //           />{" "}
    //           🏪
    //         </span>
    //         <div className="mb-4 lead">this is Dashboard .</div>
    <>
      <section className="py-5">
        <div className="container">
          <div className="card mb-3 max-width-880 ">
            <div className="row g-0 ">
              {userContext?.menu ? (
                <>
                  <div className="col-md-4">
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`data:${userContext.menu.logoMimetype};base64,${userContext.menu.logo}`}
                      className="card-image"
                      alt={useContext.menu?.name + " logo"}
                    />
                    {/* <img
                            style={{ maxWidth: "50% " }}
                            src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                            className="card-image"
                            alt={useContext.menu?.name + " logo"}
                          /> */}
                  </div>
                  <div className="col-md-5">
                    <div className="card-body">
                      <h5 className="card-title">{userContext.menu.name}</h5>
                      <p className="card-text">
                        {userContext.menu.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <img
                      style={{ maxWidth: "70% " }}
                      src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                      className="card-image"
                      alt={useContext.menu?.name + " logo"}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {/* <a onClick={() => navigate("/")} className="btn btn-link">
        Back to Home
      </a> */}
      {/* <div className="container py-5 "> use this inseted 👨‍🏫 */}
      <div className="container py-5 ">
        <div className="row g-0 ">
          <div className="col-md-2"></div>
          <div className="col-md-6"> complete Active Orders here 😀</div>
          <div className="col-md-4">
            <div className="list-group ">
              {/* <br /> */}
              <div className="m-5 rounded">
                {newOrders ? (
                  <div
                    href="#"
                    // className="list-group-item list-group-item-action active"
                    className="list-group-item list-group-item-action text-center "
                    aria-current="true"
                  >
                    <h3>New Orders</h3>
                    {handleData()}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    /* </div>
        </div>
      </div>
    </div> */
  );
}
