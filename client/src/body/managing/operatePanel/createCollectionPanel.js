import React, { Component } from "react";

export default class CreateCollectionPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionName: "",
    };
  }

  createCollection() {
    if (this.state.collectionName === "")
      alert("Please Fill the input field from to create the collection");
    else {
      fetch("/createCollection", { method: "POST" })
        .then((response) => response.json())
        .then((response) => {
          if (response.message) alert("Collection Created Succesfully");
          else alert("Some thing went Wrong");
        });
    }
    this.props.updateSelectCollectionElement();
  }

  render() {
    return (
      <div>
        <input
          onChange={(event) => {
            this.setState({ collectionName: event.target.value });
          }}
        />
        <p>{this.state.collectionName}</p>
        <button onClick={this.createCollection.bind(this)}>
          Create Collection
        </button>
      </div>
    );
  }
}
