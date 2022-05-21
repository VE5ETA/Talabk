import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MenuItem from "../../components/MenuItem";
import { CustomerContext } from "../../context/CustomerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import NotFound from "../NotFound";

export default function Menu() {
  const [customerContext, setCustomerContext] = useContext(CustomerContext);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.CODESPACE_NAME +
        "-" +
        process.env.PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  //ls is short for localstorage
  let isMounted = useRef(false);
  let { username } = useParams();
  const navigate = useNavigate();

  const [ls, setLs] = useState(JSON.parse(localStorage.getItem(username)));
  // console.log(ls);

  let [menuData, setMenuData] = useState([]);
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(username, JSON.stringify(customerContext));
    }
  }, [customerContext]);

  useEffect(() => {
    setCustomerContext(ls);
    getmenuData();
    isMounted.current = true;
  }, []);

  // useEffect(() => {
  //   setLocalStorage();
  // }, [ls]);

  useEffect(() => {
    data();
  }, [menuData]);

  // function setLocalStorage() {
  //   console.log("im above first if");
  //   if (ls.username) {
  //     // if (username === ls?.username) {
  //     // localStorage.setItem(username, JSON.stringify(customerContext));
  //     // console.log("im after second if");
  //     // setCustomerContext(ls);
  //     // }
  //   } else {
  //     localStorage.setItem(username, JSON.stringify(customerContext));
  //   }
  // }

  function getmenuData() {
    axios
      .get(url + `customer/@${username}`)
      .then(async (res) => {
        if (res.status === 200) {
          setMenuData(res.data);
          setCustomerContext((oldValues) => {
            return {
              ...oldValues,
              ID: res.data.head.businessID,
              username: username,
            };
          });
        }
      })
      .catch((error) => {
        navigate("/notFound");
      });
  }

  function cartButton() {
    if (customerContext?.items != undefined) {
      if (Object.keys(customerContext?.items).length !== 0) {
        return (
          <NavLink
            to={"../cart"}
            className="menu-cart-btn btn btn-warning btn-lg"
          >
            process to checkout <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>
        );
      }
    }
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
              {menuData?.head ? (
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
        <div className="row ">
          {data()}
          {cartButton()}
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
