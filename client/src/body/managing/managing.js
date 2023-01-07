import React, { Component } from "react";
import SearchPanel from "../billing/searchPanel/searchpanel";
import OperatePanel from "./operatePanel/operatePanel";

export default class Managing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
    this.searchPanelRef = React.createRef();
  }

  updateSelectedItem(newItem) {
    this.setState({
      selectedItem: newItem.data,
    });
  }

  updateSearchPanel() {
    this.searchPanelRef.current.searchItems();
  }

  render() {
    return (
      <div>
        <SearchPanel
          updateListedItems={this.updateSelectedItem.bind(this)}
          currentUser={this.props.currentUser}
          ref={this.searchPanelRef}
        />
        <OperatePanel
          updateSelectedItem={this.updateSelectedItem.bind(this)}
          currentUser={this.props.currentUser}
          selectedItem={this.state.selectedItem}
          updateSearchPanel={this.updateSearchPanel.bind(this)}
        />
      </div>
    );
  }
}
