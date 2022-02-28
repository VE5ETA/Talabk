import React, { Component } from "react";
// import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onSubmit() {
    //   axios
    //     .post("http://localhost:3001/signUp", this.state)
    //     .then((res) => console.log(res.status))
    //     .catch((err) => {
    //       console.error(err);
    //     });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="container">
          <h3>Login</h3>
          <div className="form-group">
            <label>username</label>
            <input
              value={this.state.username}
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={this.state.password}
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              placeholder="password"
              name="password"
            />
          </div>
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
