import React, { Component } from "react";
// import ReactDOM from "react-dom/client";
import Header from "./header/header";
import Body from "./body/body";
// import { AuthenticationProvider } from "./contexts/authenticationContext";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        {/* <AuthenticationProvider value=""> */}
        <Header></Header>
        <Body></Body>
        {/* </AuthenticationProvider> */}
      </>
    );
  }
}

export default App;
