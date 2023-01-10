import React, { Component } from "react";
import "./../../../../../css/priceitem.css";

export default class PriceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="priceItem">
        <div className="priceItemGrid">
          <label>Pack Type</label>
          <div>{this.props.packType}</div>
          <label>Price</label>
          <div>{this.props.price}</div>
          <label>Discount</label>
          <discount>{this.props.discount}</discount>
        </div>
        <button
          className="priceItemButton"
          onClick={() => {
            console.log(this.props.index);
            this.props.removePriceItem({ index: this.props.index });
          }}
        >
          remove
        </button>
      </div>
    );
  }
}
