import React, { Component } from "react";
import { Button, Dropdown, MenuItem } from "react-bootstrap";

class ApplicationRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      stageTitle: this.props.app.stage
    };
  }

  handleApplied = () => {
    this.setState({ stageTitle: "applied" });
    this.props.apply(this.props.app.id);
  };

  handleChangeStage = event => {
    this.setState({ stageTitle: event });
    this.props.setStage(this.props.app.id, event);
  };

  handleHide = () => {
    this.setState({ stageTitle: "hidden" });
    this.props.setStage(this.props.app.id, "hidden");
  };

  renderButton = () => {
    if (this.props.app.applied) {
      return (
        <Button onClick={this.handleApplied} disabled>
          Applied
        </Button>
      );
    }
    return (
      <div>
        <Button onClick={this.handleApplied}>Mark applied</Button>
        {this.props.app.stage != "hidden" && (
          <Button style={{ marginLeft: "10px" }} onClick={this.handleHide}>
            Hide
          </Button>
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
            <a target="_blank" href={this.props.app.url}>
              View Job Posting
            </a>
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
