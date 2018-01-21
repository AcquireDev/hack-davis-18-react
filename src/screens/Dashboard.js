import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';

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
