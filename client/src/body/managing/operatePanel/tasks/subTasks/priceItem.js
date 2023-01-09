import React, { Component } from "react";

export default class PriceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>{this.props.packType}</p>
        <p>{this.props.price}</p>
        <p>{this.props.discount}</p>
        <button
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
