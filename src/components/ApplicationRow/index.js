import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ApplicationRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }
  handleApplied = () => {
    this.setState({ visible: false });
    this.props.apply(this.props.app.id);
  };

  renderButton = () => {
    if (this.props.app.applied) {
      return (
        <Button onClick={this.handleApplied} disabled>
          Applied
        </Button>
      );
    }
    return <Button onClick={this.handleApplied}>Mark as applied</Button>;
  };

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
          <td>{this.renderButton()}</td>
        </tr>
      );
    }
    return <span />;
  }
}

export default ApplicationRow;
