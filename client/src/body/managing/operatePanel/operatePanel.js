import React, { Component } from "react";
import CreateCategoryPanel from "./tasks/createCategoryPanel";
import CreateBrandpanel from "./tasks/createBrandPanel";
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
    this.createItemPanelRef = React.createRef();
  }

  updateSelectCategoryElement() {
    this.createItemPanelRef.current.getCategories();
  }

  updateSelectBrandElement() {
    this.createItemPanelRef.current.getBrands();
  }

  render() {
    let display;
    if (Object.keys(this.props.selectedItem).length === 0) {
      display = (
        <CreateItemPanel
          currentUser={this.props.currentUser}
          ref={this.createItemPanelRef}
        />
      );
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
        <CreateCategoryPanel
          currentUser={this.props.currentUser}
          updateSelectCategoryElement={this.updateSelectCategoryElement.bind(
            this
          )}
        />
        <CreateBrandpanel
          currentUser={this.props.currentUser}
          updateSelectBrandElement={this.updateSelectBrandElement.bind(this)}
        />
        {display}
      </>
    );
  }
}
