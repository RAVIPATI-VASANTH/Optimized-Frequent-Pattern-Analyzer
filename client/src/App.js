import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import Header from "./header/header";
import Body from "./body/body";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <Body></Body>
      </>
    );
  }
}

export default App;
