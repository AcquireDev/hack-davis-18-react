import React, { Component } from "react";
import { Button, Dropdown, MenuItem, Table } from "react-bootstrap";

import ApplicationRow from "../ApplicationRow";

class ApplicationCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };
  }

  handleHideToggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  renderApplications = () => {
    if (!this.state.visible) return <span />;

    const applicationList = this.props.applications.map(application => (
      <ApplicationRow
        key={application.id}
        app={application}
        apply={this.props.apply}
        setStage={this.props.setStage}
      />
    ));

    return (
      <Table
        striped
        bordered
        hover
        style={{
          tableLayout: "fixed"
        }}
      >
        <thead>
          <tr>
            <td>Company</td>
            <td>URL</td>
            <td>Position</td>
            <td>Status</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>{applicationList}</tbody>
      </Table>
    );
  };

  render() {
    return (
      <div style={{ marginLeft: "5%", marginRight: "5%" }}>
        <h2 style={{ color: "#5ede5c" }}>
          {this.props.title} <small>{this.props.subtitle}</small>{" "}
          <Button onClick={this.handleHideToggle}>Hide/Show</Button>
        </h2>
        {this.renderApplications()}
      </div>
    );
  }
}

export default ApplicationCategory;
