import React, { Component } from "react";
import ConfirmRequest from "./confirmRequest.js";
import "./../../../css/createFPARequest.css";

export default class CreateFPARequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: [],
      itemsList: [],
      brandsList: [],
      categoriesList: [],
      selectedList: { categories: [], brands: [], items: [], date: "" },
      activeType: { category: false, brand: false },
      activeComponentItemsList: [],
      date: { from: "", to: "" },
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

  addBrandItem(index) {
    let l = this.state.selectedList.items;
    let signal = true;
    for (var i = 0; i < l.length; i++) {
      if (
        l[i].itemName === this.state.activeComponentItemsList[index].itemName
      ) {
        signal = false;
        break;
      }
    }
    if (signal) {
      l.push(this.state.activeComponentItemsList[index]);
      let obj = {
        categories: this.state.selectedList.categories,
        brands: this.state.selectedList.brands,
        items: l,
      };
      this.setState({ selectedList: obj });
    }
  }

  addCategoryItem(index) {
    let l = this.state.selectedList.items;
    let signal = true;
    for (var i = 0; i < l.length; i++) {
      if (
        l[i].itemName === this.state.activeComponentItemsList[index].itemName
      ) {
        signal = false;
        break;
      }
    }
    if (signal) {
      l.push(this.state.activeComponentItemsList[index]);
      let obj = {
        categories: this.state.selectedList.categories,
        brands: this.state.selectedList.brands,
        items: l,
      };
      this.setState({ selectedList: obj });
    }
  }

  addBrand() {
    let signal = true;
    for (var i = 0; i < this.state.selectedList.brands.length; i++) {
      if (this.state.activeType.name === this.state.selectedList.brands[i]) {
        signal = false;
        break;
      }
    }
    if (signal) {
      let l = this.state.selectedList.brands;
      l.push(this.state.activeType.name);
      let obj = {
        categories: this.state.selectedList.categories,
        brands: l,
        items: this.state.selectedList.items,
      };
      this.setState({
        selectedList: obj,
        activeType: { category: false, brand: false },
        activeComponentItemsList: [],
      });
    }
  }

  addCategory() {
    let signal = true;
    for (var i = 0; i < this.state.selectedList.categories.length; i++) {
      if (
        this.state.activeType.name === this.state.selectedList.categories[i]
      ) {
        signal = false;
        break;
      }
    }
    if (signal) {
      let l = this.state.selectedList.categories;
      l.push(this.state.activeType.name);
      let obj = {
        categories: l,
        brands: this.state.selectedList.brands,
        items: this.state.selectedList.items,
      };
      this.setState({
        selectedList: obj,
        activeType: { category: false, brand: false },
        activeComponentItemsList: [],
      });
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

  removeBrand(index) {
    let l = this.state.selectedList.brands;
    l.splice(index, 1);
    let obj = {
      categories: this.state.selectedList.categories,
      brands: l,
      items: this.state.selectedList.items,
    };
    this.setState({ selectedList: obj });
  }

  removeCategory(index) {
    let l = this.state.selectedList.categories;
    l.splice(index, 1);
    let obj = {
      categories: l,
      brands: this.state.selectedList.brands,
      items: this.state.selectedList.items,
    };
    this.setState({ selectedList: obj });
  }

  searchItems(searchString) {
    fetch(
      `http://127.0.0.1:5000/searchItem?searchItem=${searchString}&userId=${this.props.currentUser}`,
      {
        method: "POST",
      }
    )
      .then((response) =>
        response.json().then((response) => {
          if (response.responseStatus) {
            this.setState({ itemsList: response.listObjects }, () => {
              let l = [];
              this.state.itemsList.forEach((item, index) => {
                l.push(
                  <div
                    className="viewDivItem"
                    onClick={() => {
                      this.addItem(index);
                    }}
                  >
                    <>{item.itemName}</>
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

  selectBrand(index) {
    this.setState(
      {
        activeType: {
          category: false,
          brand: false,
          name: this.state.brandsList[index],
        },
      },
      () => {
        fetch(
          `http://127.0.0.1:5000/getBrandItems?userId=${this.props.currentUser}&brandName=${this.state.activeType.name}`,
          { method: "POST" }
        )
          .then((response) =>
            response.json().then((response) => {
              this.setState({
                activeType: {
                  category: false,
                  brand: true,
                  name: this.state.brandsList[index],
                },
                activeComponentItemsList: response.brandItemsList,
              });
            })
          )
          .catch((err) => {
            console.log(err);
            alert("Something Went Wrong");
          });
      }
    );
  }

  searchBrands(searchString) {
    fetch(
      `http://127.0.0.1:5000/searchBrands?searchBrand=${searchString}&userId=${this.props.currentUser}`,
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
                let style = { cursor: "pointer" };
                this.state.brandsList.forEach((brand, index) => {
                  l.push(
                    <div
                      className="viewDivItem"
                      style={style}
                      onClick={() => {
                        this.selectBrand(index);
                      }}
                    >
                      {brand}
                    </div>
                  );
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

  selectCategory(index) {
    this.setState(
      {
        activeType: {
          category: false,
          brand: false,
          name: this.state.categoriesList[index],
        },
      },
      () => {
        fetch(
          `http://127.0.0.1:5000/getCategoryItems?userId=${this.props.currentUser}&categoryName=${this.state.activeType.name}`,
          { method: "POST" }
        )
          .then((response) =>
            response.json().then((response) => {
              this.setState({
                activeType: {
                  category: true,
                  brand: false,
                  name: this.state.categoriesList[index],
                },
                activeComponentItemsList: response.categoryItemsList,
              });
            })
          )
          .catch((err) => {
            console.log(err);
            alert("Something Went Wrong");
          });
      }
    );
  }

  searchCategories(searchString) {
    fetch(
      `http://127.0.0.1:5000/searchCategories?searchCategory=${searchString}&userId=${this.props.currentUser}`,
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
                let style = { cursor: "pointer" };
                let l = [];
                this.state.categoriesList.forEach((category, index) => {
                  l.push(
                    <div
                      className="viewDivItem"
                      style={style}
                      onClick={() => {
                        this.selectCategory(index);
                      }}
                    >
                      {category}
                    </div>
                  );
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

  cancelActiveType() {
    this.setState({
      activeType: { category: false, brand: false, name: "" },
      activeComponentItemsList: [],
    });
  }

  updateFromDate(date) {
    let obj = { from: date, to: this.state.date.to };
    this.setState({
      date: obj,
    });
  }

  updateToDate(date) {
    let obj = { from: this.state.date.from, to: date };
    this.setState({
      date: obj,
    });
    //need to validate that to date is always greater than or equal to from
  }

  render() {
    let style = { cursor: "pointer" };
    let activePanel;
    let viewInfopanel = <></>;
    if (this.state.activeType.category || this.state.activeType.brand) {
      if (this.state.activeType.category) {
        viewInfopanel = (
          <div className="viewInfo">
            <p className="typeName">{this.state.activeType.name}</p>
            <button
              className="typebutton"
              onClick={() => this.cancelActiveType()}
            >
              Cancel
            </button>
            <button className="typebutton" onClick={() => this.addCategory()}>
              Add Complete Category
            </button>
          </div>
        );
        activePanel = (
          <>
            {this.state.activeComponentItemsList.map((item, index) => (
              <div
                className="viewDivItem"
                style={style}
                onClick={() => {
                  this.addCategoryItem(index);
                }}
              >
                {item.itemName}
              </div>
            ))}
          </>
        );
      } else if (this.state.activeType.brand) {
        viewInfopanel = (
          <div className="viewInfo">
            {this.state.activeType.name}
            <button onClick={() => this.cancelActiveType()}>Cancel</button>
            <button onClick={() => this.addBrand()}>Add Complete Brand</button>
          </div>
        );
        activePanel = (
          <>
            {this.state.activeComponentItemsList.map((item, index) => (
              <div
                className="viewDivItem"
                style={style}
                onClick={() => {
                  this.addBrandItem(index);
                }}
              >
                {item.itemName}
              </div>
            ))}
          </>
        );
      }
    } else {
      activePanel = this.state.displayList.map((item) => item);
    }

    let selectedItemsElements = [];
    for (const [key, value] of Object.entries(this.state.selectedList)) {
      if (key !== "date") {
        value.forEach((element, index) => {
          if (key === "items") {
            selectedItemsElements.push(
              <div className="selectedDivItem">
                <p>{element.itemName}</p>
                <button
                  onClick={() => {
                    this.removeItem(index);
                  }}
                >
                  x
                </button>
              </div>
            );
          } else if (key === "brands") {
            selectedItemsElements.push(
              <div className="selectedDivItem">
                <p>{element}</p>
                <button
                  onClick={() => {
                    this.removeBrand(index);
                  }}
                >
                  x
                </button>
              </div>
            );
          } else {
            selectedItemsElements.push(
              <div className="selectedDivItem">
                <p>{element}</p>
                <button
                  onClick={() => {
                    this.removeCategory(index);
                  }}
                >
                  x
                </button>
              </div>
            );
          }
        });
      }
    }
    if (selectedItemsElements.length === 0) {
      selectedItemsElements.push(<p>No Items are selected yet</p>);
    }

    return (
      <div className="createFPARequest">
        <div className="createTop">
          <div className="listingPanel">
            <div className="selectionDiv">
              <div className="selectionInputGrid">
                <label>Category</label>
                <input
                  className="selectionInput"
                  onChange={(event) => {
                    this.searchCategories(event.target.value);
                  }}
                />
                <label>Brand</label>
                <input
                  className="selectionInput"
                  onChange={(event) => {
                    this.searchBrands(event.target.value);
                  }}
                />
                <label>Item</label>
                <input
                  className="selectionInput"
                  onChange={(event) => {
                    this.searchItems(event.target.value);
                  }}
                />
              </div>
              <div className="selectionDateGrid">
                <label>From</label>
                <input
                  className="selectionDate"
                  type="date"
                  onChange={(event) => {
                    this.updateFromDate(event.target.value);
                  }}
                />
                <label>To</label>
                <input
                  className="selectionDate"
                  type="date"
                  onChange={(event) => {
                    this.updateToDate(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="viewDiv">
              {viewInfopanel}
              <div className="viewDivList">{activePanel}</div>
            </div>
          </div>
          <ConfirmRequest
            selectedList={this.state.selectedList}
            date={this.state.date}
            currentUser={this.props.currentUser}
            requestConfirmed={this.props.requestConfirmed}
          />
        </div>
        <div className="selectedItemDiv">
          <div>
            <p className="selectedItemsLabel">Selected Items</p>
          </div>
          <div className="selectedListDiv">
            {selectedItemsElements.map((element) => element)}
          </div>
        </div>
      </div>
    );
  }
}
