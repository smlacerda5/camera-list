import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

import EditCameraForm from './form-edit-camera';

export default class EditCameraModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
        }
    }

    render() {
        const btnStyle = {
            background: "transparent",
            color: "#0093ee",
            border: "1px solid #0093ee",
            borderRadius: "4px",
        }

        return (
            <Modal 
                open={this.props.isOpen}
                onClose={this.props.closeModal}
                id="edit-camera-modal" 
            >
                <Header icon='cube' content='Edit Camera' />
                <Modal.Content>
                <Modal.Description>
                    <EditCameraForm closeModal={this.props.closeModal} addData={this.props.addData} data={this.props.data} />
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

EditCameraModal.defaultProps = {
   addData: () => {}, // makes call to retrieve data for table
   closeModal: () => {},
   isOpen: false,
   data: {},
}

