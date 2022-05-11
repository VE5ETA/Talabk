import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-clean">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-3 item">
              <h3>طلبك</h3>
              <ul>
                <li>
                  <a href="#">Self-Service Ordering Platform</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 item">
              <h3>من نحن</h3>
              <ul>
                <li>
                  <a href="#">خدماتنا</a>
                </li>
                <li>
                  <a href="#">فريقنا</a>
                </li>
                <li>
                  <a href="#">الاحكام والشروط</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 item">
              <h3>الشركة</h3>
              <ul>
                <li>
                  <a href="#">الوظائف</a>
                </li>
                <li>
                  <a href="#">المدونة</a>
                </li>
                <li>
                  <a href="#">الوائد</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 item social">
              <a href="#">
                <i className="icon ion-social-facebook" />
              </a>
              <a href="#">
                <i className="icon ion-social-twitter" />
              </a>
              <a href="#">
                <i className="icon ion-social-snapchat" />
              </a>
              <a href="#">
                <i className="icon ion-social-instagram" />
              </a>
              <p className="copyright">طلبك © 2022</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
