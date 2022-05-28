import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import OldOrder from "../../components/OldOrder";
import { errorAlert, successAlert } from "../../helper/Options";

export default function Business() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [order, setNewBuz] = useState([]);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;
  let navigate = useNavigate();

  let isWorking = useRef(true);

  const getOrder = useCallback(async () => {
    // setError("");
    if (isWorking.current) {
      setIsWorkingg(false);
      isWorking.current = false;
      if (userContext.details?.workIn) {
        await fetch(url + "user/business/order/showOrder", {
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
              setNewBuz(aa);
              // setSuccssed(true);

              // setTimeout(getOrder, 10000);
            } else {
              errorAlert("Something went wrong! Please try again later.");
            }
          })
          // .then(async () => {
          //   await fetch(url + "user/business/order/showActiveOrder", {
          //     method: "GET",
          //     credentials: "include",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${userContext.token}`,
          //     },
          //   }).then(async (res) => {
          //     let xx = await res.json();
          //     if (res.ok) {
          //       await setActiveOrder(xx);
          //       // setSuccssed(true);
          //       // setTimeout(getNewOrders, 10000);
          //     } else {
          //       errorAlert("Something went wrong! Please try again later.");
          //     }
          //   });
          // })
          .catch((error) => {
            errorAlert(error);
          })
          .finally(() => {
            isWorking.current = true;
            setIsWorkingg(true);
          });
      }
    }
  }, [url, userContext.details?.workIn, userContext.token]);

  // useEffect(() => {
  //   // if (isverifyUserDone.current) {
  //   //   isverifyUserDone.current = false;
  //   getOrder();
  //   // }
  // }, [getOrder]);

  let isGetNewOrders = useRef(true);
  const [isWorkingg, setIsWorkingg] = useState(false);

  useEffect(() => {
    if (isWorkingg) {
      setTimeout(getOrder, 10000);

      // isWorkingg.current = false;
    } else {
      if (isGetNewOrders.current) {
        isGetNewOrders.current = false;
        getOrder();
      }
    }
    // else {
    //   isWorking.current = true;
    // }
  }, [getOrder, isWorkingg]);

  // return (
  //   <div className="page-notFound d-flex flex-row align-items-center">
  //     <div className="container">
  //       <div className="row justify-content-center">
  //         <div className="col-md-12 text-center">
  //           <span className="display-1 d-block">👮‍♂️🚨</span>
  //           <div className="mb-4 lead">this is AdminDashboard .</div>
  //           <a onClick={() => navigate("/")} className="btn btn-link">
  //             Back to Home
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  useEffect(() => {
    handleData();
  }, [order]);

  function handleData() {
    if (order) {
      return order
        .map((order, index) => {
          return (
            <OldOrder
              key={index}
              xxx={index}
              getOrder={getOrder}
              id={order._id}
              // ownerID={order.ownerID}
              businessID={order.businessID}
              reservationInfo={order.reservationInfo}
              BusinessName={order.BusinessName}
              orderType={order.orderType}
              orderState={order.orderState}
              customerNumber={order.customerNumber}
              tradeName={order.tradeName}
              subTotal={order.subTotal}
              items={order.items}
              notes={order.notes}
              orderDate={order.orderDate}
              tableNumber={order.tableNumber}
            />
          );
        })
        .reverse(); // this is worng don't use this, you supposed to handle old orders first 📞
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
      <section className="pt-5">
        <div className="container">
          <div className="card mb-3 max-width-880 ">
            <div className="row g-0 ">
              {/* {userContext?.menu ? (
                <>
                  <div className="col-md-4">
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`data:${userContext.menu.logoMimetype};base64,${userContext.menu.logo}`}
                      className="card-image"
                      alt={useContext.menu?.name + " logo"}
                    /> */}
              {/* <img
                            style={{ maxWidth: "50% " }}
                            src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                            className="card-image"
                            alt={useContext.menu?.name + " logo"}
                          /> */}
              {/* </div>
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
              ) : null} */}
            </div>
          </div>
        </div>
      </section>
      {/* <a onClick={() => navigate("/")} className="btn btn-link">
        Back to Home
      </a> */}
      {/* <div className=" py-5 "> use this inseted 👨‍🏫 */}
      <div className="">
        <div className="row g-0 ">
          {/* <div className="col-md-8"> */}
          <div className="">
            <div className="list-group ">
              {/* <br /> */}
              <div className="m-5 rounded ">
                {order[0] ? (
                  <div
                    // className="list-group-item list-group-item-action active"
                    className="list-group-item text-center "
                    aria-current="true"
                  >
                    <h3>All Orders ⏲</h3>
                    <table className="table table-hover">
                      <thead className="">
                        <tr>
                          <th scope="col">#</th>
                          {/* use it after fix 🤨 */}
                          <th scope="col">Customer Phone Number</th>
                          <th scope="col">Order Type</th>
                          <th scope="col">Order State</th>
                          <th scope="col">Sub Total</th>
                          <th scope="col">At</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>{handleData()}</tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    href="#"
                    // className="list-group-item list-group-item-action active"
                    className="list-group-item list-group-item-action text-center "
                    aria-current="true"
                  >
                    <h3 style={{ minHeight: "555px" }}>All Orders ⏲</h3>

                    {/* this isn't working need to fix  🔴 also do it for part below 😊 */}
                    {/* <div> No active orders yet</div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="container ">
              <div className="list-group ">

                <div className="m-5 rounded">
                  {newOrders[0] ? (
                    <div
                      href="#"
                      // className="list-group-item list-group-item-action active"
                      className="list-group-item list-group-item-action text-center "
                      aria-current="true"
                    >
                      <h3>New Orders 🔥</h3>
                      {handleData()}
                    </div>
                  ) : (
                    <div
                      href="#"
                      // className="list-group-item list-group-item-action active"
                      className="list-group-item list-group-item-action text-center "
                      aria-current="true"
                    >
                      <h3 style={{ minHeight: "555px" }}>New Orders 🔥</h3>
                      {handleData()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
    /* </div>
        </div>
      </div>
    </div> */
  );
}
