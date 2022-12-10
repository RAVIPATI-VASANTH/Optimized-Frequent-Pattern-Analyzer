import React, { Component } from "react";

export default class ListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBill: 0,
    };
  }

  static getDerivedStateFromProps(nextprops, prevstate) {
    let l = [];
    nextprops.listedItems.forEach((item) => {
      let obj = { ...item, quantity: 0, packType: 0 };
      l.push(obj);
    });
    return { listedItems: l };
  }

  quantityHandler(obj) {
    const [itemIndex, quantity] = obj.split("-");
    this.props.quantityHandler(Number(itemIndex), Number(quantity));
    this.calculateBill();
  }

  selectHandler(obj) {
    const [itemIndex, packType] = obj.split("-");
    this.props.selectHandler(Number(itemIndex), Number(packType));
    this.calculateBill();
  }

  removeButtonHandler(event) {
    this.props.removeButtonHandler(Number(event.target.value));
    this.calculateBill();
  }

  calculateBill() {
    let sum = 0;
    this.props.listedItems.forEach((item) => {
      let itemSum = item.quantity * item.itemPrices[item.packType].price;
      itemSum =
        itemSum - (itemSum * item.itemPrices[item.packType].discount) / 100;
      sum = sum + itemSum;
    });
    this.setState({
      totalBill: sum,
    });
  }

  getTransactionalData() {
    let l = [];
    this.props.listedItems.forEach((item) => {
      l.push({
        categoryName: item.categoryName,
        itemName: item.itemName,
        itemBrand: item.itemBrand,
        itemPrice: {
          packType: item.itemPrices[item.packType].packType,
          price: item.itemPrices[item.packType].price,
          discount: item.itemPrices[item.packType].discount,
        },
      });
    });
    let date = new Date();
    let timeStamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    return { itemsList: l, timeStamp: timeStamp };
  }

  checkQuantity() {
    for (let i = 0; i < this.props.listedItems.length; i++) {
      if (this.props.listedItems[i].quantity === 0) {
        return true;
      }
    }
    return false;
  }

  confirmTransaction() {
    if (this.checkQuantity())
      alert(
        "Some of the selected items quantities are set as 0, Please update or Remove the Item"
      );
    else if (this.props.listedItems.length === 0)
      alert("Please select the items");
    else {
      let signal = window.confirm(
        `Final transaction worth is ${this.state.totalBill}/-\nClick OK to make Trnasaction.`
      );
      if (signal) {
        let transactionalData = this.getTransactionalData();
        fetch(
          `/saveTransaction?transaction=${JSON.stringify(transactionalData)}`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.message) {
              alert("Transaction Successfull");
              this.props.clearListedItems();
              this.calculateBill();
            } else {
              alert("Something went Wrong");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  render() {
    //when anything goes wrong with bill count, do billing  in parent component.
    let totalBill = <p>Current Bill : {this.state.totalBill} /-</p>;
    let itemsComponents = this.props.listedItems.map((item, itemIndex) => (
      <div>
        <p>{item.itemName}</p>
        <button value={itemIndex} onClick={this.removeButtonHandler.bind(this)}>
          X
        </button>
        <div>
          <label>quantity</label>
          <input
            type="number"
            min="0"
            placeholder="0"
            onChange={(event) => {
              this.quantityHandler(`${itemIndex}-${event.target.value}`);
            }}
          />
          <br />
          <select
            onChange={(event) => {
              this.selectHandler(event.target.value);
            }}
          >
            {item.itemPrices.map((pricePack, priceIndex) => (
              <option value={`${itemIndex}-${priceIndex}`}>
                {pricePack.packType} , {pricePack.price}
              </option>
            ))}
          </select>
          <p>
            Discount :
            {
              this.props.listedItems[itemIndex].itemPrices[
                this.props.listedItems[itemIndex].packType
              ].discount
            }
            %
          </p>
        </div>
      </div>
    ));
    return (
      <div>
        <div>Listed Items</div>
        {itemsComponents}
        {totalBill}
        <button onClick={this.confirmTransaction.bind(this)}>
          Confirm Transaction
        </button>
      </div>
    );
  }
}
