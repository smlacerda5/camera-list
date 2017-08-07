import React, { Component } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false }
  }

  show() { this.setState({ open: true }) }
  handleConfirm() { this.setState({ open: false }) }
  handleCancel() { this.setState({ open: false }) }

  render() {
    return (
      <div>
        <Button className="ui icon button" onClick={this.show}><i className="trash"></i></Button>
        <Confirm
          open={this.state.open}
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default ConfirmDelete