import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

export default function Dashboard() {
  const [userContext, setUserContext] = useContext(UserContext);

  let navigate = useNavigate();
  return (
    <div className="page-notFound d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">
              {" "}
              🏪
              <img
                style={{ maxWidth: "10% " }}
                src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                className="card-image"
                alt={useContext.menu?.name + " logo"}
              />{" "}
              🏪
            </span>
            <div className="mb-4 lead">this is Dashboard .</div>

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
                            <h5 className="card-title">
                              {userContext.menu.name}
                            </h5>
                            <p className="card-text">
                              {userContext.menu.description}
                            </p>

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
                            alt={useContext.menu?.name + " logo"}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>

            <a onClick={() => navigate("/")} className="btn btn-link">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
