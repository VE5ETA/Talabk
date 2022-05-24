import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import MenuItem from "../../components/MenuItem";
import AddItem from "../../components/AddItem";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import NotFound from "../NotFound";

export default function Menu() {
  const [userContext, setUserContext] = useContext(UserContext);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  let isMounted = useRef(false);
  let clkref = useRef(false);

  const navigate = useNavigate();

  let [menuData, setMenuData] = useState([]);
  let [clicked, setClicked] = useState(false);

  useEffect(() => {
    getmenuData();
    isMounted.current = true;
  }, []);

  // useEffect(() => {
  //   if (clkref.current) {
  //     clkref.current = false;
  //   }
  // }, [clkref.current]);

  useEffect(() => {
    data();
  }, [menuData]);

  async function getmenuData() {
    await fetch(url + "user/business/menu/menu", {
      method: "GET",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    })
      .then(async (res) => {
        console.log(res);
        if (res.status === 200) {
          const resJson = await res.json();

          setMenuData(resJson);
        }
      })
      .catch((error) => {
        navigate("/notFound");
      });
  }

  function data() {
    if (menuData[0]) {
      return menuData.map((item, index) => {
        if (item) {
          return (
            <MenuItem
              key={index}
              status={item.status}
              id={item._id}
              menuID={item.MenuID}
              img={`data:${item.imgMimetype};base64,${item.img}`}
              name={item.name}
              price={item.price}
              itemDone={getmenuData}
            />
          );
        }
      });
    }
  }

  // function addItem() {
  //   return (
  //     <>
  //       <a
  //         className="btn btn-primary"
  //         data-bs-toggle="collapse"
  //         href="#multiCollapseExample1"
  //         role="button"
  //         aria-expanded="false"
  //         aria-controls="multiCollapseExample1"
  //         onClick={() => (clkref.current = true)}
  //       >
  //         Add new Item
  //       </a>
  //       <div className="collapse multi-collapse" id="multiCollapseExample1">
  //         <div className="card card-body">
  //           <AddItem itemDone={getmenuData} />
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  // function add() {
  //   return <AddItem itemDone={getmenuData} />;
  // }

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="card mb-3 max-width-880 ">
            <div className="row g-0 ">
              {userContext?.menu ? (
                <>
                  <div className="col-md-4">
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`data:${userContext.menu.logoMimetype};base64,${userContext.menu.logo}`}
                      className="card-image"
                      alt={useContext.menu?.name + " logo"}
                    />
                    {/* <img
                            style={{ maxWidth: "50% " }}
                            src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                            className="card-image"
                            alt={useContext.menu?.name + " logo"}
                          /> */}
                  </div>
                  <div className="col-md-5">
                    <div className="card-body">
                      <h5 className="card-title">{userContext.menu.name}</h5>
                      <p className="card-text">
                        {userContext.menu.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <img
                      style={{ maxWidth: "70% " }}
                      src={`data:${userContext.menu.qrMimetype};base64,${userContext.menu.qrImg}`}
                      className="card-image"
                      alt={useContext.menu?.name + " logo"}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row ">
          {/* {addItem()} */}
          {/* {cartButton()} */}
        </div>
      </div>

      <div className="container">
        <div className="row ">
          {/* {addItem()} */}
          {/* {clkref.current ? add : null} */}
          <AddItem itemDone={getmenuData} />
          {data()}
          {/* {cartButton()} */}
          {/* {console.log(Object.keys(customerContext?.items).length === 0)} */}
          {/* {customerContext?.items != undefined ||
          Object.keys(customerContext?.items).length === 0 ? (
            <button className="menu-cart-btn"> process to checkout </button>
          ) : null} */}
          {/* <MenuItem price={99.99} id={1} name="item name 1" />
          <MenuItem price={25.99} id={2} name="item name 2" /> */}
        </div>
      </div>
    </>
  );
}
