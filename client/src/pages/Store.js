import React, { useEffect, useState } from "react";
import BuzCard from "../components/BuzCard";
import axios from "axios";

export default function Store() {
  let [storesData, setStoresData] = useState([]);

  useEffect(() => {
    getStoresData();
  }, []);

  function getStoresData() {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + "customer/stores")
      .then((res) => setStoresData(res.data));
  }

  function data() {
    return storesData.map((store, index) => {
      return (
        <BuzCard
          key={index}
          img="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
          tradeName={store.tradeName}
          type={store.businessType}
          Desc={store.description}
        />
      );
    });
  }

  return (
    <section className="py-5">
      <div className="container mt-2 res-card">
        <div className="row">{data()}</div>
      </div>
    </section>
  );
}
