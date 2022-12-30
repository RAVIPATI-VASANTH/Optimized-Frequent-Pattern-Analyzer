import React, { Component } from "react";

export default class CreateFPARequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: [],
      itemsList: [],
      brandsList: [],
      categoriesList: [],
      selectedList: { categories: [], brands: [], items: [] },
      activeItem: "",
    };
  }

  addItem(index) {
    let l = this.state.selectedList.items;
    let signal = true;
    for (var i = 0; i < l.length; i++) {
      if (l[i].itemName === this.state.itemsList[index].itemName) {
        signal = false;
        break;
      }
    }
    if (signal) {
      l.push(this.state.itemsList[index]);
      let obj = {
        categories: this.state.selectedList.categories,
        brands: this.state.selectedList.brands,
        items: l,
      };
      this.setState({ selectedList: obj });
    }
  }

  removeItem(index) {
    let l = this.state.selectedList.items;
    l.splice(index, 1);
    let obj = {
      categories: this.state.selectedList.categories,
      brands: this.state.selectedList.brands,
      items: l,
    };
    this.setState({ selectedList: obj });
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
            this.setState({ itemsList: response.listObjects }, () => {
              let l = [];
              let style = { cursor: "pointer" };
              this.state.itemsList.forEach((item, index) => {
                l.push(
                  <div
                    style={style}
                    onClick={() => {
                      this.addItem(index);
                    }}
                  >
                    {item.itemName}
                  </div>
                );
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

  searchCategories(searchString) {
    fetch(
      `/searchCategories?searchCategory=${searchString}&userId=${this.props.currentUser}`,
      {
        method: "POST",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.responseStatus) {
            this.setState(
              {
                categoriesList: response.categoryObjects,
              },
              () => {
                let l = [];
                this.state.categoriesList.forEach((category, index) => {
                  l.push(<div>{category}</div>);
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

  render() {
    let activePanel;
    if (this.state.activeItem) {
    } else {
      activePanel = this.state.displayList.map((item) => item);
    }

    let selectedItemsElements = [];
    for (const [key, value] of Object.entries(this.state.selectedList)) {
      value.forEach((element, index) => {
        if (key === "items") {
          selectedItemsElements.push(
            <>
              <p>
                {key}:{element.itemName}
              </p>
              <button
                onClick={() => {
                  this.removeItem(index);
                }}
              >
                Remove
              </button>
            </>
          );
        }
      });
    }

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

        <div>
          {activePanel}
          <p>Selected Items</p>
          {selectedItemsElements.map((element) => element)}
        </div>
      </>
    );
  }
}
