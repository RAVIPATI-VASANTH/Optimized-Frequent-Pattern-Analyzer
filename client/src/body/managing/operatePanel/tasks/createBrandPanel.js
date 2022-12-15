import React, { Component } from "react";

export default class CreateBrandpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandName: "",
    };
  }

  createBrand() {
    if (!this.state.brandName)
      alert("Please Fill the input field from to create the brand");
    else {
      fetch(
        `/createBrand?brandName=${this.state.brandName}&userId=${this.props.currentUser}`,
        {
          method: "POST",
        }
      )
        .then((response) =>
          response.json().then((response) => {
            if (response.message) {
              alert("Brand Created Succesfully");
              this.setState({ brandName: "" }, () =>
                this.props.updateSelectBrandElement()
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
          value={this.state.brandName}
          onChange={(event) => {
            this.setState({ brandName: event.target.value });
          }}
        />
        <button onClick={this.createBrand.bind(this)}>Create Brand</button>
      </div>
    );
  }
}
