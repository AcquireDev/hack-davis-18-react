import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Label
} from "react-bootstrap";

import { getApplicationsNoRedirect } from "../actions/application";
import "../css/default.css";

// import {  } from "../actions/user";

class AccountSetup extends Component {
  componentDidMount() {
    this.props.dispatch(getApplicationsNoRedirect());
    this.timeoutHandle = setTimeout(() => {
      console.log("redirecting to dashboard");
      this.props.dispatch(push("/dashboard"));
    }, 3000);
  }

  render() {
    return (
      <div className="light-color-wrapper">
        <div align="center">
          <img
            src="logo.png"
            className="white-logo"
            style={{ width: "40%", height: "40%", paddingBottom: "25px" }}
          />
          <h3 style={{ textAlign: "center", color: "white" }}>
            Hold tight! We're syncing all the job listings with your account :)
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user;
  const loadError = state.applications.error;

  return {
    user,
    loadError
  };
};

export default connect(mapStateToProps)(AccountSetup);
