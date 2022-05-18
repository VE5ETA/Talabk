import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuItem from "../../components/MenuItem";
import { CustomerContext } from "../../context/CustomerContext";

export default function Menu() {
  const [customerContext, setCustomerContext] = useContext(CustomerContext);

  let { username } = useParams();

  let [menuData, setMenuData] = useState([]);
  useEffect(() => {
    getmenuData();
    if (localStorage.getItem(username)) {
      console.log(localStorage.getItem(username));
      setCustomerContext((oldValues) => {
        return { ...oldValues, username: localStorage.getItem(username) };
      });
    } else {
      localStorage.setItem(username, {});
    }
  }, []);

  useEffect(() => {
    data();
  }, [menuData]);

  function getmenuData() {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + `customer/@${username}`)
      .then((res) => setMenuData(res.data));
  }

  function data() {
    if (menuData.body) {
      return menuData.body.map((item, index) => {
        if (item.status) {
          return (
            <MenuItem
              key={index}
              id={item._id}
              menuID={item.MenuID}
              img={`data:${item.imgMimetype};base64,${btoa(
                String.fromCharCode(...new Uint8Array(item.img.data))
              )}`}
              name={item.name}
              price={item.price}
            />
          );
        }
      });
    }
  }

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="card mb-3 max-width-540 ">
            <div className="row g-0 ">
              {menuData.head ? (
                <>
                  <div className="col-md-4">
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`data:${menuData.head.logoMimetype};base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(menuData.head.logo.data)
                        )
                      )}`}
                      className="card-image"
                      alt={username + " logo"}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{username}</h5>
                      <p className="card-text">{menuData.head.description}</p>
                      {/* if business have contact info */}
                      {/* <a className="text-decoration-none" href="#">
                        www.website-link.com
                      </a> */}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row mb-2">
          {data()}

          {/* <MenuItem price={99.99} id={1} name="item name 1" />
          <MenuItem price={25.99} id={2} name="item name 2" /> */}
        </div>
      </div>
    </>
  );
}
