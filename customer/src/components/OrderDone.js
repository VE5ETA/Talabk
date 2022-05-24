import React from "react";
import { NavLink } from "react-router-dom";

export default function OrderDone(props) {
  const info = props.data;
  return (
    <div className="create-form mt-5">
      <div className="wrapper rounded bg-white ">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-body">
              <img
                className="m-auto"
                style={{ maxWidth: "100%" }}
                src="https://cdn.dribbble.com/users/147386/screenshots/5315437/success-tick-dribbble.gif"
              ></img>
              <div className="px-4 py-5">
                <h5 className="text-uppercase">Business: {info.username}</h5>
                <h4 className="mt-5 theme-color mb-5">Thanks for your order</h4>
                <span className="theme-color">Payment Summary</span>
                <div className="mb-3">
                  <hr className="new1" />
                </div>
                {Object.values(info.items).map((item, index) => {
                  return (
                    <div key={index} className="d-flex justify-content-between">
                      <span className="font-weight-bold">
                        {item.name}(Qty:{item.quantite})
                      </span>
                      <span className="text-muted">{item.price}SAR</span>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between mt-3">
                  <span className="font-weight-bold">Total</span>
                  <span className="font-weight-bold theme-color">
                    {info.subTotal}SAR
                  </span>
                </div>
                <div className="text-center mt-5">
                  <NavLink to={"../orders"} className="btn btn-primary">
                    Track your order
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
