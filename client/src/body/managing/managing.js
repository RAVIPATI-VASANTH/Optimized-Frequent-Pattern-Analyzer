import React, { Component } from "react";
import SearchPanel from "../billing/searchPanel/searchpanel";
import OperatePanel from "./operatePanel/operatePanel";

export default class Managing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
  }

  updateSelectedItem(newItem) {
    this.setState({
      selectedItem: newItem.data,
    });
  }

  updateSelectCollectionElement() {
    console.log("request for update the select the collection name");
  }

  render() {
    return (
      <>
        <SearchPanel
          updateListedItems={this.updateSelectedItem.bind(this)}
          currentUser={this.props.currentUser}
        />
        <OperatePanel
          updateSelectedItem={this.updateSelectedItem.bind(this)}
          currentUser={this.props.currentUser}
          selectedItem={this.state.selectedItem}
          // updateSelectCollectionElement={this.updateSelectCollectionElement.bind(
          //   this
          // )}
        />
      </>
    );
  }
}
