import React, { Component } from "react";
import "./../../../../css/create.css";

export default class CreateCategoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
    };
  }

  createCollection() {
    if (!this.state.categoryName.trim())
      alert("Please Fill the input field from to create the category");
    else {
      fetch(
        `http://127.0.0.1:5000/createCategory?categoryName=${this.state.categoryName.trim()}&userId=${
          this.props.currentUser
        }`,
        {
          method: "POST",
        }
      )
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              alert("Category Created Succesfully");
              this.setState({ categoryName: "" });
              this.props.updateCategoriesList();
            } else alert(response.text);
          })
        )
        .catch((err) => {
          console.log(err);
          alert("Some thing went Wrong");
        });
    }
  }

  render() {
    return (
      <div className="div">
        <input
          className="createInput"
          value={this.state.categoryName}
          onChange={(event) => {
            this.setState({ categoryName: event.target.value.trim() });
          }}
        />
        <br />
        <button
          className="createButton"
          onClick={this.createCollection.bind(this)}
        >
          Create Category
        </button>
      </div>
    );
  }
}
