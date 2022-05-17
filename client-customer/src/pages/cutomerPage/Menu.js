import React from "react";
import { useParams } from "react-router-dom";
// import Footer from "../../components/Footer";
// import Header from "../../components/Header";
import MenuItem from "../../components/MenuItem";

export default function Menu() {
  let { username } = useParams();
  console.log(username);

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="card mb-3 max-width-540 ">
            <div className="row g-0 ">
              <div className="col-md-4 ">
                <img
                  style={{ maxWidth: "100%" }}
                  src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924__480.jpg"
                  className="card-image"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Business name</h5>
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
          <MenuItem price={99.99} id={1} name="item name 1" />
          <MenuItem price={25.99} id={2} name="item name 2" />
        </div>
      </div>
    </>
  );
}
