import React, { Component } from "react";
import { connect } from "react-redux";

class Splash extends Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ textAlign: "center", height: "100vh" }}>
        <p>Test</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Splash);
