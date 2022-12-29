import React, { Component } from "react";

export default class CreateFPARequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: [],
      itemsList: [],
      brandsList: [],
      categoriesList: [],
    };
  }

  searchItems(searchString) {
    fetch(
      `/searchItem?searchItem=${searchString}&userId=${this.props.currentUser}`,
      {
        method: "POST",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.responseStatus) {
            // console.log(response.listObjects);
            this.setState({ itemsList: response.listObjects }, () => {
              let l = [];
              this.state.itemsList.forEach((item, index) => {
                l.push(<div>{item.itemName}</div>);
              });
              this.setState({ displayList: l });
            });
          } else {
            alert("Some Thing Went Wrong");
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  searchBrands(searchString) {
    fetch(
      `/searchBrands?searchBrand=${searchString}&userId=${this.props.currentUser}`,
      {
        method: "POST",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.responseStatus) {
            this.setState(
              {
                brandsList: response.brandObjects,
              },
              () => {
                let l = [];
                this.state.brandsList.forEach((brand, index) => {
                  l.push(<div>{brand}</div>);
                });
                this.setState({ displayList: l });
              }
            );
          } else {
            alert(response.text);
          }
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  searchCategories(searchString) {}

  render() {
    return (
      <>
        <label>Category</label>
        <input
          onChange={(event) => {
            this.searchCategories(event.target.value);
          }}
        />
        <br />
        <label>Brands</label>
        <input
          onChange={(event) => {
            this.searchBrands(event.target.value);
          }}
        />
        <br />
        <label>Items</label>
        <input
          onChange={(event) => {
            this.searchItems(event.target.value);
          }}
        />
        <br />
        {this.state.displayList.map((item) => item)}
        <div>Selected Items</div>
      </>
    );
  }
}
