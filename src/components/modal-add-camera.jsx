import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

import AddCameraButton from './btn-add-camera';
import AddCameraForm from './form-add-camera';

export default class AddCameraModal extends React.Component {
   constructor(props) {
      super(props);

      this.openModal=this.openModal.bind(this);
      this.closeModal=this.closeModal.bind(this);

      this.state = { isOpen: false }
   }

   openModal() {
      this.setState({isOpen: true})
   }

   closeModal() {
       this.setState({isOpen: false});
   }

   render() {
      return (
         <Modal 
            open={this.state.isOpen}
            onClose={this.closeModal}
            id="add-camera-form" 
            trigger={
               <Button id="color-0093ee border-color-0093ee" 
                  icon 
                  size="large" onClick={this.openModal}>
                  <Icon name="video-camera" />
               </Button>
            }
         >
            <Header icon='cube' content='New Object' />
            <Modal.Content>
               <Modal.Description>
                  <AddCameraForm closeModal={this.closeModal} getCameras={this.props.getCameras} />
               </Modal.Description>
            </Modal.Content>
         </Modal>
      )
   }
}