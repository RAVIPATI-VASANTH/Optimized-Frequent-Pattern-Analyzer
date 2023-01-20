import React, { Component } from "react";

export default class FPARequest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="infoBar">
          <p>{this.props.fpaActive.requestName}</p>
          <p>Status : {this.props.fpaActive.status}</p>
          <button
            onClick={() => {
              this.props.setFPAActiveToNull();
            }}
          >
            Back
          </button>
        </div>
        <div className="fpaInfoDiv">FPA</div>
        <div className="timelineInfoDiv">TimeLines</div>
        <div className="discountInfoDiv">Discount</div>
        <div className="brandInfoDiv">Brand Status</div>
      </div>
    );
  }
}
