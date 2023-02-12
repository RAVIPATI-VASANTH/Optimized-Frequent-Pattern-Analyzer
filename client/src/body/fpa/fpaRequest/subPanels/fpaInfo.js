import React, { Component } from "react";
import "./../../../../css/fpaInfo.css";

export default class FpaInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minSupport: 0,
      selectedList: {},
      date: {},
      status: "",
    };
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:5000/getFPARequestBasicInfo?userId=${this.props.fpaActive.userId}&requestName=${this.props.fpaActive.requestName}`,
      { method: "POST" }
    ).then((res) =>
      res.json().then((res) => {
        if (res.message) {
          this.setState({
            minSupport: res.info.minSupport,
            selectedList: { ...res.info.selectedList },
            date: res.info.date,
            status: res.info.status,
          });
        } else {
          console.log(res.text);
        }
      })
    );
  }

  startFPARequest() {
    fetch(
      `http://127.0.0.1:5000/startFPARequest?userId=${this.props.fpaActive.userId}&requestName=${this.props.fpaActive.requestName}`,
      { method: "POST" }
    ).then((res) =>
      res.json().then((res) => {
        if (res.message) {
          console.log("started");
        } else {
          console.log(res.text);
        }
      })
    );
  }

  render() {
    let startButton = <></>;
    if (this.state.status === "Draft") {
      startButton = (
        <button
          className="fpaBackButton"
          onClick={() => this.startFPARequest()}
        >
          Start Now
        </button>
      );
    }

    let brandDiv = <></>;
    let categoryDiv = <></>;
    let itemsDiv = <></>;

    if (Object.keys(this.state.selectedList).length !== 0) {
      if (this.state.selectedList.brands.length !== 0) {
        brandDiv = (
          <div className="candbGrids">
            {this.state.selectedList.brands.map((brand) => (
              <p className="listedItem">{brand}</p>
            ))}
          </div>
        );
      }
      if (this.state.selectedList.categories.length !== 0) {
        categoryDiv = (
          <div className="candbGrids">
            {this.state.selectedList.categories.map((category) => (
              <p className="listedItem">{category}</p>
            ))}
          </div>
        );
      }
      if (this.state.selectedList.items.length !== 0) {
        itemsDiv = (
          <div className="itemsFlex">
            {this.state.selectedList.items.map((item) => (
              <div className="eachItemDiv">
                <p className="listedItem">{item.itemName}</p>
                <p className="listedItem">{item.categoryName}</p>
                <p className="listedItem">{item.itemBrand}</p>
              </div>
            ))}
          </div>
        );
      }
    }

    return (
      <div className="fpaInfoPanel">
        <div className="infoTags">
          <p className="infoBarLabels">
            Status : {this.state.status} {startButton}
          </p>
          <p className="infoBarLabels">
            Minimum Support : {this.state.minSupport}
          </p>
          <p className="infoBarLabels">
            From : {this.state.date.from} To :{this.state.date.to}
          </p>
        </div>
        <div className="listedSelectedItems">
          <p className="typeLabel">Categories</p>
          {categoryDiv}
          <p className="typeLabel">Brands</p>
          {brandDiv}
          <p className="typeLabel">Items</p>
          {itemsDiv}
        </div>
      </div>
    );
  }
}
