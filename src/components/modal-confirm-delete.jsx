import React, { Component } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

export default class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.show = this.show.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = { open: false }
  }

  show() { this.setState({ open: true }) }
  
  handleConfirm() { 
    this.setState({ open: false }) 
  }
  
  handleCancel() { this.setState({ open: false }) }

  render() {
    const btnStyle = {
      border: "none",
      boxShadow: "none",
      color: "#0093ee",
      background: "none",
    }
    return (
      <div>
        <Button icon className="trash-icon" onClick={this.show} style={btnStyle}><Icon name="trash" /></Button>
        <Confirm
          open={this.state.open}
          header="Delete Camera"
          cancelButton='No'
          confirmButton="Yes"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}
