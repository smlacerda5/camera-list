import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

export default class EditCameraModal extends React.Component {
   constructor(props) {
      super(props);

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

      this.state = { isOpen: false }
   }

   openModal() {
      this.setState({isOpen: true})
   }

   closeModal() {
       this.setState({isOpen: false});
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
            open={this.state.isOpen}
            onClose={this.closeModal}
            id="add-camera-form" 
         >
            <Header icon='cube' content='Edit Camera' />
            <Modal.Content>
               <Modal.Description>
                  <AddCameraForm closeModal={this.closeModal} addData={this.props.addData} />
               </Modal.Description>
            </Modal.Content>
         </Modal>
      )
   }
}

EditCameraModal.defaultProps = {
   addData: function() {}, // makes call to retrieve data for table
}