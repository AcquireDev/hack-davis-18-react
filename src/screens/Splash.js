import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { loginUser, getUser } from "../actions/user";

class Splash extends Component {
  componentDidMount() {
    this.props.dispatch(push("./Login"));
  }

  render() {
    return (
      <div style={{ textAlign: "center", height: "100vh" }}>
        <p>Test</p>
        <p>
          <strong>{this.props.user.email}</strong>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user;

  return {
    user
  };
};

export default connect(mapStateToProps)(Splash);
