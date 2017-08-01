import React from 'react'
import { Button, Header, Icon, Image, Modal, Checkbox } from 'semantic-ui-react'

module.exports = React.createClass({
   getInitialState: function() {
		n.call("job.list", {}, (err, res) => {
         var results = res.body
         console.log(res);
         
         this.setState({
            ObjectTypes: results,
         })
		});

		return {
         ObjectTypes: [],
		}
   },

   defaultProps: {
      title: '',
      fields: [],
   },

   render: function() {
      if (this.props.isOpen === false) return null

      const modalStyle = {
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         zIndex: '9999',
         background: '#fff',
         width: "65%",
         minWidth: "300px",
         maxWidth: "750px",
         padding: "25px",
      }

      const backdropStyle = {
         position: 'absolute',
         width: '103vw',
         height: '101vh',
         top: '-50px',
         left: '-50px',
         zIndex: '9998',
         background: 'rgba(0, 0, 0, 0.3)'
      }

      const objectTypesOptions = this.state.ObjectTypes.map((object, idx) => {
         return (
            <option value={object.Name} key={idx}>{object.Name}</option>
         )
      });

      return (
         <Modal trigger={<Button>Long Modal</Button>}>
            <Modal.Header>Profile Picture</Modal.Header>
            <Modal.Content image>
               <Image wrapped size='medium' src='/assets/images/wireframe/image.png' />
               <Modal.Description>
                  <Header>Modal Header</Header>

               </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
               <Button primary>
                  Proceed <Icon name='right chevron' />
               </Button>
            </Modal.Actions>
         </Modal>
      )
   },

   close: function(e) {
      e.preventDefault()

      if (this.props.onClose) {
         this.props.onClose()
      }
   }
});