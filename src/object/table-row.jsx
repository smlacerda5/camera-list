import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import ConfirmDelete from '../components/modal-confirm-delete';

export default class TableRow extends React.Component {
   constructor(props) {
      super(props);
      
      this.toggleCheck = this.toggleCheck.bind(this);

      this.state = {
         checked: false,
         data: [],
      }
   }

   toggleCheck() {
      this.setState({
         checked: !this.state.checked,
      })
   }

   handleDoubleClick() {

   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         data: nextProps.data,
      })
   }

   render() {
       return (
         <tr onClick={this.toggleCheck} onDoubleClick={this.handleDoubleClick}>
            <td className="center aligned">
               <input 
                  type="checkbox" 
                  name="selected" 
                  checked={this.state.checked} 
               />
            </td>
            <td className="center aligned">{this.state.data.name}</td>
            <td className="center aligned">{this.state.data.label}</td>
            <td className="center aligned">{this.state.data.mediaserver}</td>
            <td className="center aligned">{this.state.data.geo}</td>
            <td className="center aligned"></td>
            <td className="center aligned"></td>
            <td className="center aligned"><ConfirmDelete /></td>
         </tr>
      )
   }
}

TableRow.defaultProps = {
   data: {},
}
