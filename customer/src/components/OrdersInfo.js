import React from "react";

export default function OrdersInfo(props) {
  return (
    <div className="col-md-3 col-sm-6 mb-3">
      <div className="card card-block p-3">
        <h5 className="card-title mb-3">Business: {props.businessName}</h5>
        <p className="card-title mb-3">order ID: {props.id}</p>
        <p>
          Order state:
          <strong className="d-inline-block mb-2 text-primary">
            &nbsp;{props.orderState}
          </strong>
        </p>

        <div>
          <span className="theme-color">Payment Summary</span>
          <div className="mb-3">
            <hr className="new1" />
          </div>
          {Object.values(props.items).map((item, index) => {
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
              {props.subTotal}SAR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
