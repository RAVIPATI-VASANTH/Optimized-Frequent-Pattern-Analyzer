import React, { Component } from "react";

export default class CreateItemPanel extends Component {
  constructor(props) {
    // let state = {};
    super(props);
    this.state = {
      categoryName: "",
      itemName: "",
      itemBrand: "",
      pricesList: [],
      availableCategoriesList: [],
    };
  }

  getCategories() {
    fetch(`/getCategories?userId=${this.props.currentUser}`)
      .then((response) => {
        response.json().then((response) => {
          this.setState({ availableCategoriesList: response.categoryList });
        });
      })
      .catch(() => alert("something went wrong"));
  }

  componentDidMount() {
    this.getCategories();
  }
  // while using above thing the sates is not fucking updating so used button as get categories

  render() {
    let categorySelect = (
      <select
        onChange={(event) =>
          this.setState({
            categoryName: event.target.value,
          })
        }
      >
        {this.state.availableCategoriesList.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
    return (
      <div>
        <label>Select Category</label>
        {categorySelect}
        <br />
        <button>Create Item</button>
      </div>
    );
  }
}
