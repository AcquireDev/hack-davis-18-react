import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';

import { getApplications, markApplied, getNewApps } from '../actions/application';
import ApplicationRow from '../components/ApplicationRow';


class Dashboard extends Component {
  componentDidMount() {
    this.handleLoadApps();
  }

  handleLoadApps = () => {
    this.props.dispatch(getNewApps());
    this.props.dispatch(getApplications());
  };

  handleApplied = (id) => {
    this.props.dispatch(markApplied(id));
  };

  render() {
    const applications = this.props.applications;
    const applicationList = applications.map(application => (
      <ApplicationRow key={application.id} app={application} apply={this.handleApplied} />
    ));

    const newApplications = this.props.newApplications;
    const newApplicationList = newApplications.map(application => (
      <ApplicationRow key={application.id} app={application} apply={this.handleApplied} />
    ));

    const loading = this.props.appsLoading ? <p>loading...</p> : <span />;

    return (
      <div>
        <div
          id="wrapper"
          className="Header"
          style={{
            backgroundColor: '#5ede5c',
            height: '7vh',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              paddingLeft: '0px',
              display: 'flex',
              flexBasis: '1px',

            }}
          >
            <img src="logo.png" style={{ maxWidth: '18000%', objectFit: 'contain' }} />
          </div>
          <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

              }}
          >
            <p align="center"><DropdownButton
              bsStyle="default"
              title="Software Engineer"
              id="drop1"
            />
            </p>
            <p align="center"><DropdownButton
              bsStyle="default"
              title="Intern"
              id="drop2"
            />
            </p>
            <p align="center"><DropdownButton
              bsStyle="default"
              title="Bay Area, CA"
              id="drop3"
            />
            </p>
          </div>
          <div
            style={{
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center',

            }}
          >
            <p align="right"><font size="30">#</font></p>
          </div>

        <div style={{ margin: '2%' }}>
          <p>Dashboard</p>
          {loading}

          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <h2>
              New Applications <small>fresh finds!</small>
            </h2>
            <ListGroup>{newApplicationList}</ListGroup>
          </div>
          <br />

          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <ListGroup>{applicationList}</ListGroup>
          </div>
        </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  const applications = state.applications.applications;
  const newApplications = state.applications.newApplications;
  const appsLoading = state.applications.loadingApps;
  return {
    user,
    applications,
    appsLoading,
    newApplications,
  };
};

export default connect(mapStateToProps)(Dashboard);
