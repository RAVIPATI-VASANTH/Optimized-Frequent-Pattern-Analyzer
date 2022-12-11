import React, { Component } from "react";
import CreateCollectionPanel from "./createCollectionPanel";
export default class OperatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
  }

  render() {
    console.log(this.props);
    return (
      <>
        <CreateCollectionPanel />
        <p>{this.props.selectedItem.itemName}</p>
      </>
    );
  }
}
