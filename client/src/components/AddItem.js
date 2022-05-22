import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

// import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../helper/Options";

export default function MenuItem(props) {
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;
  const [userContext, setUserContext] = useContext(UserContext);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [item, setItem] = useState();
  const [itemPreview, setItemPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E-EVCmmhLN51ydEr1uFEgcur-yGtBNOaT83DaRj4-O_eAYWW8gaGsLad35PJTVPD8l0&usqp=CAU"
  );

  useEffect(() => {
    if (item) {
      setItemPreview(URL.createObjectURL(item));
    }
  }, [item]);

  // const navigate = useNavigate();

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
      // setUserContext((old) => {
      //   old.fetch = true;
      //   return old;
      // });
      // navigate("/AfterLog");
      props.itemDone();
    }
  }, [error, succss]);

  const formSubmitHandler = (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      setSuccss("");

      const formData = new FormData(formRef.current);
      if (!name) {
        setError("item name is required!");
      } else if (!price) {
        setError("item price is required!");
      } else if (!item) {
        setError("item logo required!");
      } else {
        fetch(url + "user/business/menu/Item", {
          method: "POST",
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
            }
          })
          .catch((error) => {
            setIsSubmitting(false);
            setError(error);
          });
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className="col-md-4 menu-item-card">
      <div className="card flex-md-row mb-4 box-shadow h-md-200 shadow p-2 mb-5 bg-body rounded">
        <form className="form" onSubmit={formSubmitHandler} ref={formRef}>
          <div className="card-body d-flex flex-column align-items-start">
            <img
              id="frame"
              src={itemPreview}
              className="flex-auto d-md-block menu-item-img mb-3"
              required
              alt="Card cap"
            />

            {/*  */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Name</span>
              </div>
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/*  */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Price</span>
              </div>
              <input
                name="price"
                id="price"
                type="number"
                className="form-control"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  SAR <FontAwesomeIcon icon={faTags} />
                </span>
              </div>
            </div>
            {/*  */}

            <div className="d-flex align-items-center d-inline-block mt-2">
              <div className="align-items-center ">
                <h5 className="mr-1">
                  {/* <label>item logo</label> */}
                  <input
                    name="item"
                    id="item"
                    className="form-control"
                    type="file"
                    required
                    onChange={(e) => setItem(e.target.files[0])}
                  />
                </h5>
              </div>
            </div>

            <button
              id="AddItem"
              className="container btn btn-outline-primary btn-sm mt-2"
              type="submit"
              // onClick={editItem}
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Create"}`}
            >
              Add <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
