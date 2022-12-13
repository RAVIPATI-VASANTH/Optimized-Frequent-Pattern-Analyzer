import React, { Component } from "react";

export default class UpdateItemPanel extends Component {
  render() {
    return (
      <div>
        Selected Item
        <p>{this.props.selectedItem.itemName}</p>
        <button onClick={() => this.props.updateSelectedItem({ data: {} })}>
          Cancel
        </button>
        <button>Update Item</button>
      </div>
    );
  }
}
