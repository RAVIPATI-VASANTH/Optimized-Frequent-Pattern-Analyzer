import React, { Component } from "react";
import SearchPanel from "./searchPanel/searchpanel";
import ListPanel from "./listingPanel/listPanel";
import "./../../css/billing.css";

export default class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listedItems: [],
    };
  }

  updateListedItems(newItem) {
    newItem = {
      ...newItem.data,
      quantity: 0,
      packType: 0,
    };
    let l = this.state.listedItems;
    l.push(newItem);

    this.setState({
      listedItems: l,
    });
  }

  quantityHandler(itemIndex, quantity) {
    let items = this.state.listedItems;
    items[itemIndex].quantity = quantity;
    this.setState({
      listedItems: items,
    });
  }

  selectHandler(itemIndex, packType) {
    let items = this.state.listedItems;
    items[itemIndex].packType = packType;
    this.setState({
      listedItems: items,
    });
  }

  removeButtonHandler(itemIndex) {
    let l = this.state.listedItems;
    if (l.length === 1) l = [];
    else l.splice(itemIndex, 1);
    this.setState({
      listedItems: l,
    });
  }

  clearListedItems() {
    this.setState({ listedItems: [] });
  }

  render() {
    return (
      <div className="billing">
        <SearchPanel
          updateListedItems={this.updateListedItems.bind(this)}
          currentUser={this.props.currentUser}
        />
        <ListPanel
          currentUser={this.props.currentUser}
          listedItems={this.state.listedItems}
          quantityHandler={this.quantityHandler.bind(this)}
          selectHandler={this.selectHandler.bind(this)}
          removeButtonHandler={this.removeButtonHandler.bind(this)}
          clearListedItems={this.clearListedItems.bind(this)}
        />
      </div>
    );
  }
}
