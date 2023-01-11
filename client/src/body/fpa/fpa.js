import React, { Component } from "react";
import CreateFPARequest from "./createFPARequest/createFPARequest";
import "./../../css/fpa.css";

export default class FPA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createPanelSignal: false,
      fpaRequests: [],
    };
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:5000/getFPARequests?userId=${this.props.currentUser}`,
      {
        method: "POST",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.message) {
            this.setState({
              fpaRequests: response.fpaRequests,
            });
          } else {
            alert(response.text);
          }
        })
      )
      .catch((err) => console.log(err));
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.createPanelSignal !== this.state.createPanelSignal) {
      fetch(
        `http://127.0.0.1:5000/getFPARequests?userId=${this.props.currentUser}`,
        {
          method: "POST",
        }
      )
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              this.setState({
                fpaRequests: response.fpaRequests,
              });
            } else {
              alert(response.text);
            }
          })
        )
        .catch((err) => console.log(err));
    }
  }

  requestConfirmed() {
    this.setState({
      createPanelSignal: !this.state.createPanelSignal,
    });
  }

  cancelFPARequest(index) {
    fetch(
      `http://127.0.0.1:5000/cancelFPARequest?userId=${this.props.currentUser}&requestName=${this.state.fpaRequests[index].requestName}`,
      {
        method: "POST",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.message) {
            // alert("Request canceled Succesfully");
            let l = this.state.fpaRequests;
            l.splice(index, 1);
            this.setState({
              fpaRequests: l,
            });
          } else {
            alert(response.text);
            console.log(response.text);
          }
        })
      )
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      });
  }

  render() {
    let createButton;
    let viewComponent;
    if (!this.state.createPanelSignal) {
      createButton = (
        <button
          className="topCreateButton"
          onClick={() =>
            this.setState({
              createPanelSignal: !this.state.createPanelSignal,
            })
          }
        >
          Create Request
        </button>
      );
      if (!this.state.fpaRequests.length) {
        viewComponent = (
          <div className="fpalistdiv fpalabel">
            No current FPA Requests Created
          </div>
        );
      } else {
        viewComponent = (
          <div className="fpalistdiv">
            {this.state.fpaRequests.map((request, index) => (
              <div className="fpaRequest" key={index}>
                <p>{request.requestName}</p>
                <div className="fpaInfoDiv">
                  <p>Status : {request.status}</p>
                  <button
                    className="fpaCancelButton"
                    onClick={() => this.cancelFPARequest(index)}
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      }
    } else {
      createButton = (
        <button
          className="topCreateButton"
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
          requestConfirmed={this.requestConfirmed.bind(this)}
          currentUser={this.props.currentUser}
        ></CreateFPARequest>
      );
    }
    return (
      <div className="fpa">
        <div className="top">
          <p className="fpalabel">FPA Requests</p>
          {createButton}
        </div>
        {viewComponent}
      </div>
    );
  }
}
