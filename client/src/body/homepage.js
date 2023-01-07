import React, { Component } from "react";
import Profile from "./profile/profile";
import Billing from "./billing/billing";
import FPA from "./fpa/fpa";
import Managing from "./managing/managing";
import "./../css/homepage.css";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelStatus: [false, true, false, false],
    };
  }

  changeToProfile() {
    let ps = [false, false, false, false];
    ps[0] = true;
    this.setState({
      panelStatus: ps,
    });
  }

  changeToBilling() {
    let ps = [false, false, false, false];
    ps[1] = true;
    this.setState({
      panelStatus: ps,
    });
  }

  changeToFPA() {
    let ps = [false, false, false, false];
    ps[2] = true;
    this.setState({
      panelStatus: ps,
    });
  }

  changeToManaging() {
    let ps = [false, false, false, false];
    ps[3] = true;
    this.setState({
      panelStatus: ps,
    });
  }

  render() {
    let navBar = (
      <div className="navBar">
        <button
          className={
            this.state.panelStatus[0] ? "navButtonSelected" : "navButton"
          }
          onClick={this.changeToProfile.bind(this)}
        >
          Profile
        </button>
        <button
          className={
            this.state.panelStatus[1] ? "navButtonSelected" : "navButton"
          }
          onClick={this.changeToBilling.bind(this)}
        >
          Billing
        </button>
        <button
          className={
            this.state.panelStatus[2] ? "navButtonSelected" : "navButton"
          }
          onClick={this.changeToFPA.bind(this)}
        >
          FPA
        </button>
        <button
          className={
            this.state.panelStatus[3] ? "navButtonSelected" : "navButton"
          }
          onClick={this.changeToManaging.bind(this)}
        >
          Managing
        </button>
      </div>
    );

    if (this.state.panelStatus[0]) {
      return (
        <div div className="homepage">
          {navBar}
          <Profile
            currentUser={this.props.currentUser}
            logOutAction={this.props.logOutAction.bind(this)}
          ></Profile>
        </div>
      );
    }
    if (this.state.panelStatus[1]) {
      return (
        <div className="homepage">
          {navBar}
          <Billing currentUser={this.props.currentUser}></Billing>
        </div>
      );
    }
    if (this.state.panelStatus[2]) {
      return (
        <div className="homepage">
          {navBar}
          <FPA currentUser={this.props.currentUser}></FPA>
        </div>
      );
    }
    if (this.state.panelStatus[3]) {
      return (
        <div className="homepage">
          {navBar}
          <Managing currentUser={this.props.currentUser}></Managing>
        </div>
      );
    }
  }
}
