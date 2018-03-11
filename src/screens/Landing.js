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

import { loginUser, getUser, lookupJWT } from "../actions/user";

class Landing extends Component {
  componentDidMount() {
    this.props.dispatch(lookupJWT());
  }

  handleLogin = () => {
    this.props.dispatch(push("/login"));
  };

  handleSignup = () => {
    this.props.dispatch(push("/signup"));
  };

  render() {
    return (
      <div
        className="Login"
        style={{
          backgroundColor: "#f26866",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div align="center" style={{ color: "white" }}>
          <img src="logo.png" style={{ width: "60%", height: "60%" }} />
          <hr style={{ marginTop: 0 }} />
          <br />
          <h1>Your job search organized.</h1>
          <br />
          <Button
            bsSize="large"
            bsStyle="success"
            onClick={this.handleSignup}
            style={{ marginRight: "25px" }}
          >
            Signup
          </Button>
          <Button onClick={this.handleLogin} bsStyle="primary" bsSize="large">
            Login
          </Button>
          <div style={{ marginTop: "25px", textAlign: "left", width: "75%" }}>
            <h3>What is this?</h3>
            <p>
              Acquire pulls in internship oppourtunities and adds them to your
              personal job board! Get rid of your ghetto spreadsheet so you can
              find new applications and organize your job search in the same
              place.
              <br />
              This is just a proof of concept prototype! We are working hard on
              getting you a full featured version but we could use your help!
              Let us know what you think of the prototype, tell us what features
              you think we need, and tell us about the struggles you've
              encountered in your job search by emailing us at{" "}
              <a
                style={{ color: "white", textDecoration: "underline" }}
                href="mailto:jacob@acquire-jobs.com"
              >
                jacob@acquire-jobs.com
              </a>!
            </p>
            <h3>How is this better than my spreadsheet?</h3>
            <p>
              Imagine you didn't have to find the jobs that you put in your
              spreadsheet... that would be nice! We have all he features you
              could need including:
              <ul>
                <li>
                  Organizing into categories (applied/need to
                  apply/interviewing/rejected/etc...)
                </li>
                <li>
                  Search <small>(coming soon)</small>
                </li>
                <li>
                  Adding notes <small>(coming soon)</small>
                </li>
              </ul>
            </p>
            <h3>What if my job isn't on the list?</h3>
            <p>
              If your oppourtunity isn't listed simply add it and everyone else
              on the platform gets access to it as well!
            </p>
          </div>
        </div>
        <div style={{ minHeight: "50px" }} />
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

export default connect(mapStateToProps)(Landing);
