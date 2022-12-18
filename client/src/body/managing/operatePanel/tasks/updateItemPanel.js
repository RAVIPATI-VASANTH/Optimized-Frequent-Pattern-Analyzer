import React, { Component } from "react";
import PriceItem from "./subTasks/priceItem";

export default class UpdateItemPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIndex: 0,
      brandIndex: 0,
      itemName: this.props.selectedItem.itemName,
      packType: "",
      price: 0,
      discount: 0,
      pricesList: this.props.selectedItem.itemPrices,
    };
  }

  getCategoryIndex() {
    for (var i = 0; i < this.props.availableCategoriesList.length; i++) {
      if (
        this.props.selectedItem.categoryName ===
        this.props.availableCategoriesList[i].category
      ) {
        return i;
      }
    }
  }

  getBrandIndex() {
    for (var i = 0; i < this.props.availableBrandsList.length; i++) {
      if (
        this.props.selectedItem.brandName ===
        this.props.availableBrandsList[i].brandName
      ) {
        return i;
      }
    }
  }

  removePriceItem(data) {
    if (this.state.pricesList.length === 1) {
      this.setState({ pricesList: [] });
    } else {
      let l = this.state.pricesList;
      l.splice(data.index, 1);
      this.setState({ pricesList: l });
    }
  }

  componentDidMount() {
    this.setState({
      categoryIndex: this.getCategoryIndex(),
      brandIndex: this.getBrandIndex(),
    });
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevprops.selectedItem.itemName !== this.props.selectedItem.itemName) {
      this.setState({
        categoryIndex: this.getCategoryIndex(),
        brandIndex: this.getBrandIndex(),
        itemName: this.props.selectedItem.itemName,
        pricesList: this.props.selectedItem.itemPrices,
      });
    }
  }

  categorySelectHandler(index) {
    this.setState({
      categoryIndex: Number(index),
    });
  }

  brandSelectHandler(index) {
    this.setState({
      brandIndex: Number(index),
    });
  }

  validity() {
    if (!this.state.itemName) {
      alert("Item Name Cannot be Empty");
      return false;
    } else if (this.state.pricesList.length === 0) {
      alert("Please create atleast one Pack Type.");
      return false;
    }
    return true;
  }

  updateItem() {
    if (this.validity()) {
      console.log(
        this.props.selectedItem,
        this.state,
        this.props.availableBrandsList[this.state.brandIndex],
        this.props.availableCategoriesList[this.state.categoryIndex]
      );
    }
  }

  render() {
    let categoryOptions = [];
    this.props.availableCategoriesList.forEach((element, index) => {
      if (element === this.props.selectedItem.categoryName) {
        categoryOptions.push(
          <option key={index} value={index} selected>
            {element}
          </option>
        );
      } else {
        categoryOptions.push(
          <option key={index} value={index}>
            {element}
          </option>
        );
      }
    });

    let brandOptions = [];
    this.props.availableBrandsList.forEach((element, index) => {
      if (element === this.props.selectedItem.itemBrand) {
        brandOptions.push(
          <option key={index} value={index} selected>
            {element}
          </option>
        );
      } else {
        brandOptions.push(
          <option key={index} value={index}>
            {element}
          </option>
        );
      }
    });

    let categorySelect = (
      <>
        <select
          onChange={(event) => {
            this.categorySelectHandler(event.target.value);
          }}
        >
          {categoryOptions.map((option) => option)}
        </select>
      </>
    );

    let brandSelect = (
      <>
        <select
          onChange={(event) => {
            this.brandSelectHandler(event.target.value);
          }}
        >
          {brandOptions.map((option) => option)}
        </select>
      </>
    );

    let pricesList = (
      <>
        {this.state.pricesList.map((obj, index) => (
          <PriceItem
            index={index}
            packType={obj.packType}
            price={obj.price}
            discount={obj.discount}
            removePriceItem={this.removePriceItem.bind(this)}
          />
        ))}
      </>
    );

    return (
      <>
        <label>Select Category</label>
        {categorySelect}
        <br />
        <label>Select Brand</label>
        {brandSelect}
        <br />
        <label>Enter Item Name</label>
        <input
          type="text"
          value={this.state.itemName}
          onChange={(event) =>
            this.setState({ itemName: event.target.value.trim() })
          }
        />
        <br />
        {pricesList}
        <button onClick={() => this.props.updateSelectedItem({ data: {} })}>
          Cancel
        </button>
        <button onClick={this.updateItem.bind(this)}>Update Item</button>
      </>
    );
  }
}
