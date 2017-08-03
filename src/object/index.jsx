var ObjectWindow = require('./_deprecated_window');
var TableRow = require('./table-row');
var UploadButton = require('../components/btn-upload');
var RefreshButton = require('../components/btn-refresh');

import { Icon } from 'semantic-ui-react';
import AddCameraModal from "../components/modal-add-camera";

var Toolbar = require('./../ui/toolbar');

module.exports = React.createClass({
	displayName: "Object",

	getInitialState: function() {
		const self = this;

		n.call("object.list", {export: false, query: {ObjectTypeName: 'camera'}}, function(err, res) {
			var results=res.body
			
			self.setState({cameras: results});
		});

		return {
			mode: '',
			windowTitle: '',
			windowShow: false,
			values: {},
			cameras: [],
			isAddCamModalOpen: false,
		}
	},

	isNameExist: function(_parm) {
		var isNameExist = false;
		var self = this;

		if (self.refs.objectList != undefined) {
			self.refs.objectList.data.list.map((item)=> {
				if (item.Name == _parm) {
					isNameExist = true;
				}
			});
		}
		return isNameExist;
	},

	handleSelect: function(plugin, value) {
		this.setState({
			mode: '',
			windowTitle: '',
			values: value.dataItem,
			windowShow: false
		});
	},

	handleDblClickRow: function(idx, e) {
		this.state.cameras[idx].checked = true;

		this.setState({
			mode: 'edit',
			windowTitle: 'Edit Object',
			windowShow: true,
			values: this.state.cameras[idx],
			cameras: this.state.cameras,
		}, function() {
			this.forceUpdate();
			this.refs.objectWindow.show();
		});
	},

	// handleClickNewBtn: function() {
	// 	this.setState({
	// 		mode: 'new',
	// 		windowTitle: 'New Camera',
	// 		windowShow: true,
	// 		values: {},
	// 		playerTypeName: ["video"],
	// 	}, function() {
	// 		this.refs.objectWindow.show();
	// 	});

	// 	// this.refs.objectList.refs.grid.clearSelection();
	// },

	openAddCamModal: function() {
		this.setState({ isAddCamModalOpen: true })
	},

	closeAddCamModal: function() {
		this.setState({ isAddCamModalOpen: false })
	},

	handleSave: function(_values) {
		var self = this;

		var objectList = this.refs.objectList;
		objectList.upsert(_values);

		this.refs.objectList.refs.grid.scrollTop();

		objectList.saveChanges({}, function() {
			// console.log('saveChanges result arg  : ', arguments);
			self.refs.objectWindow.hide();
			self.setState({
				values: {}
			})
		});
		setTimeout(() =>objectList.fetch());
	},

	handleClickExport: function() {
		n.call("object.list", {export: true}, function(err, res) {

			var fileName = "Object.json";
			var btn = document.createElement('a');
			btn.download = fileName;
			btn.textContent = fileName;
			btn.href = 'data:application/json;base64,' +
				window.btoa(unescape(encodeURIComponent(JSON.stringify(res.body, null, 4))));
			btn.click();
			return btn;
		});
	},

	handleSuccessImport: function(err, res) {
		// console.log('import  : ', res);
		// if(res.body.Code == 206) {
		//   n.msg.alert('Import Success', res.body.Message);
		// }else {
		//   n.msg.alert('Import Fail', res.body.Message);
		// }
	},

	_renderObjectWindow(_state) {
		if (!_state.windowShow) return;
		return (
			<ObjectWindow
				ref="objectWindow"
				title={_state.windowTitle}
				values={_state.values}
				onSave={this.handleSave}
				isNameExist={this.isNameExist}
				mode={_state.mode}
			/>
		)
	},

	render: function() {
		const cameras = this.state.cameras;
		
		// map each row
		const cameraList = cameras.map((camera, idx) => {
			return (
				<TableRow 
					key={idx}
					handleDblClickRow={this.handleDblClickRow.bind(this, idx)} 
					camera={camera} 
				/>
			)
		});
		
		return (
			<div id="live-wrapper" className="layout-fit" ref="wrapper">
				<div className="ui segments">
					<div className="ui segment">
						<div className="ui equal width grid">
							<div className="equal width row">
								<div className="column">
									<Icon name="video-camera" className="color-2c405a video-camera-icon" size="large">
										<span className="SOP-List">Cameras</span>
									</Icon>
								</div>
								<div className="column right">
									<AddCameraModal />
									<UploadButton />
									<RefreshButton />
								</div>
							</div>
						</div>
						<table className="ui celled padded fixed striped selectable table">
							<thead className="blue">
								<tr>
									<th className="center aligned"></th>
									<th className="center aligned">CAMERA ID</th>
									<th className="center aligned">NAME</th>
									<th className="center aligned">MD</th>
									<th className="center aligned">GEO</th>
									<th className="center aligned">STATUS</th>
									<th className="center aligned">EVENT</th>
								</tr>
							</thead>
							<tbody>
								{cameraList}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
});

