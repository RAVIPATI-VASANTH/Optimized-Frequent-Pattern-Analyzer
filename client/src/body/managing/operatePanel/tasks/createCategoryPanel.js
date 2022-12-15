import React, { Component } from "react";

export default class CreateCategoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
    };
  }

  createCollection() {
    if (!this.state.categoryName)
      alert("Please Fill the input field from to create the category");
    else {
      fetch(
        `/createCategory?categoryName=${this.state.categoryName}&userId=${this.props.currentUser}`,
        {
          method: "POST",
        }
      )
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              alert("Category Created Succesfully");
              this.setState({ categoryName: "" }, () =>
                this.props.updateSelectCategoryElement()
              );
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
      <div>
        <input
          value={this.state.categoryName}
          onChange={(event) => {
            this.setState({ categoryName: event.target.value });
          }}
        />
        <button onClick={this.createCollection.bind(this)}>
          Create Category
        </button>
      </div>
    );
  }
}
