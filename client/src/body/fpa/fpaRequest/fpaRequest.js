import React, { Component } from "react";
import FpaInfoPanel from "./subPanels/fpaInfoPanel";
import BrandInfoPanel from "./subPanels/brandInfoPanel";
import FpaInfo from "./subPanels/fpaInfo";
import "./../../../css/fpaRequest.css";

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

    let selectionBarButtons = [];
    let className = "selectionBarButton";
    if (this.state.panel === 0) {
      className = "selectionBarButtonActive";
    }
    selectionBarButtons.push(
      <button className={className} onClick={() => this.setState({ panel: 0 })}>
        Info
      </button>
    );

    className = "selectionBarButton";
    if (this.state.panel === 1) {
      className = "selectionBarButtonActive";
    }
    selectionBarButtons.push(
      <button className={className} onClick={() => this.setState({ panel: 1 })}>
        FP - Sets
      </button>
    );

    className = "selectionBarButton";
    if (this.state.panel === 2) {
      className = "selectionBarButtonActive";
    }
    selectionBarButtons.push(
      <button className={className} onClick={() => this.setState({ panel: 2 })}>
        Brand Analysis
      </button>
    );
    return (
      <div className="fpaRequestNew">
        <div className="infoBar">
          <p className="infoBarLabels">{this.props.fpaActive.requestName}</p>
          <button
            className="fpaBackButton"
            onClick={() => {
              this.props.setFPAActiveToNull();
            }}
          >
            back
          </button>
        </div>
        <div className="selectionBar">
          {selectionBarButtons.map((button) => button)}
        </div>
        <div className="analysisView">{analysisView}</div>
      </div>
    );
  }
}
