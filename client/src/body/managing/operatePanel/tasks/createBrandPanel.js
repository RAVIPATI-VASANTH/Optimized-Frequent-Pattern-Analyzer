import React, { Component } from "react";
import "./../../../../css/create.css";

export default class CreateBrandpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandName: "",
    };
  }

  createBrand() {
    if (!this.state.brandName.trim())
      alert("Please Fill the input field from to create the brand");
    else {
      fetch(
        `http://127.0.0.1:5000/createBrand?brandName=${this.state.brandName.trim()}&userId=${
          this.props.currentUser
        }`,
        {
          method: "POST",
        }
      )
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              alert("Brand Created Succesfully");
              this.setState({ brandName: "" });
              this.props.updatebrandsList();
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
          value={this.state.brandName}
          onChange={(event) => {
            this.setState({ brandName: event.target.value.trim() });
          }}
        />
        <br />
        <button className="createButton" onClick={this.createBrand.bind(this)}>
          Create Brand
        </button>
      </div>
    );
  }
}
