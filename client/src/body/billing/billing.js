import React, { Component } from "react";
import SearchPanel from "./searchPanel/searchpanel";
import ListPanel from "./listingPanel/listPanel";

export default class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listedItems: [],
    };
  }

  updateListedItems(newItem) {
    let l = this.state.listedItems;
    l.push(newItem.data);
    this.setState({
      listedItems: l,
    });
  }

  render() {
    return (
      <>
        <SearchPanel
          updateListedItems={this.updateListedItems.bind(this)}
        ></SearchPanel>
        <ListPanel listedItems={this.state.listedItems}></ListPanel>
      </>
    );
  }
}
