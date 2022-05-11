import React, { Component } from "react";

class MenuItem extends Component {
  render() {
    const itemStyle = {
      margin: "35px 5px",
    };
    return (
      <div style={{ marginTop: "40px" }}>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="Tap1"
            role="tabpanel"
            aria-labelledby="Tap1-tab"
          >
            {/* item 1 Tap1 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 1" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>

            {/* item 2  Tap1 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 2" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>

            {/* item 3  Tap1 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 3" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="Tap2"
            role="tabpanel"
            aria-labelledby="Tap2-tab"
          >
            {/* item 1 Tap2 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 1" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>

            {/* item 2  Tap2 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 2" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="Tap3"
            role="tabpanel"
            aria-labelledby="Tap3-tab"
          >
            {/* item 1  Tap3 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 1" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>

            {/* item 2 Tap3 */}
            <div style={itemStyle} className="d-flex position-relative">
              <img src="#" className="flex-shrink-0 me-3" alt="item 2" />
              <div>
                <h5 className="mt-0">item name</h5>
                <p>
                  This is some placeholder content for the custom component. It
                  is intended to mimic what some real-world content would look
                  like, and we're using it here to give the component a bit of
                  body and size.
                </p>
                <a href="#" className="stretched-link">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuItem;
