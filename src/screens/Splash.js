import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser, getUser } from '../actions/user';

class Splash extends Component {
  componentDidMount() {
    this.props.dispatch(loginUser('jacobbev@gmail.com', 'password'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.validated && this.props.user.validated == false) {
      this.props.dispatch(getUser());
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center', height: '100vh' }}>
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
