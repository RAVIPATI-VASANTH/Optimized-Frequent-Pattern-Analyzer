import React, { Component } from "react";
import HomePage from "./homepage";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userId: "",
      password: "",
      registerUserId: "",
      registerPassword: "",
      registerRePassword: "",
      message: "",
    };
  }

  login() {
    let url =
      "\\login?" +
      "userId=" +
      this.state.userId +
      "&password=" +
      this.state.password;
    fetch(url, { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        if (res.loginStatus === true) {
          this.setState({
            isLogin: true,
          });
          return true;
        } else {
          this.setState({
            isLogin: false,
          });
          alert(res.message);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  register() {
    let url =
      "\\register?userId=" +
      this.state.registerUserId +
      "&password=" +
      this.state.registerPassword;
    fetch(url, { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.loginStatus);
        if (res.loginStatus === true) {
          this.setState({
            isLogin: true,
          });
          return true;
        } else {
          alert("User is already Registered please login.");
          this.setState({
            registerUserId: "",
            registerPassword: "",
            registerRePassword: "",
          });
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.isLogin) {
      return <HomePage></HomePage>;
    } else {
      return (
        <>
          <div>
            Login panel
            <br />
            <label>User ID</label>
            <input
              type="text"
              value={this.state.userId}
              onChange={(event) => {
                this.setState({ userId: event.target.value });
              }}
            />
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
            <button type="submit" onClick={this.login.bind(this)}>
              Login
            </button>
          </div>
          <div>
            Register panel
            <br />
            <label>User ID</label>
            <input
              type="text"
              value={this.state.registerUserId}
              onChange={(event) => {
                this.setState({ registerUserId: event.target.value });
              }}
            />
            <label>Password</label>
            <input
              type="password"
              value={this.state.registerPassword}
              onChange={(event) => {
                this.setState({ registerPassword: event.target.value });
              }}
            />
            <label>Re-Enter Password</label>
            <input
              type="password"
              value={this.state.registerRePassword}
              onChange={(event) => {
                this.setState({ registerRePassword: event.target.value });
              }}
            />
            <button type="submit" onClick={this.register.bind(this)}>
              Register
            </button>
          </div>
        </>
      );
    }
  }
}
