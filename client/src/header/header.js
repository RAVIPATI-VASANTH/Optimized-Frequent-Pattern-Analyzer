import React, { Component } from "react";
import "./../css/header.css";

class Header extends Component {
  render() {
    let style = { color: "white" };
    return (
      <div class="logo">
        OFPA : <span style={style}>Optimized Frequent Pattern Analyser</span>
      </div>
    );
  }
}

export default Header;
