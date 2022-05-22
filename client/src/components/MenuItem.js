import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faRotate,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
// import { addItem } from "../helper/OrderInfo";
import { UserContext } from "../context/UserContext";
import { errorAlert, successAlert } from "../helper/Options";

export default function MenuItem(props) {
  const [userContext, setUserContext] = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;
  // const [localRestaurant, setLocalRestaurant] = useState(
  //   JSON.parse(localStorage.getItem(props.username))
  // );
  // console.log(customerContext);
  const [quantite, setQuantite] = useState(1);
  const [itemDetail, setItemDetail] = useState();
  let isMounted = useRef(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");
  const [clicked, setClicked] = useState(false);
  const dRef = useRef(false);
  const formRef = useRef();
  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succss) {
      successAlert(succss);

      props.itemDone();
    }
  }, [error, succss]);

  useEffect(() => {
    if (dRef.current) {
    }
  }, [dRef.current]);

  // function plus() {
  //   if (quantite != 30) {
  //     setQuantite(quantite + 1);
  //   }
  // }
  // function min() {
  //   if (quantite > 1) {
  //     setQuantite(quantite - 1);
  //   } else {
  //     setIsClicked(false);
  //     // console.log(customerContext);

  //     setCustomerContext((oldValues) => {
  //       return {
  //         ...oldValues,
  //         dd: delete oldValues.items[props.id],
  //       };
  //     });
  //     localStorage.setItem(props.username, JSON.stringify(customerContext));
  //   }
  // }

  // useEffect(() => {
  //   setLocalStorage();
  // }, [localRestaurant]);

  // function setLocalStorage() {
  //   if (localStorage.getItem(props.username)) {
  //     localStorage.setItem(props.username, JSON.stringify(localRestaurant));
  //   } else {
  //     localStorage.setItem(props.username, JSON.stringify(localRestaurant));
  //   }
  // }

  // check item it is in cart if update quantite
  // useEffect(() => {
  //   if (customerContext?.items !== undefined) {
  //     if (customerContext?.items[props.id]) {
  //       // console.log(customerContext.items[`${props.id}`]?.quantite);
  //       // console.log(customerContext.items[props.id].quantite);
  //       setQuantite(customerContext.items[props.id].quantite);
  //       setIsClicked(true);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     updateItem();
  //   }
  // }, [quantite]);

  // function updateItem() {
  //   setItemDetail({
  //     id: props.id,
  //     price: props.price,
  //     name: props.name,
  //     quantite: quantite,
  //   });
  // }

  // useEffect(() => {
  //   setLocalRestaurant((oldValues) => {
  //     return {
  //       businessID: props.businessID,
  //     };
  //   });
  // }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     setCustomerContext((oldValues) => {
  //       if (oldValues?.items) {
  //         return {
  //           ...oldValues,
  //           // businessID: props.businessID,
  //           items: {
  //             ...oldValues.items,
  //             [itemDetail.id]: itemDetail,
  //           },
  //         };
  //       } else {
  //         return {
  //           ...oldValues,
  //           items: { [itemDetail.id]: itemDetail },
  //         };
  //       }
  //     });
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [itemDetail]);

  // function editItem() {
  //   setIsClicked(true);
  //   updateItem();
  // }

  function deleteItem(e) {
    try {
      if (clicked) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccss("");

        // const formData = new FormData(formRef.current);
        // if (!name) {
        //   setError("item name is required!");
        // } else if (!price) {
        //   setError("item price is required!");
        // } else if (!item) {
        //   setError("item logo required!");
        // } else {
        fetch(url + "user/business/menu/Item", {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({
            ID: props.id,
          }),
          headers: { Authorization: `Bearer ${userContext.token}` },
        })
          .then(async (response) => {
            setIsSubmitting(false);
            const resJson = await response.json();
            if (!response.ok) {
              if (response.status === 403) {
                setError(resJson.message);
              } else {
                setError(resJson.message.message);
              }
            } else {
              setSuccss(resJson.message);
            }
          })
          .catch((error) => {
            setIsSubmitting(false);
            setError(error);
          });
        // }
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="col-md-4 menu-item-card">
      <div className="card flex-md-row mb-4 box-shadow h-md-200 shadow p-2 mb-5 bg-body rounded">
        <div className="card-body d-flex flex-column ">
          <img
            src={props.img}
            className="flex-auto d-md-block menu-item-img mb-2"
            alt="Card cap"
          />
          <h3 className="mb-0">
            <div
              style={{ wordBreak: "break-all" }}
              className="text-dark text-decoration-none"
              href="#"
            >
              {props.name}
            </div>
          </h3>
          {/* <div className="mb-1 text-muted">Description</div>
          <p className="card-text mb-auto ">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p> */}
          <div className="d-flex align-items-center d-inline-block mt-2">
            <div className="align-items-center ">
              <h5 className="mr-1">
                {props.price} SAR <FontAwesomeIcon icon={faTags} />
              </h5>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-outline-danger btn-lg mt-2"
                type="button"
                onClick={() => (dRef.current = true)}
              >
                Delete <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <button
                className=" btn btn-outline-primary btn-lg mt-2"
                type="button"
                // onClick={editItem}
              >
                Edit <FontAwesomeIcon icon={faRotate} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
