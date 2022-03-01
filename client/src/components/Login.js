import React, { Component } from "react";
// import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
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
    if (!value.password) {
      error.password = "password is required!";
    }
    return error;
  }

  render() {
    return (
      <div style={{ marginTop: "40px" }} className="container">
        <div>
          {Object.keys(this.state.formError).length === 0 &&
          this.state.isSubmitted ? (
            <div className="alert alert-success" role="alert">
              login successful
            </div>
          ) : (
            ""
          )}
        </div>
        <form onSubmit={this.onSubmit}>
          <h3>Login</h3>
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
            <label>Password</label>
            <input
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="password"
              name="password"
            />
          </div>
          <p style={{ color: "red" }}>{this.state.formError.password}</p>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
          <p className="forgot-password text-right">
            Don't have account? <a href="#">sign up?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
