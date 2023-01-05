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
      availableCategoriesList: [],
      availableBrandsList: [],
    };
  }

  updateSelectCategoryElement() {
    this.getCategories();
  }

  updateSelectBrandElement() {
    this.getBrands();
  }

  getCategories() {
    fetch(
      `http://127.0.0.1:5000/getCategories?userId=${this.props.currentUser}`
    )
      .then((response) => {
        response.json().then((response) => {
          this.setState({
            availableCategoriesList: response.categoryList,
          });
        });
      })
      .catch(() => alert("something went wrong"));
  }

  getBrands() {
    fetch(`http://127.0.0.1:5000/getBrands?userId=${this.props.currentUser}`)
      .then((response) => {
        response.json().then((response) => {
          this.setState({
            availableBrandsList: response.brandsList,
          });
        });
      })
      .catch(() => alert("something went wrong"));
  }

  componentDidMount() {
    this.getCategories();
    this.getBrands();
  }

  render() {
    let display;
    if (Object.keys(this.props.selectedItem).length === 0) {
      display = (
        <CreateItemPanel
          currentUser={this.props.currentUser}
          availableBrandsList={this.state.availableBrandsList}
          availableCategoriesList={this.state.availableCategoriesList}
          updateSearchPanel={this.props.updateSearchPanel}
        />
      );
    } else {
      display = (
        <UpdateItemPanel
          currentUser={this.props.currentUser}
          selectedItem={this.props.selectedItem}
          availableBrandsList={this.state.availableBrandsList}
          availableCategoriesList={this.state.availableCategoriesList}
          updateSelectedItem={this.props.updateSelectedItem}
          updateSearchPanel={this.props.updateSearchPanel}
        />
      );
    }
    return (
      <>
        <CreateCategoryPanel
          currentUser={this.props.currentUser}
          updateCategoriesList={this.getCategories.bind(this)}
        />
        <CreateBrandpanel
          currentUser={this.props.currentUser}
          updatebrandsList={this.getBrands.bind(this)}
        />
        {display}
      </>
    );
  }
}
