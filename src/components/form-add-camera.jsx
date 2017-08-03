/* Form for adding cameras to database */

import React from 'react';
import { Button, Divider, Form, Dropdown, Message } from 'semantic-ui-react';

export default class AddCameraForm extends React.Component {
   constructor(props) {
      super(props);

      this.handleSave = this.handleSave.bind(this)

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

      this.state = { 
         jobListOptions: [] 
      };
   }

   handleSave() {
      $('.ui.form')
         .form(
            {
               fields: {
                  name: {
                     identifier: 'name',
                     rules: [
                        {
                           type   : 'empty',
                           prompt : 'Please enter a name for the camera'
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
                  playerTypeName: {
                     identifier: 'playerTypeName',
                     rules: [
                        {
                           type: 'empty',
                           prompt: 'Please select enter a player type'
                        }
                     ]
                  },
                  objectTypeName: {
                     identifier: 'objectTypeName',
                     rules: [
                        {
                           type   : 'empty',
                           prompt : 'Please select an Object Type'
                        }
                     ]
                  },
                  latitude: {
                     identifier: 'latitude',
                     rules: [
                        {
                           type: 'number',
                           prompt: 'Please enter numerals only'
                        }
                     ]
                  },
                  longitude: {
                     identifier: 'longitude',
                     rules: [
                        {
                           type: 'number',
                           prompt: 'Please enter numerals only'
                        }
                     ]
                  }
               }
            }, {
               onFailure: () => {
                  return false;
               },
               onSuccess: (e) => {
                  e.preventDefault();
                  console.log('test')
                  const data = {
                     Name: $('#name').val(),
                     Label: $('#label').val(), 
                     Description: $('#description').val(), 
                     PlayerTypeName: $('#playerTypeName').val(), 
                     ObjectTypeName: $('#objectTypeName').innerText, 
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

                  n.call('object.save', { data: JSON.stringify(data) }, function(e, res) {
                     if (res.statusCode == 200) {
                        this.props.closeModal();
                        return true;
                     } else {
                        console.log(e);
                        return false;
                     }
                  });
               }
            }
         )
   }

   render() {
      const { err } = this.props;

      return (
         <Form size="large" error>
            <Form.Group widths="equal">
               <Form.Field label='Name' control='input' placeholder='Name' name="name" id="name" required />
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
            <Button type='submit' className="submit" onClick={this.handleSave}>Save</Button>
            <Button type='deny' className="cancel" onClick={this.props.closeModal}>Cancel</Button>
            <Message 
               error
            />
         </Form>
      )
   }
}
