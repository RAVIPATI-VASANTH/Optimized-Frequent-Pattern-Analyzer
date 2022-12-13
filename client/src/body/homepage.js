import React, { Component } from "react";
import Profile from "./profile/profile";
import Billing from "./billing/billing";
import FPA from "./fpa/fpa";
import Managing from "./managing/managing";

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
      <div>
        <button onClick={this.changeToProfile.bind(this)}>Profile</button>
        <button onClick={this.changeToBilling.bind(this)}>Billing</button>
        <button onClick={this.changeToFPA.bind(this)}>FPA</button>
        <button onClick={this.changeToManaging.bind(this)}>Managing</button>
      </div>
    );

    if (this.state.panelStatus[0]) {
      return (
        <>
          {navBar}
          <Profile
            currentUser={this.props.currentUser}
            logOutAction={this.props.logOutAction.bind(this)}
          ></Profile>
        </>
      );
    }
    if (this.state.panelStatus[1]) {
      return (
        <>
          {navBar}
          <Billing currentUser={this.props.currentUser}></Billing>
        </>
      );
    }
    if (this.state.panelStatus[2]) {
      return (
        <>
          {navBar}
          <FPA currentUser={this.props.currentUser}></FPA>
        </>
      );
    }
    if (this.state.panelStatus[3]) {
      return (
        <>
          {navBar}
          <Managing currentUser={this.props.currentUser}></Managing>
        </>
      );
    }
  }
}
