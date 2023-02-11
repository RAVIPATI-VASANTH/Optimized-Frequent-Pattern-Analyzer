import React, { Component } from "react";

export default class BrandInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { brandsList: [], status: "", selectedCategory: {} };
  }

  componentDidMount() {
    fetch(
      `http://127.0.0.1:5000/getFPARequestBrandInfo?userId=${this.props.fpaActive.userId}&requestName=${this.props.fpaActive.requestName}`,
      { method: "POST" }
    ).then((res) =>
      res.json().then((res) => {
        if (res.message) {
          this.setState({
            brandsList: res.brandsInfo.brandsList,
            status: res.brandsInfo.status,
          });
        } else {
          console.log(res.text);
        }
      })
    );
  }

  updateCategory(category) {
    for (var i = 0; i < this.state.brandsList.length; i++) {
      if (this.state.brandsList[i].categoryName === category) {
        this.setState({
          selectedCategory: this.state.brandsList[i],
        });
        break;
      }
    }
  }

  render() {
    let brandsInfo = <div></div>;
    let category = "";
    if (this.state.brandsList.length !== 0) {
      brandsInfo = (
        <div>
          {this.state.brandsList.map((obj) => (
            <p onClick={() => this.updateCategory(obj.categoryName)}>
              {obj.categoryName}
            </p>
          ))}
        </div>
      );
    }

    if (Object.keys(this.state.selectedCategory).length !== 0) {
      category = this.state.selectedCategory.categoryName;
    }

    return (
      <div>
        <p>Status : {this.state.status}</p>
        {brandsInfo}
        <div>selected : {category}</div>
      </div>
    );
  }
}
