import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import ReactGA from "react-ga";

import { createUser } from "../actions/user";
import "../css/default.css";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    ReactGA.initialize("UA-116571532-1");
    ReactGA.pageview("/signup", "Signup");
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleLogin = () => {
    this.props.dispatch(push("/login"));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(createUser(this.state.email, this.state.password));
  };

  render() {
    let invalidLogin = null;
    if (this.props.user.signupError) {
      invalidLogin = (
        <p style={{ textAlign: "center", color: "white", marginTop: "25px" }}>
          {this.props.user.signupError}
        </p>
      );
    }

    return (
      <div className="color-wrapper">
        <div>
          <div align="center">
            <img
              src="logo.png"
              className="white-logo"
              style={{ width: "40%", height: "40%", paddingBottom: "25px" }}
              alt="Acquire"
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <FormControl
                autoFocus
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                style={{ width: "32%", margin: "auto" }}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              {/* <ControlLabel /> */}
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                style={{ width: "32%", margin: "auto" }}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              type="submit"
              style={{
                width: "32%",
                color: "white",
                backgroundColor: "#4ECDC4",
                borderColor: "#4ECDC4",
                margin: "auto"
              }}
            >
              Signup
            </Button>
          </form>
          {invalidLogin}
          <br />
          <Button
            block
            bsSize="large"
            bsStyle="warning"
            type="submit"
            onClick={this.handleLogin}
            style={{
              width: "40%",
              margin: "auto"
            }}
          >
            I already have an account.
          </Button>
        </div>
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

export default connect(mapStateToProps)(Signup);
