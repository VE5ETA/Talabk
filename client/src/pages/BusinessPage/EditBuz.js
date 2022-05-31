import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { errorAlert, successAlert } from "../../helper/Options";

export default function EditMenu(props) {
  const [userContext, setUserContext] = useContext(UserContext);

  const [tradeName, setTradeName] = useState();
  const [branchID, setBranchID] = useState();
  const [businessType, setBusinessType] = useState();
  const [pdf, setPdf] = useState();

  const [businessState, setBusinessState] = useState();
  const [createdAt, setCreatedAt] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [succss, setSuccss] = useState("");

  const url =
    process.env.REACT_APP_NODE_ENV === "live"
      ? "https://" +
        process.env.REACT_APP_CODESPACE_NAME +
        "-" +
        process.env.REACT_APP_SERVER_PORT +
        ".githubpreview.dev/"
      : process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    if (error) {
      errorAlert(error);
    }
    if (succss) {
      successAlert(succss);
    }
  }, [error, succss]);

  useEffect(() => {
    getBuzData();
  }, []);

  const getBuzData = () => {
    try {
      fetch(url + "user/business", {
        method: "GET",
        credentials: "include",
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
        .then(async (response) => {
          const resJson = await response.json();
          if (response.ok) {
            setTradeName(resJson.tradeName);
            setBusinessType(resJson.businessType);
            setBranchID(resJson.branchID);
            setBusinessState(resJson.businessState);
            setCreatedAt(new Date(resJson.createdAt));
          }
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const formRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");
      setSuccss("");

      const formData = new FormData(formRef.current);

      fetch(url + "user/business/", {
        method: "PUT",
        credentials: "include",
        body: formData,
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      })
        .then(async (response) => {
          setIsSubmitting(false);
          const resJson = await response.json();
          if (!response.ok) {
            if (response.status === 403) {
              setError(resJson.message);
            } else {
              setError(resJson.message.message);
            }
          } else {
            setSuccss(resJson.message);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError(error);
        });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <>
      <div className="create-form">
        <div className="wrapper rounded bg-white ">
          <div className="h3">Edit business setting</div>
          <form className="form" onSubmit={formSubmitHandler} ref={formRef}>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Trade name</label>
                <input
                  name="tradeName"
                  id="tradeName"
                  type="text"
                  className="form-control"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Branch number</label>
                <input
                  name="branchID"
                  id="branchID"
                  type="text"
                  className="form-control"
                  value={branchID}
                  onChange={(e) => setBranchID(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Business type</label>
                <input
                  name="businessType"
                  id="businessType"
                  type="text"
                  className="form-control"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                please upload your legal document to verify your business
              </label>
              <input
                name="pdf"
                id="pdf"
                className="form-control"
                type="file"
                onChange={(e) => setPdf(e.target.files[0])}
              />
            </div>
            <div className="row">
              <div className="col-md-5 mt-md-0 mt-3">
                <label>Business State: {businessState}</label>
              </div>
              <div className="col-md-5 mt-md-0 mt-3">
                <label>
                  Business created at: {createdAt?.getFullYear()}/
                  {createdAt?.getMonth() + 1}/{createdAt?.getDate()}
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={isSubmitting}
              text={`${isSubmitting ? "..." : "Update"}`}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
