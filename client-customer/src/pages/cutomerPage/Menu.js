import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MenuItem from "../../components/MenuItem";
// import { CustomerContext } from "../../context/CustomerContext";
// import NotFound from "../NotFound";

export default function Menu() {
  // const [customerContext, setCustomerContext] = useContext(CustomerContext);

  let { username } = useParams();
  const navigate = useNavigate();

  let [menuData, setMenuData] = useState([]);
  useEffect(() => {
    getmenuData();
  }, []);

  // useEffect(() => {
  //   setLocalStorage();
  // }, [customerContext]);

  useEffect(() => {
    data();
  }, [menuData]);

  function getmenuData() {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + `customer/@${username}`)
      .then(async (res) => {
        if (res.status === 200) {
          setMenuData(res.data);
          // setCustomerContext((oldValues) => {
          //   return {
          //     ...oldValues,
          //     businessID: res.data.head.businessID,
          //     username: username,
          //   };
          // });
        }
      })
      .catch((error) => {
        navigate("/notFound");
      });
  }

  function data() {
    if (menuData.body) {
      return menuData.body.map((item, index) => {
        if (item.status) {
          // console.log(menuData.head.businessID);
          return (
            <MenuItem
              key={index}
              id={item._id}
              businessID={menuData.head.businessID}
              username={username}
              menuID={item.MenuID}
              img={`data:${item.imgMimetype};base64,${item.img}`}
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
                      src={`data:${menuData.head.logoMimetype};base64,${menuData.head.logo}`}
                      className="card-image"
                      alt={menuData.head.name + " logo"}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{menuData.head.name}</h5>
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
