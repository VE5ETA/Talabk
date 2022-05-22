import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { errorAlert, successAlert } from "../../helper/Options";

export default function EditMenu(props) {
  const [userContext, setUserContext] = useContext(UserContext);

  const [username, setUsername] = useState(userContext.menu.username);
  const [name, setName] = useState(userContext.menu.name);
  const [description, setDescription] = useState(userContext.menu.description);
  const [logo, setLogo] = useState();
  const [itemPreview, setItemPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E-EVCmmhLN51ydEr1uFEgcur-yGtBNOaT83DaRj4-O_eAYWW8gaGsLad35PJTVPD8l0&usqp=CAU"
  );

  const [menuStatus, setMenuStatus] = useState(userContext.menu.status);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    if (logo) {
      setItemPreview(URL.createObjectURL(logo));
    }
  }, [logo]);

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succss) {
      successAlert(succss);
    }
  }, [error, succss]);

  const formRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");
      setSuccss("");

      const formData = new FormData(formRef.current);

      fetch(url + "user/business/menu", {
        // mode: "no-cors",
        method: "PUT",
        credentials: "include",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
        // .then(async (res) => res.json()) // you might need to change this
        .then(async (response) => {
          setIsSubmitting(false);
          // console.log(response);
          const resJson = await response.json();
          if (!response.ok) {
            if (response.status === 403) {
              setError(resJson.message);
            } else {
              setError(resJson.message.message);
            }
          } else {
            setSuccss(resJson.message);
            // console.log(resJson.data);
            await fetch(url + "user/business/menu", {
              method: "GET",
              credentials: "include",
              // Pass authentication token as bearer token in header
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
              },
            }).then(async (menuRes) => {
              if (menuRes.ok) {
                const menuData = await menuRes.json();
                setUserContext((oldValues) => {
                  return { ...oldValues, menu: menuData };
                });
              }
            });
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError(error);
        });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="card mb-3 max-width-880 ">
            <div className="row g-0 ">
              <div className="col-md-4">
                {logo ? (
                  <img
                    style={{ maxWidth: "100%" }}
                    src={itemPreview}
                    className="card-image"
                    alt={name + " logo"}
                  />
                ) : (
                  <img
                    style={{ maxWidth: "100%" }}
                    src={`data:${userContext.menu.logoMimetype};base64,${userContext.menu.logo}`}
                    className="card-image"
                    alt={name + " logo"}
                  />
                )}
              </div>
              <div className="col-md-5">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{description}</p>

                  {/* if business have contact info */}
                  {/* <a className="text-decoration-none" href="#">
                        www.website-link.com
                      </a> */}
                </div>
              </div>
              <div className="col-md-3">
                <img
                  style={{ maxWidth: "75% " }}
                  src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                  className="card-image"
                  alt={name + " QR Code"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="create-form">
        <div className="wrapper rounded bg-white ">
          <div className="h3">Edit menu setting</div>
          <form className="form" onSubmit={formSubmitHandler} ref={formRef}>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>username</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>name</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                upload your Menu logo
              </label>
              <input
                name="logo"
                id="logo"
                className="form-control"
                type="file"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div>

            <label htmlFor="formFile" className="form-label">
              Change menu status
            </label>
            <div className="form-check form-switch">
              {menuStatus ? (
                <>
                  <input
                    name="status"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="status"
                    value={menuStatus}
                    onChange={() => setMenuStatus(!menuStatus)}
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
                    value={menuStatus}
                    onChange={() => setMenuStatus(!menuStatus)}
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
            <div className=" my-md-2 my-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <div className="form-group bmd-form-group">
                      <label className="bmd-label-floating">
                        Enter a simple description for your Menu
                      </label>
                      <textarea
                        value={description}
                        name="description"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Updated"}`}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
