import React, { Component } from "react";
import FpaInfoPanel from "./subPanels/fpaInfoPanel";
import BrandInfoPanel from "./subPanels/brandInfoPanel";
import FpaInfo from "./subPanels/fpaInfo";

export default class FPARequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {},
      panel: 0,
    };
  }

  render() {
    let analysisView;
    if (this.state.panel === 0) {
      analysisView = <FpaInfo fpaActive={this.props.fpaActive}></FpaInfo>;
    } else if (this.state.panel === 1)
      analysisView = (
        <FpaInfoPanel fpaActive={this.props.fpaActive}></FpaInfoPanel>
      );
    else if (this.state.panel === 2)
      analysisView = (
        <BrandInfoPanel fpaActive={this.props.fpaActive}></BrandInfoPanel>
      );
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
        <div className="selectionBar">
          <button onClick={() => this.setState({ panel: 0 })}>Info</button>
          <button onClick={() => this.setState({ panel: 1 })}>FP - Sets</button>
          <button onClick={() => this.setState({ panel: 2 })}>
            Brand Analysis
          </button>
        </div>
        <div className="analysisView">{analysisView}</div>
      </div>
    );
  }
}
