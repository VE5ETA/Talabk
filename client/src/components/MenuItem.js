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

import LoadingSpinner from "../components/LoadingSpinner";

export default function MenuItem(props) {
  const [userContext, setUserContext] = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [itemStatus, setItemStatus] = useState(props.status);

  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const [item, setItem] = useState(props.item);
  const [itemPreview, setItemPreview] = useState(props.img);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setItemPreview(URL.createObjectURL(item));
    }
  }, [item]);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");
  const formRef = useRef();
  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succss) {
      successAlert(succss);
      // props.itemDone();
    }
  }, [error, succss]);

  const editItem = (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      setSuccss("");

      setIsLoading(true);

      const formData = new FormData(formRef.current);
      formData.append("ID", props.id);
      fetch(url + "user/business/menu/Item", {
        method: "PUT",
        credentials: "include",
        body: formData,
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
            setUpdateMode(false);
            await props.itemDone();
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError(error);
    }
  };

  function deleteItem() {
    try {
      // if (clicked) {
      // e.preventDefault();
      setIsSubmitting(true);
      setError("");
      setSuccss("");

      setIsLoading(true);

      fetch(url + "user/business/menu/Item", {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({
          ID: props.id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
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
            await props.itemDone();
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      // }
      // }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="col-md-4 menu-item-card">
      <div className="card flex-md-row mb-4 box-shadow h-md-200 shadow p-2 mb-5 bg-body rounded">
        <div className="card-body d-flex flex-column ">
          {updateMode ? (
            <>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <form className="form" onSubmit={editItem} ref={formRef}>
                  <img
                    id="frame"
                    src={itemPreview}
                    className="flex-auto d-md-block menu-item-img mb-3"
                    alt="Card cap"
                  />
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Name</span>
                    </div>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Price</span>
                    </div>
                    <input
                      name="price"
                      id="price"
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        SAR <FontAwesomeIcon icon={faTags} />
                      </span>
                    </div>
                  </div>

                  <div className="form-check form-switch">
                    {itemStatus ? (
                      <>
                        <input
                          name="status"
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="status"
                          value={itemStatus}
                          onChange={() => setItemStatus(!itemStatus)}
                        />
                        <label
                          className="form-check-label text-success "
                          htmlFor="flexSwitchCheckDefault"
                        >
                          Active
                        </label>
                      </>
                    ) : (
                      <>
                        <input
                          name="status"
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="status"
                          value={itemStatus}
                          onChange={() => setItemStatus(!itemStatus)}
                        />
                        <label
                          className="form-check-label text-danger"
                          htmlFor="flexSwitchCheckDefault"
                        >
                          disabled
                        </label>
                      </>
                    )}
                  </div>

                  <div className="d-flex align-items-center d-inline-block mt-2">
                    <div className="align-items-center ">
                      <h5 className="mr-1">
                        {/* <label>item logo</label> */}
                        <input
                          name="item"
                          id="item"
                          className="form-control"
                          type="file"
                          onChange={(e) => setItem(e.target.files[0])}
                        />
                      </h5>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-danger btn-sm mt-2"
                        type="button"
                        onClick={() => setUpdateMode(false)}
                      >
                        Cancel <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <button
                        className=" btn btn-outline-primary btn-sm mt-2"
                        type="submit"
                        disabled={isSubmitting}
                        text={`${isSubmitting ? "..." : "Done"}`}
                        // onClick={() => editItem()}
                      >
                        Done <FontAwesomeIcon icon={faRotate} />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
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
                  {props.status ? (
                    <strong className="d-inline-block mb-2 text-success">
                      Active
                    </strong>
                  ) : (
                    <strong className="d-inline-block mb-2 text-danger">
                      Disabled
                    </strong>
                  )}

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
                        className="btn btn-outline-danger btn-sm mt-2"
                        type="button"
                        onClick={() => {
                          deleteItem();
                        }}
                      >
                        Delete <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>

                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <button
                        className=" btn btn-outline-primary btn-sm mt-2"
                        type="button"
                        onClick={() => setUpdateMode(true)}
                      >
                        Edit <FontAwesomeIcon icon={faRotate} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
