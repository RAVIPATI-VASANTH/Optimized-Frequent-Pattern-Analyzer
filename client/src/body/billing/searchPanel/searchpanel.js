import React, { Component } from "react";

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      itemsList: [],
    };
  }

  searchItems() {
    //get the items from db as per searchString
    fetch("/searchItem", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
      })
      .catch((err) => {
        console.log(err);
      });
    //make components using them
    //add the created components to itemsList
    //add the components to SearchedItemsDisplayPanel
  }

  render() {
    return (
      <div>
        <input
          onChange={(event) => {
            this.setState({ searchString: event.target.value });
            this.searchItems();
          }}
        />
        <div>Searches Items Display</div>
      </div>
    );
  }
}
