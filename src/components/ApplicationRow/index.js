import React, { Component } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

class ApplicationRow extends Component {
  handleApplied = () => {
    this.props.apply(this.props.app.id);
  };

  renderButton = () => {
    if (this.props.app.applied) {
      return (
        <Button onClick={this.handleApplied} disabled>
          Apply
        </Button>
      );
    }
    return <Button onClick={this.handleApplied}>Apply</Button>;
  };

  render() {
    return (
      <ListGroupItem key={this.props.app.id}>
        <strong>{this.props.app.company} </strong>
        <span>{this.props.app.title} </span>
        {this.renderButton()}
      </ListGroupItem>
    );
  }
}

export default ApplicationRow;
