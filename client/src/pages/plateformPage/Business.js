import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import VerifyBuz from "../../components/VerifyBuz";
import { errorAlert, successAlert } from "../../helper/Options";

export default function Business() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [Buz, setBuz] = useState([]);

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

  const getBusiness = useCallback(async () => {
    // setError("");
    if (isWorking.current) {
      setIsWorkingg(false);
      isWorking.current = false;
      if (userContext.details?.workIn) {
        await fetch(url + "user/platform/showBusiness", {
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
              setBuz(aa);
              // setSuccssed(true);

              // setTimeout(getBusiness, 10000);
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
  //   getBusiness();
  //   // }
  // }, [getBusiness]);

  let isGetNewOrders = useRef(true);
  const [isWorkingg, setIsWorkingg] = useState(false);

  useEffect(() => {
    if (isWorkingg) {
      setTimeout(getBusiness, 10000);

      // isWorkingg.current = false;
    } else {
      if (isGetNewOrders.current) {
        isGetNewOrders.current = false;
        getBusiness();
      }
    }
    // else {
    //   isWorking.current = true;
    // }
  }, [getBusiness, isWorkingg]);

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
  }, [Buz]);

  function handleData() {
    if (Buz) {
      return Buz.map((buz, index) => {
        return (
          <VerifyBuz
            key={index}
            xxx={index}
            updateBuz={getBusiness}
            id={buz._id}
            ownerID={buz.ownerID}
            tradeName={buz.tradeName}
            branchID={buz.branchID}
            businessType={buz.businessType}
            businessStatus={buz.businessStatus}
            businessState={buz.businessState}
            createdAt={buz.createdAt}
            updatedAt={buz.updatedAt}
            // LegalDocs={buz.LegalDocs} // not needed removed with update v2.0 ⭕
          />
        );
      }).reverse(); // this is worng don't use this, you supposed to handle old orders first 📞
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
                {Buz[0] ? (
                  <div
                    // className="list-group-item list-group-item-action active"
                    className="list-group-item text-center "
                    aria-current="true"
                  >
                    <h3>New Business Verify requests ⏲</h3>
                    <table className="table table-hover">
                      <thead className="">
                        <tr>
                          <th scope="col">#</th>
                          {/* use it after fix 🤨 */}
                          <th scope="col">Business Trade Name</th>
                          <th scope="col">Business Branch Id</th>
                          <th scope="col">Business owner</th>
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
                    <h3 style={{ minHeight: "555px" }}>
                      New Business Verify requests ⏲
                    </h3>

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
