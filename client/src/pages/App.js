import React, {
  useEffect,
  useCallback,
  useContext,
  Suspense,
  useRef,
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "../context/RequireAuth";
import IsLogged from "../context/IsLogged";

import { UserContext } from "../context/UserContext";

import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import AdminDashboard from "./plateformPage/AdminDashboard";
import NewReq from "./plateformPage/NewReq";
// import Menu from "./cutomerPage/Menu"; deleted
// import Cart from "./cutomerPage/Cart";
// import Store from "./Store";
import CreateForm from "./BusinessPage/CreateForm";
import CreateMenu from "./BusinessPage/CreateMenu";

import Logout from "./Logout";
import AfterLog from "../context/AfterLog";
import Dashboard from "./BusinessPage/Dashboard";
import Spinner from "../components/Spinner";
import Menu from "../pages/BusinessPage/Menu";
import EditMenu from "./BusinessPage/EditMenu";
function App() {
  // let isDoneForNavigate = useRef(false);

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(async () => {
    await fetch(url + "user/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        await setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
        isDDone.current = true; //✅ return and fix this 🍰
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
      // setTimeout(verifyUser, 10 * 1000); // this was for testing 🧪
    });
  }, [setUserContext]);

  let isverifyUserDone = useRef(true);

  useEffect(() => {
    if (isverifyUserDone.current) {
      isverifyUserDone.current = false;
      verifyUser();
    }
  }, [verifyUser]);
  // }, []);

  let isDDone = useRef(false);

  useEffect(() => {
    if (isDDone.current) {
      isDDone.current = false;
      callData();
      console.log(" helllo ");
    }
  }, [userContext]);

  async function callData() {
    if (userContext.token) {
      console.log("im in calldata");
      await fetch(url + "user/me", {
        method: "GET",
        credentials: "include",
        // Pass authentication token as bearer token in header
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, details: data };
          });
          await fetch(url + "user/platform/adminTest", {
            method: "GET",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userContext.token}`,
            },
          })
            .then(async (r) => {
              console.log(r);
              if (r.ok) {
                setUserContext((oldValues) => {
                  return { ...oldValues, isAdmin: true };
                });
                // isDoneForNavigate.current = true;
                // isDone.current = true;
                // navigate("/AdminDashboard"); //this needs to be complete
              } else {
                setUserContext((oldValues) => {
                  return { ...oldValues, isAdmin: false };
                });
                await fetch(url + "user/business/menu", {
                  method: "GET",
                  credentials: "include",
                  // Pass authentication token as bearer token in header
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userContext.token}`,
                  },
                }).then(async (menuRes) => {
                  if (menuRes.ok) {
                    const menuData = await menuRes.json();
                    setUserContext((oldValues) => {
                      return { ...oldValues, menu: menuData };
                    });
                    // isDoneForNavigate.current = true;
                    // isDone.current = true;
                  } else {
                    setUserContext((oldValues) => {
                      return { ...oldValues, menu: null };
                    });
                    // isDoneForNavigate.current = true;
                    // isDone.current = true;
                  }
                });
                //  // isDone.current = true;
              }
            })
            .catch((err) => {
              console.log("this wont work anyway 😯");
              setUserContext((oldValues) => {
                return { ...oldValues, isAdmin: false };
              });
            });
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
          // isDoneForNavigate.current = true;
        }
      });
    }
  }
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\

  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  // ---------------------------\\
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Spinner />}> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public page */}
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/stores" element={<Store />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* for test */}

          {/* <Route path="/stores/:buzname/menu" element={<Menu />} /> */}
          {/* <Route path="/:buzname/menu/:itemName" element={<NewReq />} /> */}

          {/* ~this will protect the user from accessing login/signup page if he's logged in ⛔ */}
          <Route element={<IsLogged />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>
          {/* privete page */}
          <Route element={<RequireAuth />}>
            <Route path="/AfterLog" element={<AfterLog />} />
          </Route>

          <Route element={<RequireAuth />}>
            {/* <Route element={<AfterLog />}> */}
            {/* <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} /> */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createBusiness" element={<CreateForm />} />
            <Route path="/createMenu" element={<CreateMenu />} />
            <Route path="/EditMenu" element={<EditMenu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/logout" element={<Logout />} />
            {/* </Route> */}
          </Route>

          {/* if page not found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default App;
