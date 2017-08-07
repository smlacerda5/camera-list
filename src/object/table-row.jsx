import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import ConfirmDelete from '../components/modal-confirm-delete';

export default class TableRow extends React.Component {
   constructor(props) {
      super(props);

      this.toggleCheck = this.toggleCheck.bind(this);
      this.handleDoubleClick = this.handleDoubleClick.bind(this);
      
      this.state = {
         checked: false,
      }
   }

   toggleCheck() {
      this.setState({
         checked: !this.state.checked,
      })
   }

   handleDoubleClick() {
      this.setState({
         checked: this.state.checked,
      })
   }

   render() {
      const checkboxStyle = {
         fontSize: "18px",
         objectFit: "contain",
         borderRadius: "4px",
         backgroundColor: "#c5d9e8",
         border: "solid 1px #c5d9e8",
      }
       return (
         <tr onClick={this.toggleCheck} onDoubleClick={this.handleDoubleClick}>
            <td className="center aligned">
               <input 
                  type="checkbox" 
                  name="selected" 
                  checked={this.state.checked} 
                  style={checkboxStyle}
               />
            </td>
            <td className="center aligned">{this.props.data.name}</td>
            <td className="center aligned">{this.props.data.label}</td>
            <td className="center aligned">{this.props.data.mediaserver}</td>
            <td className="center aligned">{this.props.data.geo}</td>
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
