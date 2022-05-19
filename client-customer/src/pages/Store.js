import React, { useEffect, useState } from "react";
import BuzCard from "../components/MenuCard";
import axios from "axios";

export default function Store() {
  let [MenusData, setMenusData] = useState([]);

  useEffect(() => {
    getMenusData();
  }, []);

  useEffect(() => {
    data();
  }, [MenusData]);

  function getMenusData() {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + "customer/stores")
      .then((res) => setMenusData(res.data));
  }

  function data() {
    return MenusData.map((Menu, index) => {
      return (
        <BuzCard
          key={index}
          img={`data:${Menu.logoMimetype};base64,${Menu.logo}`}
          username={Menu.username}
          name={Menu.name}
          description={Menu.description}
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
