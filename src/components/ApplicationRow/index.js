import React, { Component } from "react";
import { Dropdown, MenuItem } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import ReactGA from "react-ga";
import { FlatButton } from "material-ui";
import Flag from "material-ui/svg-icons/content/flag";
import ConfirmButton from "material-ui-confirm-button";

class ApplicationRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      stageTitle: this.props.app.stage,
    };
  }

  handleApplied = () => {
    ReactGA.event({
      category: "Application",
      action: "Mark Applied",
    });
    this.setState({ stageTitle: "applied" });
    this.props.apply(this.props.app.id);
  };

  handleChangeStage = (event) => {
    ReactGA.event({
      category: "Application",
      action: "Change Stage",
    });
    this.setState({ stageTitle: event });
    this.props.setStage(this.props.app.id, event);
  };

  handleFlagAsClosed = () => {
    ReactGA.event({ category: "Application", action: "Flag as Closed" });
    this.handleChangeStage("hidden");
    this.props.markClosed(this.props.app.listing_id);
  };

  handleHide = () => {
    ReactGA.event({
      category: "Application",
      action: "Hide Listing",
    });
    this.setState({ stageTitle: "hidden" });
    this.props.setStage(this.props.app.id, "hidden");
  };

  renderButton = () => {
    if (this.props.app.applied) {
      return (
        <FlatButton onClick={this.handleApplied} disabled>
          Applied
        </FlatButton>
      );
    }
    return (
      <div style={{ textAlign: "center" }}>
        <RaisedButton
          style={{ marginBottom: "10px" }}
          label="Mark applied"
          onClick={this.handleApplied}
        />
        {this.props.app.stage !== "hidden" && (
          <RaisedButton
            label="Hide"
            style={{ marginLeft: "10px" }}
            onClick={this.handleHide}
          />
        )}
      </div>
    );
  };

  renderFlag = () => (
    <div style={{ textAlign: "center" }}>
      <ConfirmButton
        icon={
          <Flag
            color="red"
            tooltip="Font Icon"
            style={{ fontSize: "50%", color: "red" }}
          />
        }
        confirmMessage="Flag Link"
        onSubmit={this.handleFlagAsClosed}
        isFlat
      />
    </div>
  );

  renderStage = () => (
    <Dropdown
      disabled={!this.props.app.applied}
      onSelect={this.handleChangeStage}
      id={`dropdown-${this.props.app.id}`}
    >
      <Dropdown.Toggle>{this.state.stageTitle}</Dropdown.Toggle>
      <Dropdown.Menu>
        <MenuItem eventKey="not_applied" disabled>
          Not Applied
        </MenuItem>
        <MenuItem eventKey="applied">Applied</MenuItem>
        <MenuItem eventKey="interviewing">Interviewing</MenuItem>
        <MenuItem eventKey="offer">Offer</MenuItem>
        <MenuItem eventKey="accepted">Accepted</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="hidden">Hidden</MenuItem>
        <MenuItem eventKey="rejected">Rejected</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );

  render() {
    if (this.state.visible) {
      return (
        <tr>
          <td>
            <strong>{this.props.app.company}</strong>
            <br /> {this.props.app.title}
          </td>
          <td>
            <ReactGA.OutboundLink
              eventLabel={`View Job Posting - ${this.props.app.url}`}
              to={this.props.app.url}
              target="_blank"
            >
              View Job Posting
            </ReactGA.OutboundLink>
          </td>
          <td>{this.renderFlag()}</td>
          <td>
            {this.renderStage()}{" "}
            {this.props.app.stage === this.state.stageTitle ? "" : "Syncing..."}
          </td>
          <td>{this.renderButton()}</td>
        </tr>
      );
    }
    return <span />;
  }
}

export default ApplicationRow;
