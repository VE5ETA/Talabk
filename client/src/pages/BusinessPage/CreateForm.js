import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function CreateBuz() {
  const [userContext, setUserContext] = useContext(UserContext);

  if (!userContext.workIn) {
    return (
      <div className="create-form ">
        <div className="wrapper rounded bg-white ">
          <div className="h3">Create your business</div>
          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Trade name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Branch number</label>
                <input type="text" className="form-control" required />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Business type</label>
                <input type="text" className="form-control" required />
              </div>
            </div>
            <div className=" my-md-2 my-3">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Description</label>
                    <div class="form-group bmd-form-group">
                      <label class="bmd-label-floating">
                        Enter a simple description for your business
                      </label>
                      <textarea class="form-control" rows="5"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn btn-primary mt-3">Submit</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="create-form ">
        <div className="wrapper rounded bg-white ">
          <div className="h3">Add your document</div>
          <div className="form">
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                please upload your legal document to verify your business
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>
            <div className="btn btn-primary mt-3">Submit</div>
          </div>
        </div>
      </div>
    );
  }
}
