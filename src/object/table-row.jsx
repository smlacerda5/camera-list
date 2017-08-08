import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import ConfirmDelete from '../components/modal-confirm-delete';

export default class TableRow extends React.Component {
   constructor(props) {
      super(props);

      this.toggleCheck = this.toggleCheck.bind(this);
      this.handleDoubleClick = this.handleDoubleClick.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.show = this.show.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      
      this.state = {
         checked: false,
         open: false,
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

   handleConfirm(e) {
      n.call('object.remove', { Name: this.props.data.name }, (e, res) => {
         if (res.statusCode === 200) {
            this.props.deleteRow();
            this.setState({ open: false, checked: false });
            return true;
         } else {
            $('.ui.error.message').html('<p>' + e.statusMessage + '</p>');
            return false;
         }
      });
   }

   show() { 
      this.setState({ 
         open: true,
         checked: true,
      }) 
   }
  
   handleCancel() { 
      this.setState({ 
         open: false,
         checked: false,
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
         <tr onDoubleClick={this.props.doubleClickAction} data-index={this.props.index} style={{minHeight: "50px"}}>
            <td className="center aligned" onClick={this.toggleCheck} >
               <input 
                  type="checkbox" 
                  name="selected" 
                  checked={this.state.checked} 
                  style={checkboxStyle}
               />
            </td>
            <td className="center aligned" onClick={this.toggleCheck}>{this.props.data.name}</td>
            <td className="center aligned" onClick={this.toggleCheck}>{this.props.data.label}</td>
            <td className="center aligned" onClick={this.toggleCheck}>{this.props.data.mediaserver}</td>
            <td className="center aligned" onClick={this.toggleCheck}>{this.props.data.geo}</td>
            <td className="center aligned" onClick={this.toggleCheck}></td>
            <td className="center aligned" onClick={this.toggleCheck}></td>
            <td className="center aligned" onClick={this.toggleCheck}>
               <ConfirmDelete 
                  show={this.show}
                  handleConfirm={this.handleConfirm} 
                  handleCancel={this.handleCancel} 
                  status={this.state.open} 
                  onClick={this.toggleCheck}
               />
            </td>
         </tr>
      )
   }
}

TableRow.defaultProps = {
   data: {},
   doubleClickAction: () => {},
}
