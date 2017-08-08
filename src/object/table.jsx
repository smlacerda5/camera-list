import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import TableRow from './table-row';
import AddCameraModal from '../components/modal-add-camera';

export default class Table extends React.Component {
   constructor(props) {
      super(props);

      this.createTHead = this.createTHead.bind(this);
      this.setTableHeight = this.setTableHeight.bind(this);
      this.deleteRow = this.deleteRow.bind(this);

      this.state = {
         tableHeight: "50vh",
         data: [],
      }
   }

   componentWillUpdate(nextProps, nextState) {
      this.state.data = nextProps.data;
   }

   componentDidMount() {
      this.setTableHeight();
   }

   createTHead() {
      const tHead = this.props.headers.map((object, idx) => {
         return (
            <th key={idx} style={ object.sortable ? {cursor: 'pointer'} : null } 
               className="center aligned" 
               onClick={object.sortable ? this.props.sorter : null} 
               data-sortField={object.keyName}
            >
               {object.label}
            </th>
         )
      })

      return tHead;
   }

   setTableHeight() {
      const windowHeight = $(window).innerHeight();
      const tableOffsetTop = $('#scroll-table').offset().top;

      const tableHeight = $('#scroll-table').height((windowHeight - tableOffsetTop) - 25 || "75vh");

      this.setState({
         tableHeight: tableHeight,
      })
   }

   deleteRow(index) {
      let data = [...this.state.data];
      data.splice(index, 1);
      this.setState({data});
   }

   render() {
      const tableRow = this.state.data.map((object, idx) => {
         return (
            <TableRow key={idx} data={object} deleteRow={this.deleteRow.bind(this, idx)} index={idx} />
         )
      })

      return (
         <div className="table">
            <table id="thead" className="ui celled padded fixed striped selectable table k-selectable" role="grid" tabIndex="0" data-role="selectable" aria-multiselectable="true" style={{touchAction: "none", marginBottom: 0,}} aria-activedescendant="aria_active_cell">
               <thead className="blue">
                  <tr>
                     { this.createTHead() }
                  </tr>
               </thead>
            </table>
            <div id="scroll-table" style={{overflowY: "scroll", height: this.state.tableHeight, width: "100%", background: "#fff"}}>
               <table className="ui celled padded fixed striped selectable table k-selectable" role="grid" tabIndex="0" data-role="selectable" aria-multiselectable="true" style={{touchAction: "none"}} aria-activedescendant="aria_active_cell">
                  <tbody>
                     {tableRow}
                  </tbody>
               </table>
            </div>
            <EditCameraModal isOpen={} />
         </div>
      )
   }
}

Table.defaultProps = {
   data: [],
   sortable: false,
   sorter: function() {},
   headers: [],
}
