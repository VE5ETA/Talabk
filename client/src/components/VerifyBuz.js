import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "bootstrap/js/dist/modal";
// import { Modal } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  // faMoneyBill,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { errorAlert, successAlert } from "../helper/Options";
import { UserContext } from "../context/UserContext";
TimeAgo.addDefaultLocale(en);

export default function VerifyBuz(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [legal, setLegal] = useState();
  const modalRef = useRef();
  const showModal = () => {
    getDoc();
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      // backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  // useEffect(() => {
  //   // setTimeout(() => {
  //   pdff();
  //   // }, 2000);
  // }, [props.LegalDocs.pdf]);

  function pdff() {
    return (
      <div
        className="modal fade"
        ref={modalRef}
        // aria-labelledby="exampleModalLabel"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-xl ">
          <div className="modal-content " style={{ height: 800 }}>
            <div className="modal-header ">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              ...
              {props.ownerID.name}
              <embed
                style={{ height: "100%" }}
                src={legalDoc}
                type="application/pdf"
                width="100%"
              ></embed>
            </div>
            <div className="modal-footer d-flex justify-content-center mx-2">
              {/* <div className="row "> */}
              <button
                // style={{ marginLeft: "6%" }}
                className="col-md-5  btn btn-outline-success btn-sm mt-2"
                type="button"
                onClick={(e) => sendState(e, "accept", props.id)}
                disabled={isSubmitting}
                text={`${isSubmitting ? "..." : "Accept"}`}
              >
                Accept ✔{/* <FontAwesomeIcon icon={faRotate} /> */}
              </button>
              <button
                // style={{ marginLeft: "6%" }}
                className="col-md-5 btn btn-outline-danger btn-sm mt-2"
                type="button"
                onClick={(e) => sendState(e, "reject", props.id)}
                disabled={isSubmitting}
                text={`${isSubmitting ? "..." : "Reject"}`}
              >
                Reject ❌{/* <FontAwesomeIcon icon={faRotate} /> */}
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");

  const [legalDoc, setLegalDoc] = useState();

  // let getDocIsWorking = useRef(true);
  // useEffect(() => {
  //   if (getDocIsWorking.current) {
  //     getDocIsWorking.current = true;
  //     getDoc();
  //   }
  // }, []);

  async function getDoc() {
    await fetch(url + `user/platform/getLegalDoc`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({
        ID: props.id,
      }),
    })
      .then(async (res) => await res.blob())
      .then(async (res) => {
        const podf = await URL.createObjectURL(res);
        console.log(podf);
        // let xx = await res.json();
        // let xx = await res.blob();
        // console.log(xx);
        if (res) {
          console.log(res);
          setLegalDoc(podf);
        } else {
          setLegalDoc("");
        }
      });
  }

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

  // useEffect(() => {
  //   if (!neww && !accepted && !done && !canceled && !rejected) {
  //     editState();
  //   }
  // }, []);

  // function editState() {
  //   if (props.orderState === "new") {
  //     setNeww(true);
  //   } else if (props.orderState === "accepted") {
  //     setAccepted(true);
  //   } else if (props.orderState === "done") {
  //     setDone(true);
  //   } else if (props.orderState === "rejected") {
  //     setRejected(true);
  //   }
  // }

  //this isn't needed ;)
  // const hideModal = () => {
  //   const modalEle = modalRef.current;
  //   const bsModal = Modal.getInstance(modalEle);
  //   bsModal.hide();
  // };

  return (
    <tr className="">
      {/* <td className="">{props.key}</td> use it after fix 🤨 */}
      <td className="">{props.tradeName}</td>
      <td className="">{props.branchID}</td>
      <td className="">{props.ownerID.name}</td>
      <td className="">
        {<ReactTimeAgo date={props.updatedAt} locale="en-US" />}
      </td>
      <td className="">
        {
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={showModal}
          >
            Review legal document
          </button>
        }
      </td>
      {pdff()}
    </tr>
  );

  // return (
  //   <div
  //     href="#"
  //     // className="list-group-item list-group-item-action active"
  //     className="list-group-item list-group-item-action rounded mt-4 box-shadow h-md-200 shadow"
  //     aria-current="true"
  //   >
  //     <div className="d-flex w-100 justify-content-between">
  //       <h5 className="mb-1">{props.tradeName}</h5>
  //       <small>
  //         {/* 3 days ago */}
  //         {<ReactTimeAgo date={props.updatedAt} locale="en-US" />}
  //       </small>
  //     </div>
  //     <p className="card-title mb-3">request ID: {props.id}</p>
  //     <p className="card-title mb-3">owner ID: {props.ownerID}</p>
  //     {/* <p>
  //       Business state:
  //       {
  //         // neww ? (
  //         <strong className="d-inline-block mb-2 text-warning">
  //           &nbsp;{props.businessState}
  //         </strong>
  //         // ) : accepted ? (
  //         //   <strong className="d-inline-block mb-2 text-success">
  //         //     &nbsp;{props.orderState}
  //         //   </strong>
  //         //   ) : null
  //       }
  //     </p> */}
  //     <div className="">
  //       <span className="theme-color d-flex align-items-start">
  //         <b>Business details</b>
  //       </span>
  //       <div className="mb-3">
  //         <hr className="new1" />
  //       </div>
  //       {/* <ol className="list-group list-group-numbered"> */}
  //       {
  //         // Object.values(props.items).map((item, index) => {
  //         // return (
  //         <ol
  //           // key={props.key}
  //           className="list-group-item d-flex align-items-start"
  //         >
  //           {/* <div className="ms-2 me-auto"> */}
  //           <div className="fw-bold">
  //             Business Trade Name: {props.tradeName}
  //           </div>
  //           <br></br>
  //           Business Branch Id: {props.branchID}
  //           <br></br>
  //           Business state:
  //           {
  //             // neww ? (
  //             <strong className="d-inline-block mb-2 text-warning">
  //               &nbsp;{props.businessState}
  //             </strong>
  //             // ) : accepted ? (
  //             //   <strong className="d-inline-block mb-2 text-success">
  //             //     &nbsp;{props.orderState}
  //             //   </strong>
  //             //   ) : null
  //           }
  //           {/* </div> */}
  //           <div className="ms-2 me-auto">
  //             <button
  //               type="button"
  //               className="btn btn-primary"
  //               data-bs-toggle="modal"
  //               data-bs-target="#exampleModal"
  //             >
  //               Launch demo modal
  //             </button>
  //             <div
  //               className="modal fade"
  //               id="exampleModal"
  //               tabindex="-1"
  //               aria-labelledby="exampleModalLabel"
  //               aria-hidden="true"
  //             >
  //               <div className="modal-dialog modal-xl">
  //                 <embed
  //                   src={`data:application/pdf;base64,${props.buzdocs.pdf}`}
  //                   type="application/pdf"
  //                   width="100%"
  //                 ></embed>
  //               </div>
  //             </div>
  //           </div>
  //           {/* <span className="badge bg-primary rounded-pill">
  //               {item.quantite}
  //             </span> */}
  //         </ol>

  //         // <div key={index} className="d-flex justify-content-between">
  //         //   <span className="font-weight-bold">
  //         //     {item.name}(Qty:{item.quantite})
  //         //   </span>
  //         //   <span className="text-muted">{item.price}SAR</span>
  //         // </div>
  //         // );
  //         // })
  //       }
  //       {/* </ol> */}

  //       {/* {props.reservationInfo !== null ? (
  //         <>
  //           <br></br>
  //           <span className="theme-color">
  //             reservation details <FontAwesomeIcon icon={faCreditCard} />
  //           </span>
  //           <div className="mb-3">
  //             <hr className="new1" />
  //           </div>

  //           <li className="list-group-item d-flex justify-content-between align-items-start">
  //             <div className="ms-2 me-auto">
  //               <div className="fw-bold">
  //                 Person number: {props.reservationInfo.personNumber}
  //               </div>
  //             </div>
  //           </li>
  //           <li className="list-group-item d-flex justify-content-between align-items-start">
  //             <div className="ms-2 me-auto">
  //               <div className="fw-bold">
  //                 Time: {props.reservationInfo.time}
  //               </div>
  //             </div>
  //           </li>
  //           <li className="list-group-item d-flex justify-content-between align-items-start">
  //             <div className="ms-2 me-auto">
  //               <div className="fw-bold">
  //                 Date: {props.reservationInfo.date}
  //               </div>
  //             </div>
  //           </li>
  //           <li className="list-group-item d-flex justify-content-between align-items-start">
  //             <div className="ms-2 me-auto">
  //               <div className="fw-bold">
  //                 Reservation time: {props.reservationInfo.reservationTime}
  //               </div>
  //             </div>
  //           </li>
  //         </>
  //       ) : null} */}
  //       <br></br>

  //       {/* {props.notes ? (
  //         <div className="mb-3">
  //           <label htmlFor="exampleFormControlTextarea1" className="form-label">
  //             Note
  //           </label>
  //           <textarea
  //             className="form-control"
  //             id="exampleFormControlTextarea1"
  //             rows={3}
  //             defaultValue={""}
  //             value={props.notes}
  //             disabled
  //           />
  //         </div>
  //       ) : null} */}

  //       {/* <span className="theme-color">
  //         Payment Summary <FontAwesomeIcon icon={faCreditCard} />
  //       </span>
  //       <div className="mb-3">
  //         <hr className="new1" />
  //       </div>
  //       <div className="d-flex justify-content-between"> */}
  //       {/* <span className="font-weight-bold"> */}
  //       {/* {item.name}(Qty:{item.quantite}) */}
  //       {/* <FontAwesomeIcon icon={faPhone} /> {props.customerNumber} */}
  //       {/* </span> */}
  //       {/* <span className="text-muted">{item.price}SAR</span> */}
  //       {/* </div> */}

  //       {/* <div className="d-flex justify-content-between mt-3"> */}
  //       {/* <span className="font-weight-bold"> */}
  //       {/* Total 💰 */}
  //       {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
  //       {/* </span> */}
  //       {/* <span className="font-weight-bold theme-color"> */}
  //       {/* {props.subTotal}SAR */}
  //       {/* </span> */}
  //       {/* <div className="col-md-6 d-flex align-items-center justify-content-center"></div> */}
  //       {/* </div> */}

  //       <br />
  //       {neww ? (
  //         <div className="row ">
  //           <button
  //             style={{ marginLeft: "6%" }}
  //             className="col-md-5  btn btn-outline-success btn-sm mt-2"
  //             type="button"
  //             onClick={(e) => sendState(e, "accept", props.id)}
  //             disabled={isSubmitting}
  //             text={`${isSubmitting ? "..." : "Accept"}`}
  //           >
  //             Accept ✔{/* <FontAwesomeIcon icon={faRotate} /> */}
  //           </button>
  //           <button
  //             style={{ marginLeft: "6%" }}
  //             className="col-md-5 btn btn-outline-danger btn-sm mt-2"
  //             type="button"
  //             onClick={(e) => sendState(e, "reject", props.id)}
  //             disabled={isSubmitting}
  //             text={`${isSubmitting ? "..." : "Reject"}`}
  //           >
  //             Reject ❌{/* <FontAwesomeIcon icon={faRotate} /> */}
  //           </button>
  //         </div>
  //       ) : (
  //         <div className="row">
  //           <button
  //             style={{ marginLeft: "6%" }}
  //             className=" btn col-md-5 btn-outline-primary btn-sm mt-2"
  //             type="button"
  //             onClick={(e) => sendState(e, "done", props.id)}
  //             disabled={isSubmitting}
  //             text={`${isSubmitting ? "..." : "Done"}`}
  //           >
  //             Done ☑{/* <FontAwesomeIcon icon={faRotate} /> */}
  //           </button>
  //           <button
  //             style={{ marginLeft: "6%" }}
  //             className=" btn col-md-5 btn-outline-danger btn-sm mt-2"
  //             type="button"
  //             onClick={(e) => sendState(e, "cancel", props.id)}
  //             disabled={isSubmitting}
  //             text={`${isSubmitting ? "..." : "Cancel"}`}
  //           >
  //             Cancel ⛔{/* <FontAwesomeIcon icon={faRotate} /> */}
  //           </button>
  //         </div>
  //       )}
  //       <hr />
  //     </div>
  //     {/* <p className="mb-1">Some placeholder content in div paragraph.</p>
  //     <small>And some small print.</small> */}
  //   </div>
  // );
}
