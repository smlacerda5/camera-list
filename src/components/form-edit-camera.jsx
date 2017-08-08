import React from 'react';
import { Button, Divider, Form, Dropdown, Message } from 'semantic-ui-react';

export default class EditCameraForm extends React.Component {
   constructor(props) {
      super(props);

      this.getJobListOptions = this.getJobListOptions.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.handleSave = this.handleSave.bind(this);

      this.state = { 
         jobListOptions: [],
         data: [],
      };

      this.getJobListOptions();
   }

   getJobListOptions() {
      n.call('job.list', {}, (e, res) => {
         const results = res.body;

         let options = [];
         
         results.forEach((object, idx) => {
            let data = {
               key: idx,
               value: object.Name,
               text: object.Name
            };
            
            options.push(data);
         });

         this.setState({jobListOptions: options});
      });
   }

   validateForm() {
      const formValidated = $('.ui.form').form(
         {
            fields: {
               name: {
                  identifier: 'name',
                  rules: [ 
                     {
                        type   : 'empty',
                        prompt : 'Your selection was invalid, this camera does not have a name'
                     }
                  ]
               },
               label: {
                  identifier: 'label',
                  rules: [
                     {
                        type   : 'empty',
                        prompt : 'Please enter a label for the camera'
                     }
                  ]
               },
               userId: {
                  identifier: 'userId',
                  rules: [
                     {
                        type: 'empty',
                        prompt: 'Please enter a user id'
                     }
                  ]
               },
               password: {
                  identifier: 'password',
                  rules: [
                     {
                        type   : 'empty',
                        prompt : 'Please enter a password'
                     },
                     {
                        type   : 'minLength[6]',
                        prompt : 'Your password must be at least {ruleValue} characters'
                     }
                  ]
               },
               objectTypeName: {
                  identifier: 'objectTypeName',
                  rules: [
                     {
                        type   : 'empty',
                        prompt : 'Please select an object type'
                     }
                  ]
               },
               latitude: {
                  identifier: 'latitude',
                  rules: [
                     {
                        type: 'number',
                        prompt: 'Please enter numeric characters only'
                     }
                  ]
               },
               longitude: {
                  identifier: 'longitude',
                  rules: [
                     {
                        type: 'number',
                        prompt: 'Please enter numeric characters only'
                     }
                  ]
               }
            }
         }
      )

      if ($(formValidated).form('is valid')) {
         this.handleSave();
      } else {
         return false;
      }
   }

   handleSave() {
      let objectTypeName = $('#objectTypeName > .text').get(0);
      objectTypeName = objectTypeName.innerText;

      const data = {
         Name: $('#name').val(),
         Label: $('#label').val(), 
         Description: $('#description').val(), 
         PlayerTypeName: $('#playerTypeName').val(), 
         ObjectTypeName: objectTypeName, 
         Properties: {
            rtsp: [ $('#rtspProps').val() ], 
            userId: $('#userId').val(),
            latitude: $('#latitude').val(),
            longitude: $('#longitude').val(),
            PlayerTypeName: $('#playerTypeName').val(),
         },
         Relations: {
            mediaserver: [ $('#mdServer').val() ], 
         },
      }

      n.call('object.save', { data: JSON.stringify(data) }, (e, res) => {
         if (res.statusCode == 200) {
            this.props.closeModal();
            this.props.addData(data);
            return true;
         } else {
            $('.ui.error.message').html('<p>' + e.statusMessage + '</p>');
            return false;
         }
      });
   }

   render() {
      return (
         <Form size="large" error>
            <Form.Group widths="equal">
               <Form.Field label='Name' control='input' placeholder='Name' name="name" id="name" required readOnly />
               <Form.Field label="Label" control='input' placeholder='Label' name="label" id="label" required />
            </Form.Group>
            <Form.Field label='Description' control='input' placeholder='Description' name="description" id="description" />
            <Form.Group widths="equal">
               <Form.Field label='User ID' control='input' placeholder='User ID' name="userId" id="userId" required />
               <Form.Field label="Password" control='input' placeholder='Password' name="password" id="password" required />
            </Form.Group>
            <Form.Field label='RTSP Properties' control='input' placeholder='RTSP Properties' name="rtspProps" id="rtspProps" />
            <Form.Field label='Media Server' control='input' placeholder='Media Server' name="mdServer" id="mdServer" />
            <Form.Group widths="equal">
               <Form.Field label='Latitude' control='input' placeholder='Latitude' name="latitude" id="latitude" />
               <Form.Field label="Longitude" control='input' placeholder='Longitude' name="longitude" id="longitude"  />
            </Form.Group>
            <Form.Group widths="equal">
               <Form.Field>
                  <Form.Select label='Object Type Name' options={this.state.jobListOptions} placeholder='Object Type Name' name="objectTypeName" id="objectTypeName" required />
               </Form.Field>
               <Form.Field label='Player Type Name' control='input' defaultValue="video" name="playerTypeName" id="playerTypeName" readOnly />
            </Form.Group>
            <Button type='submit' className="submit" onClick={this.validateForm}>Save</Button>
            <Button type='deny' className="cancel" onClick={this.props.closeModal}>Cancel</Button>
            <Message 
               error
            />
         </Form>
      )
   }
}

EditCameraForm.defaultProps = {
   closeModal: function() {},
   addData: function() {},
}
