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
      alert("Please Fill the input field from to create the collection");
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
              alert("Collection Created Succesfully");
              this.setState({ categoryName: "" });
            } else alert(response.text);
          })
        )
        .catch((err) => {
          console.log(err);
          alert("Some thing went Wrong");
        });
    }
    // this.props.updateSelectCollectionElement();
  }

  render() {
    return (
      <div>
        <input
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
