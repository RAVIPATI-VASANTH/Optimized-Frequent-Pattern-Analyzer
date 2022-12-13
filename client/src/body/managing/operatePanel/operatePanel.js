import React, { Component } from "react";
import CreateCategoryPanel from "./tasks/createCategoryPanel";
import CreateItemPanel from "./tasks/createItemPanel";
import UpdateItemPanel from "./tasks/updateItemPanel";

export default class OperatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      currentAction: true,
      availableCategoriesList: [],
    };
  }

  render() {
    let display;
    if (Object.keys(this.props.selectedItem).length === 0) {
      display = <CreateItemPanel currentUser={this.props.currentUser} />;
    } else {
      display = (
        <UpdateItemPanel
          currentUser={this.props.currentUser}
          selectedItem={this.props.selectedItem}
          updateSelectedItem={this.props.updateSelectedItem}
        />
      );
    }
    return (
      <>
        <CreateCategoryPanel currentUser={this.props.currentUser} />
        {display}
      </>
    );
  }
}
