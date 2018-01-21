import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getApplications } from '../actions/application';

class Dashboard extends Component {
  componentDidMount() {
    this.handleLoadApps();
  }

  handleLoadApps = () => {
    this.props.dispatch(getApplications());
  };

  render() {
    const applications = this.props.applications;
    const applicationList = applications.map(application => (
      <li key={application.id}>
        <strong>{application.company} </strong>
        {application.title}
      </li>
    ));

    const loading = this.props.appsLoading ? <p>loading...</p> : <span />;

    return (
      <div>
        <p>Dashboard</p>
        <Button onClick={this.handleLoadApps}>Load Applications</Button>
        {loading}
        <ul>{applicationList}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  const applications = state.applications.applications;
  const appsLoading = state.applications.loadingApps;
  return {
    user,
    applications,
    appsLoading,
  };
};

export default connect(mapStateToProps)(Dashboard);
