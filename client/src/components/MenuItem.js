import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTags } from "@fortawesome/free-solid-svg-icons";
// import { addItem } from "../helper/OrderInfo";
import { CustomerContext } from "../context/CustomerContext";

export default function MenuItem(props) {
  const [customerContext, setCustomerContext] = useContext(CustomerContext);
  const [isClicked, setIsClicked] = useState(false);
  // const [localRestaurant, setLocalRestaurant] = useState(
  //   JSON.parse(localStorage.getItem(props.username))
  // );
  // console.log(customerContext);
  const [quantite, setQuantite] = useState(1);
  const [itemDetail, setItemDetail] = useState();
  let isMounted = useRef(false);

  function plus() {
    if (quantite != 30) {
      setQuantite(quantite + 1);
    }
  }
  function min() {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    } else {
      setIsClicked(false);
      // console.log(customerContext);

      setCustomerContext((oldValues) => {
        return {
          ...oldValues,
          dd: delete oldValues.items[props.id],
        };
      });
      localStorage.setItem(props.username, JSON.stringify(customerContext));
    }
  }

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
  useEffect(() => {
    if (customerContext?.items !== undefined) {
      if (customerContext?.items[props.id]) {
        // console.log(customerContext.items[`${props.id}`]?.quantite);
        // console.log(customerContext.items[props.id].quantite);
        setQuantite(customerContext.items[props.id].quantite);
        setIsClicked(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      updateItem();
    }
  }, [quantite]);

  function updateItem() {
    setItemDetail({
      id: props.id,
      price: props.price,
      name: props.name,
      quantite: quantite,
    });
  }

  // useEffect(() => {
  //   setLocalRestaurant((oldValues) => {
  //     return {
  //       businessID: props.businessID,
  //     };
  //   });
  // }, []);

  useEffect(() => {
    if (isMounted.current) {
      setCustomerContext((oldValues) => {
        if (oldValues?.items) {
          return {
            ...oldValues,
            // businessID: props.businessID,
            items: {
              ...oldValues.items,
              [itemDetail.id]: itemDetail,
            },
          };
        } else {
          return {
            ...oldValues,
            items: { [itemDetail.id]: itemDetail },
          };
        }
      });
    } else {
      isMounted.current = true;
    }
  }, [itemDetail]);

  function addToCart() {
    setIsClicked(true);
    updateItem();
  }

  return (
    <div className="col-md-4 menu-item-card">
      <div className="card flex-md-row mb-4 box-shadow h-md-200 shadow p-2 mb-5 bg-body rounded">
        <div className="card-body d-flex flex-column align-items-start">
          <img
            src={props.img}
            className="flex-auto d-md-block menu-item-img mb-2"
            alt="Card image cap"
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

          {!isClicked ? (
            <button
              className="container btn btn-outline-primary btn-sm mt-2"
              type="button"
              onClick={addToCart}
            >
              Add to Card
            </button>
          ) : (
            <div className="d-flex gap-1 align-items-center d-inline-block mt-2 mb-2">
              <button
                onClick={min}
                className="btn btn-outline-danger ml-2"
                type="button"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <label
                id="quan"
                style={{ width: "auto" }}
                className="form-control"
              >
                {quantite}
              </label>
              <button
                onClick={plus}
                className="btn btn-outline-success"
                type="button"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
