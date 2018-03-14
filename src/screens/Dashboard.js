import React, { Component } from "react";
import { connect } from "react-redux";

import { DropdownButton, MenuItem, Table } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import Snackbar from "material-ui/Snackbar";

import { getUser, logout } from "../actions/user";
import {
  getApplications,
  markApplied,
  changeStage
} from "../actions/application";
import { createListing } from "../actions/listings";
import ApplicationRow from "../components/ApplicationRow";
import ApplicationCategory from "../components/ApplicationCategory";
import ManualAdd from "../components/ManualAdd";
import "../css/default.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      snackMessage: ""
    };
  }

  componentDidMount() {
    this.handleLoadApps();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.addedListingId != nextProps.addedListingId &&
      nextProps.addedListingId != ""
    ) {
      this.setState({
        open: true,
        snackMessage: "Listing added!"
      });
    }
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

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleCreateListing = (companyName, url, positionName) => {
    this.setState({ snackMessage: "Adding listing...", open: true });
    this.props.dispatch(createListing(companyName, url, positionName));
  };

  render() {
    const applications = this.props.applications;

    const loading = this.props.appsLoading ? (
      <LinearProgress mode="indeterminate" style={{ height: "5px" }} />
    ) : (
      <span />
    );

    return (
      <div className="wrapper">
        <div className="header">
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
              className="white-logo"
              style={{
                maxWidth: "18000%",
                objectFit: "contain"
              }}
            />
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
            <RaisedButton
              label="Logout"
              style={{ marginRight: "15px", marginLeft: "15px" }}
              onClick={this.handleLogout}
            />
          </div>
        </div>
        {loading}
        <div style={{ margin: "2%" }}>
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
        <ManualAdd addListing={this.handleCreateListing} />
        <Snackbar
          open={this.state.open}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onRequestClose={() => {
            this.setState({ open: false });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user;
  const applications = state.applications.applications;
  const newApplications = state.applications.newApplications;
  const appsLoading = state.applications.loadingApps;
  const addedListingId = state.listing.last_added_id;
  return {
    user,
    applications,
    appsLoading,
    newApplications,
    addedListingId
  };
};

export default connect(mapStateToProps)(Dashboard);
