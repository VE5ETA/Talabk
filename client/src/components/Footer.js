import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutube,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer
      className="bg-dark mt-auto"
      // style={{
      //   width: "auto",
      //   maxWidth: " 680px",
      //   padding: "0 15px",
      // }}
    >
      <div className="container py-4 ">
        <div className="row gy-4 gx-5">
          <div className="col-lg-4 col-md-6">
            <h5 className="h1 text-white">FB.</h5>
            <p className="small text-white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <p className="small text-white mb-0">
              © Copyrights. All rights reserved.{" "}
              <a className="text-primary" href="#">
                Bootstrapious.com
              </a>
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Quick links</h5>
            <ul className="list-unstyled text-white">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Get started</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Quick links</h5>
            <ul className="list-unstyled text-white">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Get started</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 ">
            <h5 className="d-flex m-auto row justify-content-center text-white mb-3">
              Stay connected
            </h5>
            <ul className=" nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small ">
              <li>
                <a href="#" className="nav-link text-white">
                  <div className="bi d-block mx-auto mb-1 text-white mb-3">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <div className="bi d-block mx-auto mb-1 text-white mb-3">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <div className="bi d-block mx-auto mb-1 text-white mb-3">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </svg>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <div className="bi d-block mx-auto mb-1 text-white mb-3">
                    <svg
                      className="bi d-block mx-auto mb-1"
                      width={24}
                      height={24}
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </svg>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
