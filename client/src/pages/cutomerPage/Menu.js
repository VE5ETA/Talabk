import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MenuItem from "../../components/MenuItem";

export default function Menu() {
  let { buzname } = useParams();

  return (
    <>
      {/* <Header haveCard={true} /> */}

      <section className="py-5">
        <div className="container">
          <div className="card mb-3 max-width-540 ">
            <div className="row g-0 ">
              <div className="col-md-4 ">
                <img
                  src="./images/bootstrap.png"
                  className="card-image"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <p className="card-text">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.Ut enim ad minim
                    veniam, nisi ut aliquip ex ea commodo consequat
                  </p>
                  <a className="text-decoration-none" href="#">
                    www.website-link.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row mb-2">
          <MenuItem />
          <MenuItem />
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
