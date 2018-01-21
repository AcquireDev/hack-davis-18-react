import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { getApplications } from '../actions/application';

class Dashboard extends Component {
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

        </div>

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
