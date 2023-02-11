import React, { Component } from "react";

export default class FpaInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minSupport: 0,
      selectedList: {},
      date: {},
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
          });
        } else {
          console.log(res.text);
        }
      })
    );
  }
  render() {
    let brandDiv = <></>;
    let categoryDiv = <></>;
    let itemsDiv = <></>;

    if (Object.keys(this.state.selectedList).length !== 0) {
      if (this.state.selectedList.brands.length !== 0) {
        brandDiv = (
          <>
            <p>Brands</p>
            {this.state.selectedList.brands.map((brand) => (
              <p>{brand}</p>
            ))}
          </>
        );
      }
      if (this.state.selectedList.categories.length !== 0) {
        categoryDiv = (
          <>
            <p>Categories</p>
            {this.state.selectedList.categories.map((category) => (
              <p>{category}</p>
            ))}
          </>
        );
      }
      if (this.state.selectedList.items.length !== 0) {
        itemsDiv = (
          <>
            <p>Items</p>
            {this.state.selectedList.items.map((item) => (
              <div>
                <p>{item.itemName}</p>
                <p>{item.categoryName}</p>
                <p>{item.itemBrand}</p>
              </div>
            ))}
          </>
        );
      }
    }

    return (
      <div>
        <p>
          Minimum Support : {this.state.minSupport}
          From : {this.state.date.from} To :{this.state.date.to}
        </p>
        <div>
          {categoryDiv}
          {brandDiv}
          {itemsDiv}
        </div>
      </div>
    );
  }
}
