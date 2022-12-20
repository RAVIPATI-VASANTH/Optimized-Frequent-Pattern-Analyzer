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
      pricesList: [...this.props.selectedItem.itemPrices],
    };
  }

  getCategoryIndex() {
    return this.props.availableCategoriesList.indexOf(
      this.props.selectedItem.categoryName
    );
  }

  getBrandIndex() {
    return this.props.availableBrandsList.indexOf(
      this.props.selectedItem.itemBrand
    );
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
        pricesList: [...this.props.selectedItem.itemPrices],
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
    if (!this.state.itemName.trim()) {
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
      let item = {
        categoryName:
          this.props.availableCategoriesList[this.state.categoryIndex],
        itemName: this.state.itemName.trim(),
        itemBrand: this.props.availableBrandsList[this.state.brandIndex],
        itemPrices: this.state.pricesList,
      };
      fetch(
        `/updateItem?userId=${
          this.props.currentUser
        }&updatedItem=${JSON.stringify(item)}&prevItem=${JSON.stringify(
          this.props.selectedItem
        )}`,
        { method: "POST" }
      )
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              alert("Item Updated Successfully");
              this.props.updateSearchPanel();
              this.props.updateSelectedItem({ data: {} });
            } else {
              alert(response.text);
            }
          })
        )
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        });
    }
  }

  deleteItem() {
    fetch(`/deleteItem?item=${JSON.stringify(this.props.selectedItem)}`, {
      method: "POST",
    })
      .then((response) =>
        response.json().then((reponse) => {
          if (reponse.message) {
            alert("Item Deleted Succefully");
            this.props.updateSearchPanel();
          } else {
            alert(reponse.text);
          }
        })
      )
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
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
        <button onClick={() => this.props.updateSelectedItem({ data: {} })}>
          Cancel
        </button>
        <button onClick={this.updateItem.bind(this)}>Update Item</button>
        <button onClick={this.deleteItem.bind(this)}>Delete Item</button>
      </>
    );
  }
}
