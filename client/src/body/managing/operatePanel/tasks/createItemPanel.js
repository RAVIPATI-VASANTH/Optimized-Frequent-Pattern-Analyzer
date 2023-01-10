import React, { Component } from "react";
import PriceItem from "./subTasks/priceItem";
import "./../../../../css/createItem.css";

export default class CreateItemPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIndex: 0,
      brandIndex: 0,
      itemName: "",
      packType: "",
      price: 0,
      discount: 0,
      pricesList: [],
    };
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
    if (this.state.packType.trim() && this.state.price) {
      let obj = {
        packType: this.state.packType.trim(),
        price: Number(this.state.price),
        discount: Number(this.state.discount),
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
    } else {
      alert("Please Fill the Pack Type Name and Price");
    }
  }

  validate() {
    if (!this.state.itemName.trim()) {
      alert("Item Name Cannot be Empty");
      return false;
    } else if (this.state.pricesList.length === 0) {
      alert("Please create atleast one Pack Type.");
      return false;
    }
    return true;
  }

  createItem() {
    if (this.validate()) {
      let item = {
        categoryName:
          this.props.availableCategoriesList[this.state.categoryIndex],
        itemName: this.state.itemName,
        itemBrand: this.props.availableBrandsList[this.state.brandIndex],
        itemPrices: this.state.pricesList,
      };
      fetch(
        `http://127.0.0.1:5000/createItem?userId=${
          this.props.currentUser
        }&item=${JSON.stringify(item)}`,
        { method: "POST" }
      )
        .then((response) => {
          response.json().then((response) => {
            if (response.message) {
              this.setState({
                categoryIndex: 0,
                brandIndex: 0,
                itemName: "",
                itemBrand: "",
                packType: "",
                price: 0,
                discount: 0,
                pricesList: [],
              });
              alert("Item inserted Successfully");
              this.props.updateSearchPanel();
            } else {
              alert(response.text);
            }
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Something Went Wrong");
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

  render() {
    let categorySelect = (
      <>
        <select
          className="selectCB"
          id="categorySelect"
          onChange={(event) => {
            this.categorySelectHandler(event.target.value);
          }}
        >
          {this.props.availableCategoriesList.map((category, index) => (
            <option key={index} value={index}>
              {category}
            </option>
          ))}
        </select>
      </>
    );

    let brandSelect = (
      <>
        <select
          className="selectCB"
          id="brandSelect"
          onChange={(event) => {
            this.brandSelectHandler(event.target.value);
          }}
        >
          {this.props.availableBrandsList.map((brand, index) => (
            <option key={index} value={index}>
              {brand}
            </option>
          ))}
        </select>
      </>
    );

    let pricesList = (
      <div className="createPriceListDiv">
        {this.state.pricesList.map((obj, index) => (
          <PriceItem
            index={index}
            packType={obj.packType}
            price={obj.price}
            discount={obj.discount}
            removePriceItem={this.removePriceItem.bind(this)}
          />
        ))}
      </div>
    );

    return (
      <div className="subPanel">
        <div className="createGrid">
          <label for="categorySelect">Category</label>
          {categorySelect}
          <label for="brandSelect">Brand</label>
          {brandSelect}
          <label for="itemName">Item Name</label>
          <input
            id="itemName"
            className="itemName"
            type="text"
            value={this.state.itemName}
            onChange={(event) =>
              this.setState({ itemName: event.target.value })
            }
          />
          <label for="itemPack">Pack Type</label>
          <input
            placeholder="enter here.."
            id="itemPack"
            className="itemPack"
            type="text"
            value={this.state.packType}
            onChange={(event) =>
              this.setState({ packType: event.target.value })
            }
          />
          <label>Price</label>
          <input
            className="itemPack"
            type="text"
            value={this.state.price}
            onChange={(event) => this.setState({ price: event.target.value })}
          />
          <label>Discount</label>
          <input
            className="itemPack"
            type="text"
            value={this.state.discount}
            onChange={(event) =>
              this.setState({ discount: event.target.value })
            }
          />
        </div>
        {pricesList}
        <div className="createButtonGrid">
          <button
            className="createPanelButton"
            onClick={this.addPack.bind(this)}
          >
            Add Pack
          </button>
          <button
            className="createPanelButton"
            onClick={this.createItem.bind(this)}
          >
            Create Item
          </button>
        </div>
      </div>
    );
  }
}
