import React, { Component } from "react";
import CreateFPARequest from "./createFPARequest/createFPARequest";

export default class FPA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createPanelSignal: true,
      fpaRequests:[]
    };
  }

  componentDidMount() {
    fetch(`/getFPARequests?userId=${this.props.currentUser}`, {
      method: "POST",
    })
      .then((response) =>
        response.json().then((response) => {
          if (response.message) {
            this.setState({
              fpaRequests:response.fpaRequests
            })
          } else {
            alert(response.text);
          }
        })
      )
      .catch((err) => console.log(err));
  }

  componentDidUpdate(previousProps, previousState){
    if(previousState.createPanelSignal!==this.state.createPanelSignal){
      fetch(`/getFPARequests?userId=${this.props.currentUser}`, {
        method: "POST",
      })
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              this.setState({
                fpaRequests:response.fpaRequests
              })
            } else {
              alert(response.text);
            }
          })
        )
        .catch((err) => console.log(err));
    }
  }

  requestConfirmed(){
    this.setState({
    createPanelSignal:!this.state.createPanelSignal
    });
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
      if(!this.state.fpaRequests.length){
        viewComponent = <>No current FPA Requests</>;
      }else{
        viewComponent=<>
          {
            this.state.fpaRequests.map((request,index)=>(<div index={index}>{request.requestName} {request.status}</div>))
          }
        </>
      }
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
          requestConfirmed={this.requestConfirmed.bind(this)}
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
