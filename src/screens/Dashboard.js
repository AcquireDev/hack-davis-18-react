import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, ListGroup, DropdownButton, MenuItem, Table } from 'react-bootstrap';

import { getUser } from '../actions/user';
import { getApplications, markApplied, getNewApps } from '../actions/application';
import ApplicationRow from '../components/ApplicationRow';

class Dashboard extends Component {
  componentDidMount() {
    this.handleLoadApps();
  }

  handleLoadApps = () => {
    this.props.dispatch(getNewApps());
    this.props.dispatch(getApplications());
    this.props.dispatch(getUser());
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
            <div align="center">
              <DropdownButton bsStyle="default" key={1} title="Software Engineer" id="drop1">
                <MenuItem key={1} active>
                  Software Engineer
                </MenuItem>
              </DropdownButton>
            </div>
            <div align="center">
              <DropdownButton bsStyle="default" key={1} title="Intern" id="drop2">
                <MenuItem key={1} active>
                  Intern
                </MenuItem>
              </DropdownButton>
            </div>
            <div align="center">
              <DropdownButton bsStyle="default" key={1} title="Bay Area, CA" id="drop3">
                <MenuItem key={1} active>
                  Bay Area, CA
                </MenuItem>
              </DropdownButton>
            </div>
          </div>
          <div
            style={{
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <p align="right" style={{ fontWeight: 'lighter', fontSize: '150%' }}>
              {this.props.user.completed_apps} / {this.props.user.total_apps}
            </p>
          </div>
        </div>
        <div style={{ margin: '2%' }}>
          {loading}

          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <h2 style={{ color: '#5ede5c' }}>
              New Applications <small>fresh finds!</small>
            </h2>
            <Table
              striped
              bordered
              hover
              style={{
                tableLayout: 'fixed',
              }}
            >
              <thead>
                <tr>
                  <td>Company</td>
                  <td>URL</td>
                  <td>Position</td>
                  <td>Applied?</td>
                </tr>
              </thead>
              <tbody>{newApplicationList}</tbody>
            </Table>
          </div>
          <br />

          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <h2 style={{ color: '#5ede5c' }}>
              The Rest <small>not so fresh finds!</small>
            </h2>
            <Table
              striped
              bordered
              hover
              style={{
                tableLayout: 'fixed',
              }}
            >
              <thead>
                <tr>
                  <td>Company</td>
                  <td>URL</td>
                  <td>Position</td>
                  <td>Applied?</td>
                </tr>
              </thead>
              <tbody>{applicationList}</tbody>
            </Table>
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
