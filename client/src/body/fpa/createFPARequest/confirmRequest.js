import React, { Component } from "react";
import "./../../../css/confirmRequest.css";

export default class ConfirmRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestName: "",
      status: "Draft",
      minSupport: 0,
      minConfidence: 0,
      discountStatus: false,
    };
  }

  confirmRequest() {
    if (
      this.props.selectedList.categories.length ||
      this.props.selectedList.brands.length ||
      this.props.selectedList.items.length
    ) {
      if (
        this.state.requestName &&
        this.state.minConfidence &&
        this.state.minSupport
      ) {
        let request = {
          ...this.state,
          selectedList: this.props.selectedList,
          date: this.props.date,
        };
        console.log(JSON.stringify(request));
        fetch(
          `http://127.0.0.1:5000/confirmRequest?userId=${
            this.props.currentUser
          }&request=${JSON.stringify(request)}`,
          {
            method: "POST",
          }
        )
          .then((response) =>
            response.json().then((response) => {
              if (response.message) {
                this.props.requestConfirmed();
              } else {
                alert(response.text);
              }
            })
          )
          .catch((err) => {
            console.log(err);
            alert("Something went Wrong");
          });
      } else {
        alert("Please Fill the required Fields");
      }
    } else {
      alert("Please add the categories or brands or items");
    }
  }

  render() {
    return (
      <div className="confirmRequest">
        <label>Request Name</label>
        <input
          className="confirmRequestInput"
          type="text"
          value={this.state.requestName}
          onChange={(event) =>
            this.setState({ requestName: event.target.value })
          }
        />
        <label>Minimum Support(%)</label>
        <input
          className="confirmRequestInput"
          type="text"
          value={this.state.minSupport}
          onChange={(event) =>
            this.setState({ minSupport: Number(event.target.value) })
          }
        />
        <label>Minimum Confidence(%)</label>
        <input
          className="confirmRequestInput"
          type="text"
          value={this.state.minConfidence}
          onChange={(event) =>
            this.setState({ minConfidence: Number(event.target.value) })
          }
        />
        <label>Status</label>
        <select
          className="createRequestSelect"
          defaultValue="Draft"
          onChange={(event) => {
            this.setState({
              status: event.target.value,
            });
          }}
        >
          <option value="Draft">Draft</option>
          <option value="Start Now">Start Now</option>
        </select>
        <div className="checkBoxDiv">
          <label>Consider Disocunts</label>
          <input
            className="confirmRequestCheckBox"
            type="checkbox"
            value={this.state.discountStatus}
            onClick={() => {
              this.setState({
                discountStatus: !this.state.discountStatus,
              });
            }}
          />
        </div>
        <button
          className="confirmRequestButton"
          onClick={() => this.confirmRequest()}
        >
          Confirm Request
        </button>
      </div>
    );
  }
}
