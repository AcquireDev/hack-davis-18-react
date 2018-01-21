import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import {
  getApplications,
  markApplied,
  getNewApps
} from "../actions/application";
import ApplicationRow from "../components/ApplicationRow";

class Dashboard extends Component {
  componentDidMount() {
    this.handleLoadApps();
  }

  handleLoadApps = () => {
    this.props.dispatch(getNewApps());
    this.props.dispatch(getApplications());
  };

  handleApplied = id => {
    this.props.dispatch(markApplied(id));
  };

  render() {
    const applications = this.props.applications;
    const applicationList = applications.map(application => (
      <ApplicationRow
        key={application.id}
        app={application}
        apply={this.handleApplied}
      />
    ));

    const newApplications = this.props.newApplications;
    const newApplicationList = newApplications.map(application => (
      <ApplicationRow
        key={application.id}
        app={application}
        apply={this.handleApplied}
      />
    ));

    const loading = this.props.appsLoading ? <p>loading...</p> : <span />;

    return (
      <div>
        <p>Dashboard</p>
        <Button onClick={this.handleLoadApps}>Load Applications</Button>
        {loading}
        <ul>{newApplicationList}</ul>
        <ul>{applicationList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user;
  const applications = state.applications.applications;
  const newApplications = state.applications.newApplications;
  const appsLoading = state.applications.loadingApps;
  return {
    user,
    applications,
    appsLoading,
    newApplications
  };
};

export default connect(mapStateToProps)(Dashboard);
