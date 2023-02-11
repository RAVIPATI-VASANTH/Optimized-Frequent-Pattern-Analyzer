import React, { Component } from "react";

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
    this.setState({
      displayList: l,
    });
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
    let displayList;
    displayList = (
      <div>
        {this.state.displayList.map((ar) => (
          <div>
            <p>{ar.lhs.toString()}</p>
            <p>{ar.rhs.toString()}</p>
            <p>{ar.confidence}</p>
          </div>
        ))}
      </div>
    );

    return (
      <div>
        <div>
          <p>Status : {this.state.status}</p>
          <div>
            <p>Confidence</p>
            <label>min</label>
            <input
              type="number"
              value={this.state.min}
              onChange={(event) => {
                this.setState({
                  min: event.currentTarget.value,
                });
              }}
            />
            <label>max</label>
            <input
              type="number"
              value={this.state.max}
              onChange={(event) => {
                this.setState({
                  max: event.currentTarget.value,
                });
              }}
            />
            <button onClick={() => this.updateARList()}>apply</button>
            <p>results in range : {this.state.displayList.length}</p>
          </div>
        </div>
        <>{displayList}</>
      </div>
    );
  }
}
