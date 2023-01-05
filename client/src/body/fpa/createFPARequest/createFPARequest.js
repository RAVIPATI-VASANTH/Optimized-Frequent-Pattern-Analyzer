import React, { Component } from "react";
import ConfirmRequest from "./confirmRequest.js";

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
      date: "",
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

  updateDate(date) {
    this.setState({
      date: date,
    });
  }

  render() {
    let style = { cursor: "pointer" };
    let activePanel;
    if (this.state.activeType.category || this.state.activeType.brand) {
      if (this.state.activeType.category) {
        activePanel = (
          <>
            {this.state.activeType.name}
            <button onClick={() => this.cancelActiveType()}>Cancel</button>
            <button onClick={() => this.addCategory()}>
              Add Complete Category
            </button>
            {this.state.activeComponentItemsList.map((item, index) => (
              <div
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
      }
      if (this.state.activeType.brand) {
        activePanel = (
          <>
            {this.state.activeType.name}
            <button onClick={() => this.cancelActiveType()}>Cancel</button>
            <button onClick={() => this.addBrand()}>Add Complete Brand</button>
            {this.state.activeComponentItemsList.map((item, index) => (
              <div
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
          } else if (key === "brands") {
            selectedItemsElements.push(
              <>
                <p>
                  {key}:{element}
                </p>
                <button
                  onClick={() => {
                    this.removeBrand(index);
                  }}
                >
                  Remove
                </button>
              </>
            );
          } else {
            selectedItemsElements.push(
              <>
                <p>
                  {key}:{element}
                </p>
                <button
                  onClick={() => {
                    this.removeCategory(index);
                  }}
                >
                  Remove
                </button>
              </>
            );
          }
        });
      }
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
        <label>Time Line</label>
        <input
          type="date"
          onChange={(event) => {
            this.updateDate(event.target.value);
          }}
        />
        <div>
          {activePanel}
          <p>Selected Items</p>
          {selectedItemsElements.map((element) => element)}
          <ConfirmRequest
            selectedList={this.state.selectedList}
            date={this.state.date}
            currentUser={this.props.currentUser}
            requestConfirmed={this.props.requestConfirmed}
          />
        </div>
      </>
    );
  }
}
