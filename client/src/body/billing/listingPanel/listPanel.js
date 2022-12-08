import React, { Component } from "react";

export default class ListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listedItems: [],
    };
  }

  static getDerivedStateFromProps(nextprops, prevstate) {
    let l = [];
    nextprops.listedItems.forEach((item) => {
      let obj = { ...item, quantity: 0, packType: 0 };
      l.push(obj);
    });
    return { listedItems: l };
  }

  render() {
    console.log(this.state.listedItems);
    let itemsComponents = this.state.listedItems.map((item) => (
      <div>
        <p>{item.itemName}</p>
      </div>
    ));
    return (
      <div>
        <div>Listed Items</div>
        {itemsComponents}
      </div>
    );
  }
}
