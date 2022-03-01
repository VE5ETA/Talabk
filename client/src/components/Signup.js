import React, { Component } from "react";
// import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        date: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
      },
      formError: {},
      isSubmitted: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      formValues: { ...this.state.formValues, [e.target.name]: e.target.value },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      formError: this.validate(this.state.formValues),
      isSubmitted: true,
    });
    // print in console for test
    console.log(this.state.formValues);
    //   axios
    //     .post("http://localhost:3001/signUp", this.state.formValues)
    //     .then((res) => console.log(res.status))
    //     .catch((err) => {
    //       console.error(err);
    //     });
  }

  validate(value) {
    const error = {};
    if (!value.username) {
      error.username = "username is required!";
    }
    if (!value.email) {
      error.email = "email is required!";
    }
    if (!value.password) {
      error.password = "password is required!";
    }
    if (value.password2 !== value.password) {
      error.password2 = "password not match!";
    }
    return error;
  }

  render() {
    return (
      <div>
        <div>
          {Object.keys(this.state.formError).length === 0 &&
          this.state.isSubmitted ? (
            <div className="alert alert-success" role="alert">
              you are registered successfully in talab platform
            </div>
          ) : (
            ""
          )}
        </div>
        <form onSubmit={this.onSubmit} className="container">
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>username</label>
            <input
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="username"
              name="username"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.username}</p>
          <div className="form-group">
            <label>phone number</label>
            <input
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              name="phoneNumber"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.onInputChange}
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.email}</p>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.onInputChange}
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.password}</p>
          <div className="form-group">
            <label>confirm Password</label>
            <input
              onChange={this.onInputChange}
              type="password"
              className="form-control"
              placeholder="Enter password again"
              name="password2"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.password2}</p>
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>

          <p className="forgot-password text-right">
            Don't have account? <a href="#">sign up?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
