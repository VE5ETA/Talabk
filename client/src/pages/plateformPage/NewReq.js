import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewReq() {
  const [newRequest, setNewRequest] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8081/user/platform/showNewRequest")
  //     .then((res) => {
  //       setNewRequest(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // const data = newRequest.map((req, index) => {
  //   return (
  //     <Card
  //       key={index}
  //       id={req._id}
  //       tradeName={req.tradeName}
  //       businessType={req.businessType}
  //       businessStatus={req.businessStatus}
  //       businessState={req.businessState}
  //     />
  //   );
  // });

  return (
    <div className="container">
      {/* <div className="col-md-4 col-sm-6">{data}</div> */}
    </div>
  );
}
