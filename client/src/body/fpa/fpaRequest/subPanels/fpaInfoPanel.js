import React, { Component } from "react";
import "./../../../../css/fpaInfoPanel.css";
//note sone css sre taken directly from other files with out import

export default class FpaInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      min: 0,
      max: 0,
      list: [],
      displayList: [],
      signal: false,
      sortOrder: 1,
    };
  }

  updateARList() {
    let l = [];
    if (this.state.min <= this.state.max) {
      this.state.list.forEach((arRule) => {
        if (
          arRule.confidence >= this.state.min &&
          arRule.confidence <= this.state.max
        )
          l.push(arRule);
      });
    }
    this.setState(
      {
        displayList: l,
      },
      this.sortARList()
    );
  }

  compareAR(ar1, ar2) {
    if (ar1.confidence < ar2.confidence) {
      return -1;
    }
    if (ar1.confidence < ar2.confidence) {
      return 1;
    }
    return 0;
  }

  sortARList() {
    let l = this.state.displayList;
    l.sort(this.compareAR);
    if (this.state.sortOrder === 1) {
      this.setState({
        displayList: l,
        sortOrder: 0,
      });
    } else {
      this.setState({
        displayList: l.reverse(),
        sortOrder: 1,
      });
    }
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:5000/getFPARequestInfo?userId=${this.props.fpaActive.userId}&requestName=${this.props.fpaActive.requestName}`,
      { method: "POST" }
    ).then((res) =>
      res.json().then((res) => {
        if (res.message) {
          this.setState(
            {
              status: res.fpaInfo.status,
              min: Math.ceil(res.fpaInfo.arList.min) - 1,
              max: Math.floor(res.fpaInfo.arList.max),
              list: res.fpaInfo.arList.list,
              displayList: res.fpaInfo.arList.list,
            },
            this.updateARList()
          );
        } else {
          console.log(res.text);
        }
      })
    );
  }

  render() {
    let displayList = <></>;
    displayList = (
      <div className="listedSelectedItems">
        {this.state.displayList.map((ar) => (
          <div className="eachAR">
            <p className="lrhs">
              {ar.lhs.map((item) => (
                <p className="itemNameInfoPanel">{item}</p>
              ))}
            </p>
            <p className="lrhs">
              {ar.rhs.map((item) => (
                <p className="itemNameInfoPanel">{item}</p>
              ))}
            </p>
            <p className="confidenceDisplay">{ar.confidence}</p>
          </div>
        ))}
      </div>
    );

    return (
      <div className="fpaInfoARPanel">
        <div className="infoTags">
          <p className="infoBarLabels">Status : {this.state.status}</p>
          <div className="confidenceDiv">
            <p className="infoBarLabels">Confidence</p>
            <label className="infoBarLabels">min</label>
            <input
              className="rangeInput"
              type="number"
              value={this.state.min}
              onChange={(event) => {
                this.setState({
                  min: event.currentTarget.value,
                });
              }}
            />
            <label className="infoBarLabels">max</label>
            <input
              className="rangeInput"
              type="number"
              value={this.state.max}
              onChange={(event) => {
                this.setState({
                  max: event.currentTarget.value,
                });
              }}
            />
            <button className="applyButton" onClick={() => this.updateARList()}>
              apply
            </button>
            <button className="applyButton" onClick={() => this.sortARList()}>
              sort
            </button>
          </div>
          <p className="infoBarLabels">
            results in range : {this.state.displayList.length}
          </p>
        </div>
        {displayList}
      </div>
    );
  }
}
