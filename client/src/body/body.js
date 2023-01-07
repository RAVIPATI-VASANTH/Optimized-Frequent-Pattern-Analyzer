import React, { Component } from "react";
import HomePage from "./homepage";
import "./../css/body.css";
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
      currentUser: "",
    };
  }

  login() {
    fetch(
      `http://127.0.0.1:5000/login?userId=${this.state.userId}&password=${this.state.password}`,
      {
        method: "POST",
      }
    )
      .then((res) =>
        res.json().then((res) => {
          if (res.loginStatus) {
            this.setState({
              isLogin: true,
              currentUser: this.state.userId,
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
      )
      .catch((err) => {
        console.log(err);
      });
  }

  register() {
    fetch(
      `http://127.0.0.1:5000/register?userId=${this.state.registerUserId}&password=${this.state.registerPassword}`,
      {
        method: "POST",
      }
    )
      .then((res) =>
        res.json().then((res) => {
          if (res.loginStatus === true) {
            this.setState({
              isLogin: true,
              currentUser: this.state.userId,
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
      )
      .catch((err) => {
        console.log(err);
      });
  }

  logOutAction() {
    this.setState({
      isLogin: false,
      currentUser: "",
    });
  }

  render() {
    if (this.state.isLogin) {
      return (
        <HomePage
          currentUser={this.state.currentUser}
          logOutAction={this.logOutAction.bind(this)}
        ></HomePage>
      );
    } else {
      return (
        <div className="credentialsDiv">
          <div className="loginDiv">
            <p>Login</p>
            <>
              <label className="label" for="loginEmail">
                User ID
              </label>
              <input
                className="inputEmail"
                id="loginEmail"
                type="email"
                value={this.state.userId}
                onChange={(event) => {
                  this.setState({ userId: event.target.value });
                }}
              />
            </>
            <>
              <label className="label" for="loginPassword">
                Password
              </label>
              <input
                className="inputPassword"
                id="loginPassword"
                type="password"
                value={this.state.password}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </>
            <button
              className="button"
              type="submit"
              onClick={this.login.bind(this)}
            >
              Login
            </button>
          </div>
          <div className="registerDiv">
            <p>Register</p>
            <label className="label" for="registerEmail">
              User ID
            </label>
            <input
              className="inputEmail"
              id="registerEmail"
              type="email"
              value={this.state.registerUserId}
              onChange={(event) => {
                this.setState({ registerUserId: event.target.value });
              }}
            />
            <label className="label" for="registerPassword">
              Password
            </label>
            <input
              className="inputPassword"
              id="registerPassword"
              type="password"
              value={this.state.registerPassword}
              onChange={(event) => {
                this.setState({ registerPassword: event.target.value });
              }}
            />
            <label className="label">Re-Enter Password</label>
            <input
              className="inputPassword"
              type="password"
              value={this.state.registerRePassword}
              onChange={(event) => {
                this.setState({ registerRePassword: event.target.value });
              }}
            />
            <button
              className="button"
              type="submit"
              onClick={this.register.bind(this)}
            >
              Register
            </button>
          </div>
        </div>
      );
    }
  }
}
