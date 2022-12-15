import React, { Component } from "react";
import PriceItem from "./priceItem";

export default class CreateItemPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      brandName: "",
      itemName: "",
      itemBrand: "",
      packType: "",
      price: 0,
      discount: 0,
      pricesList: [],
      availableCategoriesList: [],
      availableBrandsList: [],
    };
  }

  getCategories() {
    fetch(`/getCategories?userId=${this.props.currentUser}`)
      .then((response) => {
        response.json().then((response) => {
          this.setState({ availableCategoriesList: response.categoryList });
        });
      })
      .catch(() => alert("something went wrong"));
  }

  getBrands() {
    fetch(`/getBrands?userId=${this.props.currentUser}`)
      .then((response) => {
        response.json().then((response) => {
          this.setState({ availableBrandsList: response.brandsList });
        });
      })
      .catch(() => alert("something went wrong"));
  }

  componentDidMount() {
    this.getCategories();
    this.getBrands();
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

  addPack() {
    let obj = {
      packType: this.state.packType,
      price: this.state.price,
      discount: this.state.discount,
    };
    let l = this.state.pricesList;
    var signal = false;
    for (var i = 0; i < l.length; i++) {
      if (l[i].packType === obj.packType) {
        alert("Pack Type is already listed above.");
        signal = true;
        break;
      }
    }
    if (!signal) {
      l.push(obj);
      this.setState({ pricesList: l, packType: "", price: 0, discount: 0 });
    }
  }

  render() {
    let categorySelect = (
      <>
        <input
          type="text"
          list="Categories"
          value={this.state.categoryName}
          onChange={(event) =>
            this.setState({ categoryName: event.target.value })
          }
        />
        <datalist id="Categories">
          {this.state.availableCategoriesList.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </datalist>
      </>
    );

    let brandSelect = (
      <>
        <input
          type="text"
          list="Brands"
          value={this.state.brandName}
          onChange={(event) => this.setState({ brandName: event.target.value })}
        />
        <datalist id="Brands">
          {this.state.availableBrandsList.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </datalist>
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
      <div>
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
          onChange={(event) => this.setState({ itemName: event.target.value })}
        />
        <br />
        {pricesList}
        <br />
        <label>Enter Pack Type Name</label>
        <input
          type="text"
          value={this.state.packType}
          onChange={(event) => this.setState({ packType: event.target.value })}
        />
        <br />
        <label>Enter Price</label>
        <input
          type="text"
          value={this.state.price}
          onChange={(event) => this.setState({ price: event.target.value })}
        />
        <br />
        <label>Enter Discount</label>
        <input
          type="text"
          value={this.state.discount}
          onChange={(event) => this.setState({ discount: event.target.value })}
        />
        <br />
        <button onClick={this.addPack.bind(this)}>Add Pack</button>
        <button type="submit">Create Item</button>
      </div>
    );
  }
}
