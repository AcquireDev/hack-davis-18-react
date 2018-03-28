import React, { Component } from "react";
import { Dropdown, MenuItem } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import ReactGA from "react-ga";

class ApplicationRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      stageTitle: this.props.app.stage
    };
  }

  handleApplied = () => {
    ReactGA.event({
      category: "Application",
      action: "Mark Applied"
    });
    this.setState({ stageTitle: "applied" });
    this.props.apply(this.props.app.id);
  };

  handleChangeStage = event => {
    ReactGA.event({
      category: "Application",
      action: "Change Stage"
    });
    this.setState({ stageTitle: event });
    this.props.setStage(this.props.app.id, event);
  };

  handleHide = () => {
    ReactGA.event({
      category: "Application",
      action: "Hide Listing"
    });
    this.setState({ stageTitle: "hidden" });
    this.props.setStage(this.props.app.id, "hidden");
  };

  renderButton = () => {
    if (this.props.app.applied) {
      return (
        <RaisedButton onClick={this.handleApplied} disabled>
          Applied
        </RaisedButton>
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

  renderStage = () => (
    <Dropdown
      disabled={!this.props.app.applied}
      onSelect={this.handleChangeStage}
      id={"dropdown-" + this.props.app.id}
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
          </td>
          <td>
            <ReactGA.OutboundLink
              eventLabel={`View Job Posting - ${this.props.app.url}`}
              to={this.props.app.url}
              target="_blank"
            >
              View Job Posting
            </ReactGA.OutboundLink>
            {/* <a target="_blank" href={this.props.app.url}>
              View Job Posting
            </a> */}
          </td>
          <td>{this.props.app.title}</td>
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
