import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, FormGroup, FormControl, ControlLabel, Label } from 'react-bootstrap';


import { loginUser, getUser, lookupJWT } from "../actions/user";

class Splash extends Component {
  componentDidMount() {
    this.props.dispatch(lookupJWT());
  }

  render() {
    return (
      <div
        className="Login"
        style={{
 backgroundColor: '#f26866', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
}}
      >
        <div align="center"> <img src="logo.png" style={{ width: '60%', height: '60%' }} /> </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;

  return {
    user,
  };
};

export default connect(mapStateToProps)(Splash);
