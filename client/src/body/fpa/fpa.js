import React, { Component } from "react";
import CreateFPARequest from "./createFPARequest/createFPARequest";

export default class FPA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createPanelSignal: true,
    };
  }

  componentDidMount() {
    fetch(`/getFPARequests?userId=${this.props.currentUser}`, {
      method: "POST",
    })
      .then((response) =>
        response.json().then((response) => {
          if (response.message) {
            // console.log("fetched Successfully");
          } else {
            // console.log(response.text);
          }
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    let createButton;
    let viewComponent;
    console.log();
    if (!this.state.createPanelSignal) {
      createButton = (
        <button
          onClick={() =>
            this.setState({
              createPanelSignal: !this.state.createPanelSignal,
            })
          }
        >
          Create Request
        </button>
      );
      viewComponent = <>No current FPA Requests</>;
    } else {
      createButton = (
        <button
          onClick={() =>
            this.setState({
              createPanelSignal: !this.state.createPanelSignal,
            })
          }
        >
          Cancel
        </button>
      );
      viewComponent = (
        <CreateFPARequest
          currentUser={this.props.currentUser}
        ></CreateFPARequest>
      );
    }
    return (
      <>
        {createButton}
        <br />
        {viewComponent}
      </>
    );
  }
}
