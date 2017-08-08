import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import TableRow from './table-row';
import AddCameraModal from '../components/modal-add-camera';
import EditCameraModal from '../components/modal-edit-camera';

export default class Table extends React.Component {
   constructor(props) {
      super(props);

      this.createTHead = this.createTHead.bind(this);
      this.setTableHeight = this.setTableHeight.bind(this);
      this.deleteRow = this.deleteRow.bind(this);
      this.openEditRowModal = this.openEditRowModal.bind(this);

      this.state = {
         tableHeight: "50vh",
         data: [],
         isEditRowModalOpen: false,
         selectedRowsData: {},
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
         const thStyle = {
            background: "transparent", 
            fontFamily: "Heebo", 
            fontSize: "12px", 
            fontWeight: "500", 
            lineHeight: "1.42", 
            letterSpacing: "1.9px", 
            color: "#8dabc4", 
            cursor: object.sortable ? 'pointer' : '',
         }

         return (
            <th 
               key={idx} 
               className="center aligned" 
               onClick={object.sortable ? this.props.sorter : null} 
               data-sortField={object.keyName}
               style={{thStyle}}
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

   openEditRowModal(e) {
      const selectedRowsIndex = Number(e.currentTarget.dataset.index);
      const selectedRowsData = this.state.data[selectedRowsIndex];

      this.setState({
         isEditRowModalOpen: true,
         selectedRowsData: selectedRowsData,
      });
   }

   closeEditRowModal() {
      this.setState({
         isEditRowModalOpen: false,
      })
   }

   render() {
      const tableRow = this.state.data.map((object, idx) => {
         return (
            <TableRow key={idx} data={object} deleteRow={this.deleteRow.bind(this, idx)} index={idx} doubleClickAction={this.openEditRowModal} />
         )
      })

      return (
         <div className="table" style={{border: "1px solid #b7d2e5", background: "#fff"}}>
            <table id="thead" className="ui celled padded fixed selectable table k-selectable" role="grid" tabIndex="0" data-role="selectable" aria-multiselectable="true" style={{touchAction: "none", margin: "0", border: "none", width: "98.5%"}} aria-activedescendant="aria_active_cell">
               <thead className="blue">
                  <tr>
                     { this.createTHead() }
                  </tr>
               </thead>
            </table>
            <div id="scroll-table" style={{overflowY: "scroll", height: this.state.tableHeight, width: "100%", background: "#fff", borderTop: "1px solid rgb(183, 210, 229)" }}>
               <table className="ui celled padded fixed striped selectable table k-selectable" role="grid" tabIndex="0" data-role="selectable" aria-multiselectable="true" style={{touchAction: "none", border: "none"}} aria-activedescendant="aria_active_cell">
                  <tbody>
                     {tableRow}
                  </tbody>
               </table>
            </div>
            <EditCameraModal isOpen={this.state.isEditRowModalOpen} closeModal={this.closeEditRowModal.bind(this)} data={this.state.selectedRowsData} />
         </div>
      )
   }
}

Table.defaultProps = {
   data: [],
   sortable: false,
   sorter: () => {},
   headers: [],
}
