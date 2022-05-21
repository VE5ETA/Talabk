import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { errorAlert, successAlert } from "../../helper/Options";

export default function CreateMenu() {
  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.CODESPACE_NAME +
        "-" +
        process.env.PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  const [userContext, setUserContext] = useContext(UserContext);
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [logo, setLogo] = useState();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succss) {
      successAlert(succss);
      navigate("/AfterLog");
    }
  }, [error, succss]);

  const formRef = useRef();

  // useEffect(() => {
  //   formData.append("tradeName", tradeName);
  //   formData.append("branchID", branchID);
  //   formData.append("businessType", businessType);
  //   formData.append("pdf", pdf);
  //   console.log(formData.get(pdf));
  // }, [tradeName, branchID, businessType, pdf]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccss("");

    const formData = new FormData(formRef.current);

    const genericErrorMessage = "Something went wrong! Please try again.";

    if (!username) {
      setError("menu username is required!");
    } else if (!name) {
      setError("menu name is required!");
    } else if (!logo) {
      setError("menu logo required!");
    } else {
      try {
        fetch(url + "user/business/menu", {
          // mode: "no-cors",
          method: "POST",
          credentials: "include",
          // headers: { "Content-Type": "multipart/form-data" },
          body: formData,
          headers: { Authorization: `Bearer ${userContext.token}` },
        })
          .then(async (res) => res.json()) // you might need to change this
          .then(async (response) => {
            setIsSubmitting(false);
            if (response) {
              setSuccss(response.message);
            } else {
              setError(error);
            }
            // if (!response.ok) {
            //   console.log(response.message);
            //   if (response.status === 400) {
            //     setError("Please fill all the fields correctly!");
            //   } else if (response.status === 401) {
            //     setError("Invalid email and password combination.");
            //   } else if (response.status === 500) {
            //     setError(response.message);
            //   } else {
            //     setError(response.message);
            //   }
            // } else {
            //   // const data = await response.json();
            //   // setUserContext((oldValues) => {
            //   //   return { ...oldValues, token: data.token };
            //   // });
            //   setSuccss(response.message);
            //   setSuccssed(true); // later 🕔// now it's the time ⌛
            // }
          })
          .catch((error) => {
            setIsSubmitting(false);
            setError(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!userContext.menu) {
    return (
      <div className="create-form">
        <div className="wrapper rounded bg-white ">
          <div className="h3">
            Complete your account by Creating your Menu 🍱
          </div>
          <form className="form" onSubmit={formSubmitHandler} ref={formRef}>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>username</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>name</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Business type</label>
                <input
                  name="businessType"
                  id="businessType"
                  type="text"
                  className="form-control"
                  // required
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
            </div> */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                please upload your Menu logo
              </label>
              <input
                name="logo"
                id="logo"
                className="form-control"
                type="file"
                required
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div>
            <div className=" my-md-2 my-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Description</label>
                    <div className="form-group bmd-form-group">
                      <label className="bmd-label-floating">
                        Enter a simple description for your Menu
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={formSubmitHandler}
              type="submit"
              className="btn btn-primary mt-3"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
    // } else {
    //   return (
    //     <div className="create-form ">
    //       <div className="wrapper rounded bg-white ">
    //         <div className="h3">Add your document</div>
    //         <div className="form">
    //           <div className="mb-3">
    //             <label htmlFor="formFile" className="form-label">
    //               please upload your legal document to verify your business
    //             </label>
    //             <input className="form-control" type="file" id="formFile" />
    //           </div>
    //           <div className="btn btn-primary mt-3">Submit</div>
    //         </div>
    //       </div>
    //     </div>
    //   );
  }
}
