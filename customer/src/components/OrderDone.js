import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import success from "../pages/img/success-tick-dribbble.gif";
export default function OrderDone(props) {
  const [customerContext, setCustomerContext] = useContext(CustomerContext);

  // delete items from localStorage and context when order is done
  useEffect(() => {
    localStorage.setItem("customerNumber", customerContext.customerNumber);
    let localData = JSON.parse(localStorage.getItem(customerContext.username));
    localData.items = [];
    localStorage.setItem(customerContext.username, JSON.stringify(localData));
  }, []);

  return (
    <div className="create-form mt-5">
      <div className="wrapper rounded bg-white ">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-body ">
              <img
                width={"300px"}
                height={"225px"}
                className="m-auto "
                style={{ maxWidth: "100%" }}
                src={success}
              ></img>
              <div className="px-4 py-5">
                <h5 className="text-uppercase">
                  Business: {customerContext?.username}
                </h5>
                <h4 className="mt-5 theme-color mb-5">Thanks for your order</h4>
                <span className="theme-color">Payment Summary</span>
                <div className="mb-3">
                  <hr className="new1" />
                </div>
                {Object.values(customerContext?.items).map((item, index) => {
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
                    {customerContext?.subTotal}SAR
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
