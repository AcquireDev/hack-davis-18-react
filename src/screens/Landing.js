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
import "../css/Landing.css";

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
      <div className="landing">
        <div align="center">
          <div className="landing-header">
            <img
              src="logo.png"
              className="white-logo"
              style={{ width: "60%", height: "60%" }}
            />
          </div>
          <div className="landing-body">
            <h1 className="heading">Your job search organized.</h1>
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
            <div className="landing-row-container">
              <div className="landing-row">
                <h3 className="heading">What is this?</h3>
                <p>
                  Acquire pulls in internship oppourtunities and adds them to
                  your personal job board! Get rid of your ghetto spreadsheet so
                  you can find new applications and organize your job search in
                  the same place.
                  <br />
                  <br />
                  This is just a <strong>proof of concept prototype</strong>! We
                  are working hard on getting you a full featured version, but
                  we could use your help! Let us know what you think of the
                  prototype, tell us what features you think we need, and tell
                  us about the struggles you've encountered in your job search
                  by emailing us at{" "}
                  <a href="mailto:hello@acquire-jobs.com">
                    hello@acquire-jobs.com
                  </a>!
                </p>
              </div>
              <div className="landing-row">
                <h3 className="heading">
                  How is this better than my spreadsheet?
                </h3>
                <p>
                  Imagine you didn't have to find the jobs that you put in your
                  spreadsheet... that would be nice! We have all the features
                  you could need including:
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
              </div>
              <div className="landing-row">
                <h3 className="heading">What if my job isn't on the list?</h3>
                <p>
                  If your opportunity isn't listed, simply add it and everyone
                  else on the platform gets access to it as well!
                </p>
              </div>
            </div>
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
