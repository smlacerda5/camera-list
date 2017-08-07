import React, { Component } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

export default class ConfirmDelete extends Component {
  render() {
    const btnStyle = {
      border: "none",
      boxShadow: "none",
      color: "#0093ee",
      background: "none",
    }

    return (
      <div>
        <Button icon className="trash-icon" onClick={this.props.show} style={btnStyle}><Icon name="trash" /></Button>
        <Confirm
          open={this.props.status}
          header="Delete Camera"
          cancelButton='No'
          confirmButton="Yes"
          onCancel={this.props.handleCancel}
          onConfirm={this.props.handleConfirm}
          style={{fontSize: "16px"}}
        />
      </div>
    )
  }
}
