import React, { Component } from "react";
import { Button, Dropdown, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import TextField from "material-ui/TextField";
import ContentAdd from "material-ui/svg-icons/content/add";

import "./style.css";

const initialState = {
  active: false,
  companyName: "",
  url: "",
  positionName: ""
};

class ManualAdd extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleOpen = () => {
    this.setState({ active: true });
  };

  handleClose = () => {
    this.setState({ active: false });
  };

  handleChangeCompanyName = (e, name) => {
    this.setState({ companyName: name });
  };

  handleChangeURL = (e, url) => {
    this.setState({ url: url });
  };

  handleChangePositionName = (e, name) => {
    this.setState({ positionName: name });
  };

  handleSubmit = () => {
    this.props.addListing(
      this.state.companyName,
      this.state.url,
      this.state.positionName
    );
    this.setState(initialState);
    this.handleClose();
  };

  renderButton = () => {
    return (
      <FloatingActionButton onClick={this.handleOpen} backgroundColor="#4ecdc4">
        <ContentAdd />
      </FloatingActionButton>
    );
  };

  renderForm = () => {
    return (
      <div>
        <TextField
          onChange={this.handleChangeCompanyName}
          hintText="Company Name (e.g. Google)"
        />
        <br />
        <TextField
          underlineStyle={{ color: "white" }}
          onChange={this.handleChangeURL}
          hintText="URL"
        />
        <br />
        <TextField
          onChange={this.handleChangePositionName}
          hintText="Position (e.g. Software Intern)"
        />
        <br />
      </div>
    );
  };

  renderPrompt = () => {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <Dialog
        title="Add New Job Listing"
        actions={actions}
        modal={false}
        open={this.state.active}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        {this.renderForm()}
      </Dialog>
    );
  };

  render() {
    return (
      <div className="manual-add-wrapper">
        {this.renderButton()}
        {this.renderPrompt()}
      </div>
    );
  }
}

ManualAdd.propTypes = {
  addListing: PropTypes.func.isRequired // addListing(Company Name, url, Position)
};

export default ManualAdd;
