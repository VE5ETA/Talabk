import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      formError: {},
      serverError: "",
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

  async onSubmit(e) {
    e.preventDefault();
    await this.setState({
      formError: this.validate(this.state.formValues),
      isSubmitted: true,
    });

    if (Object.keys(this.state.formError).length === 0) {
      axios
        .post("http://localhost:8081/users/signup", this.state.formValues)
        .then((res) => console.log(res.statusText))
        .catch((err) => {
          if (err.response.data.name === "nameError") {
            this.setState({ serverError: "name is unvalid" });
          } else if (err.response.data.name === "userNameError") {
            this.setState({ serverError: "username is unvalid" });
          } else if (err.response.data.name === "emailError") {
            this.setState({ serverError: "email is unvalid" });
          } else if (err.response.data.name === "UserExistsError") {
            this.setState({ serverError: "username is already registered" });
          } else if (err.response.data.name === "MissingPasswordError") {
            this.setState({ serverError: "password is required" });
          } else if (err) {
            console.log(err.response);
            this.setState({ serverError: "something's wrong!" });
          }
        });
    }
  }

  validate(value) {
    const error = {};
    const regexName =
      /^(?=.{1,40}$)(\s)*[a-zA-Zء-ي]+(?:[-'\s][a-zA-Zء-ي]+)*(\s)*$/;
    const regexUserName = /^(\w){3,33}$/;
    const regexEmail = /\S+@\S+\.\S+/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!value.name) {
      error.name = "name is required!";
    } else if (value.name.length > 40) {
      error.name = "name must be less than 40 letter";
    } else if (!regexName.exec(value.name)) {
      error.name = "name must include only letter , ' or -";
    }

    !value.userName
      ? (error.userName = "username is required!")
      : value.userName.length < 3
      ? (error.userName = "username must be more than 3 letter")
      : value.userName.length > 33
      ? (error.userName = "username must be less than 33 letter")
      : !regexUserName.exec(value.userName)
      ? (error.userName = "username must include only letter or _")
      : console.log();

    if (!value.email) {
      error.email = "email is required!";
    } else if (!regexEmail.exec(value.email)) {
      error.email = "email pattren is unvalid";
    }

    if (!value.password) {
      error.password = "password is required!";
    } else if (!regexPassword.exec(value.password)) {
      error.password =
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
    }
    if (value.password2 !== value.password) {
      error.password2 = "password not match!";
    }
    return error;
  }

  render() {
    return (
      <div style={{ marginTop: "40px" }} className="container">
        {/* error */}
        <div>
          {this.state.serverError !== "" && this.state.isSubmitted ? (
            <div className="alert alert-danger" role="alert">
              {this.state.serverError}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* success */}
        <div>
          {Object.keys(this.state.formError).length === 0 &&
          this.state.serverError === "" &&
          this.state.isSubmitted ? (
            <div className="alert alert-success" role="alert">
              you are registered successfully in talab platform
            </div>
          ) : (
            ""
          )}
        </div>
        <form onSubmit={this.onSubmit}>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>name</label>
            <input
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="name"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.name}</p>
          <div className="form-group">
            <label>username</label>
            <input
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="username"
              name="userName"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.userName}</p>
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
          <p style={{ color: "red" }}>
            {this.state.formError.password2 || this.state.formError.password}
          </p>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>

          <p className="forgot-password text-right">
            Already have account? <a href="/Login">login?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
