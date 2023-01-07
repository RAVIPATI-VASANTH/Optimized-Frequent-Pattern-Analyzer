import React, { Component } from "react";
import "./../../../css/searchpanel.css";

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
      `http://127.0.0.1:5000/searchItem?searchItem=${this.state.searchString}&userId=${this.props.currentUser}`,
      {
        method: "POST",
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
      <div
        style={style}
        className="item"
        onClick={() => this.selectItem(index)}
      >
        <center>
          <p>{element.itemName}</p>
        </center>
      </div>
    ));
    if (this.state.itemsList.length === 0) {
      itemsComponents = <p>No Results</p>;
    }
    return (
      <div className="search">
        <div className="searchElement">
          <label class="label" for="searchItem">
            Search Items
          </label>
          <input
            id="searchItem"
            className="searchItem"
            onChange={(event) => {
              this.setState(
                { searchString: event.target.value },
                this.searchItems
              );
            }}
          />
        </div>
        <div className="listItems">{itemsComponents}</div>
      </div>
    );
  }
}
