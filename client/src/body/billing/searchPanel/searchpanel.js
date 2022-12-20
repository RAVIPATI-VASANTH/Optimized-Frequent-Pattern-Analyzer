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
    fetch(
      `/searchItem?searchItem=${this.state.searchString}&userId=${this.props.currentUser}`,
      {
        method: "GET",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.responseStatus) {
            this.setState({ itemsList: response.listObjects });
          } else {
            this.setState({ itemsList: [] });
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  selectItem(index) {
    let obj = this.state.itemsList[index];
    this.props.updateListedItems({ data: obj });
  }

  render() {
    let style = { cursor: "pointer" };
    let itemsComponents = this.state.itemsList.map((element, index) => (
      <div style={style} onClick={() => this.selectItem(index)}>
        <p>{element.itemName}</p>
      </div>
    ));
    if (this.state.itemsList.length === 0) {
      itemsComponents = <p>No Results</p>;
    }
    return (
      <div>
        <input
          placeholder="type for items"
          onChange={(event) => {
            this.setState(
              { searchString: event.target.value },
              this.searchItems
            );
          }}
        />
        <div>{itemsComponents}</div>
      </div>
    );
  }
}
