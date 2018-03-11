import React, { Component } from "react";
import { connect } from "react-redux";

import { DropdownButton, MenuItem, Table } from "react-bootstrap";

import { getUser } from "../actions/user";
import {
  getApplications,
  markApplied,
  changeStage
} from "../actions/application";
import ApplicationRow from "../components/ApplicationRow";
import ApplicationCategory from "../components/ApplicationCategory";

class Dashboard extends Component {
  componentDidMount() {
    this.handleLoadApps();
  }

  handleLoadApps = () => {
    this.props.dispatch(getApplications());
    this.props.dispatch(getUser());
  };

  handleApplied = id => {
    this.props.dispatch(markApplied(id));
  };

  handleChangeStage = (id, stage) => {
    this.props.dispatch(changeStage(id, stage));
  };

  render() {
    const applications = this.props.applications;

    const loading = this.props.appsLoading ? <p>loading...</p> : <span />;

    return (
      <div>
        <div
          id="wrapper"
          className="Header"
          style={{
            backgroundColor: "#5ede5c",
            height: "7vh",
            color: "white",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              alignItems: "center",
              paddingLeft: "0px",
              display: "flex",
              flexBasis: "1px"
            }}
          >
            <img
              alt=""
              src="logo.png"
              style={{ maxWidth: "18000%", objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div align="center">
              <DropdownButton
                bsStyle="default"
                key={1}
                title="Software Engineer"
                id="drop1"
              >
                <MenuItem key={1} active>
                  Software Engineer
                </MenuItem>
              </DropdownButton>
            </div>
            <div align="center">
              <DropdownButton
                bsStyle="default"
                key={1}
                title="Intern"
                id="drop2"
              >
                <MenuItem key={1} active>
                  Intern
                </MenuItem>
              </DropdownButton>
            </div>
            <div align="center">
              <DropdownButton
                bsStyle="default"
                key={1}
                title="Bay Area, CA"
                id="drop3"
              >
                <MenuItem key={1} active>
                  Bay Area, CA
                </MenuItem>
              </DropdownButton>
            </div>
          </div>
          <div
            style={{
              paddingRight: "20px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <p
              align="right"
              style={{ fontWeight: "lighter", fontSize: "150%" }}
            >
              {this.props.user.completed_apps} / {this.props.user.total_apps}
            </p>
          </div>
        </div>
        <div style={{ margin: "2%" }}>
          {loading}

          {/* Application Categories */}
          <ApplicationCategory
            title="Not Applied"
            subtitle="It's all a numbers game!"
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.not_applied}
          />

          <ApplicationCategory
            title="Applied"
            subtitle=""
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.applied}
          />

          <ApplicationCategory
            title="Interviewing"
            subtitle=""
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.interviewing}
          />

          <ApplicationCategory
            title="Offer"
            subtitle=""
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.offer}
          />

          <ApplicationCategory
            title="Accepted"
            subtitle=""
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.accepted}
          />

          <ApplicationCategory
            title="Rejected"
            subtitle=""
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.rejected}
          />

          <ApplicationCategory
            title="Hidden"
            subtitle=""
            apply={this.handleApplied}
            setStage={this.handleChangeStage}
            applications={applications.hidden}
          />
        </div>
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
