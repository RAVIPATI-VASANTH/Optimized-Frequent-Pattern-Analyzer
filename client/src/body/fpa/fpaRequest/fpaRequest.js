import React, { Component } from "react";

export default class FPARequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {},
    };
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:5000/getFPARequestInfo?userId=${this.props.fpaActive.userId}&requestName=${this.props.fpaActive.requestName}`,
      { method: "POST" }
    ).then((res) =>
      res.json().then((res) => {
        if (res.message) {
          console.log(res.request);
        } else {
          console.log(res.text);
        }
      })
    );
  }

  // componentDidUpdate() {}

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
