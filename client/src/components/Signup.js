import React, { Component } from "react";
// import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      storeName: "",
      email: "",
      password: "",
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  onSubmit() {
    // axios
    //   .post("http://localhost:3001/signUp", this.state)
    //   .then((res) => console.log(res.status))
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="container">
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>name</label>
            <input
              value={this.state.name}
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label>Store name</label>
            <input
              value={this.state.storeName}
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="Store name"
              name="storeName"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              value={this.state.email}
              onChange={this.onInputChange}
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={this.onInputChange}
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="#">sign in?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
