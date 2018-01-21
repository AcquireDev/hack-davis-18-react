import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, Label } from 'react-bootstrap';
import { loginUser } from '../actions/user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(loginUser(this.state.email, this.state.password));
  };

  render() {
    let invalidLogin = null;
    if (this.props.user.loginError) {
      invalidLogin = <p>The username or password you have entered is invalid.</p>;
    }

    return (
      <div
        className="Login"
        style={{
          backgroundColor: '#f26866',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <div align="center">
            {' '}
            <img src="logo.png" style={{ width: '60%', height: '60%' }} />{' '}
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <FormControl
                autoFocus
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                style={{ width: '32%', margin: 'auto' }}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              {/* <ControlLabel /> */}
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                style={{ width: '32%', margin: 'auto' }}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              type="submit"
              style={{
                width: '32%',
                color: 'white',
                backgroundColor: '#5ede5c',
                margin: 'auto',
              }}
            >
              Login
            </Button>
          </form>
          {invalidLogin}
        </div>
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

export default connect(mapStateToProps)(Login);
