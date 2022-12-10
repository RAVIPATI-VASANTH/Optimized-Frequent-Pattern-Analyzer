import React, { Component } from "react";
import SearchPanel from "../billing/searchPanel/searchpanel";
import OperatePanel from "./operatePanel/operatePanel";

export default class Managing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listedItems: [],
    };
  }

  updateListedItems(newItem) {
    let l = this.state.listedItems;
    l.push(newItem);
    this.setState({
      listedItems: l,
    });
  }

  render() {
    return (
      <>
        <SearchPanel updateListedItems={this.updateListedItems.bind(this)} />
        <OperatePanel />
      </>
    );
  }
}
