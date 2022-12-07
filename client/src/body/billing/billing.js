import React, { Component } from "react";
import SearchPanel from "./searchPanel/searchpanel";
import ListPanel from "./listingPanel/listPanel";

export default class Billing extends Component {
  render() {
    return (
      <>
        <SearchPanel></SearchPanel>
        <ListPanel></ListPanel>
      </>
    );
  }
}
