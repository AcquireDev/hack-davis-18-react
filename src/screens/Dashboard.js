import React, { Component } from "react";
import { connect } from "react-redux";

import { DropdownButton, MenuItem } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import Snackbar from "material-ui/Snackbar";
import ReactGA from "react-ga";

import { getUser, logout, setBoardId } from "../actions/user";
import {
  getApplications,
  markApplied,
  changeStage,
} from "../actions/application";
import { fetchJobBoards } from "../actions/job_boards";
import { createListing } from "../actions/listings";
import ApplicationCategory from "../components/ApplicationCategory";
import ManualAdd from "../components/ManualAdd";
import "../css/default.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      snackMessage: "",
      boardId: null,
    };
  }

  componentDidMount() {
    ReactGA.initialize("UA-116571532-1");
    ReactGA.pageview("/dashboard", "Dashboard");
    this.props.dispatch(getUser());
    this.props.dispatch(fetchJobBoards());
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.addedListingId !== nextProps.addedListingId &&
      nextProps.addedListingId !== ""
    ) {
      this.setState({
        open: true,
        snackMessage: "Listing added!",
      });
    }

    if (
      nextProps.user.job_board_id !== null &&
      nextProps.user.job_board_id !== this.state.boardId
    ) {
      this.setState({ boardId: nextProps.user.job_board_id });
      this.props.dispatch(getApplications(nextProps.user.job_board_id));
    }
  }

  handleLoadApps = (boardId) => {
    this.setState({ boardId });
    this.props.dispatch(getApplications(boardId));
  };

  handleApplied = (id) => {
    this.props.dispatch(markApplied(id));
  };

  handleChangeStage = (id, stage) => {
    this.props.dispatch(changeStage(id, stage));
  };

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  handleJobBoardSelect = (id) => {
    this.handleLoadApps(id);
    this.props.dispatch(setBoardId(id));
  };

  handleCreateListing = (companyName, url, positionName) => {
    this.setState({ snackMessage: "Adding listing...", open: true });
    this.props.dispatch(createListing(companyName, url, positionName, this.state.boardId),);
  };

  renderInitialLoading = () => (
    <div className="light-color-wrapper">
      <div align="center">
        <img
          src="logo.png"
          className="white-logo"
          style={{ width: "40%", height: "40%", paddingBottom: "25px" }}
          alt="Acquire"
        />
        <h3 style={{ textAlign: "center", color: "white" }}>
          Hold tight! We're syncing all the job listings with your account :)
        </h3>
      </div>
    </div>
  );
  render() {
    const currentJobBoard = this.props.jobBoards.find(board => board.id == this.state.boardId,);
    const applications = this.props.applications;
    const loading = this.props.appsLoading ? (
      <LinearProgress mode="indeterminate" style={{ height: "5px" }} />
    ) : (
      <span />
    );
    if (this.props.initialLoaded === true) {
      return (
        <div className="wrapper">
          <div className="header">
            <div
              style={{
                alignItems: "center",
                paddingLeft: "0px",
                display: "flex",
                flexBasis: "1px",
              }}
            >
              <img
                alt=""
                src="logo.png"
                className="white-logo"
                style={{
                  maxWidth: "18000%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                paddingRight: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                align="right"
                style={{ fontWeight: "lighter", fontSize: "150%" }}
              />
              <RaisedButton
                label="Logout"
                style={{ marginRight: "15px", marginLeft: "15px" }}
                onClick={this.handleLogout}
              />
            </div>
          </div>
          {loading}
          <div style={{ textAlign: "center", margin: "10px" }}>
            <DropdownButton
              bsSize="large"
              title={`${currentJobBoard.location} | ${
                currentJobBoard.job_type
              } | ${currentJobBoard.position_type}`}
              id="dropdown-size-large"
              onSelect={this.handleJobBoardSelect}
            >
              {this.props.jobBoards.map(jobBoard => (
                <MenuItem
                  key={`jobBoard-${jobBoard.id}`}
                  eventKey={jobBoard.id}
                >
                  {`${jobBoard.location} | ${jobBoard.job_type} | ${
                    jobBoard.position_type
                  }`}
                </MenuItem>
              ))}
            </DropdownButton>
          </div>
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
    return this.renderInitialLoading();
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  const initialLoaded = state.applications.initialLoaded;
  const applications = state.applications.applications;
  const newApplications = state.applications.newApplications;
  const appsLoading = state.applications.loadingApps;
  const addedListingId = state.listing.last_added_id;
  const jobBoards = state.jobBoard.job_boards;
  return {
    user,
    applications,
    appsLoading,
    newApplications,
    addedListingId,
    initialLoaded,
    jobBoards,
  };
};

export default connect(mapStateToProps)(Dashboard);
