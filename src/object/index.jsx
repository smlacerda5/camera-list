var ObjectWindow = require('./_deprecated_window');
var UploadButton = require('../components/btn-upload');
var RefreshButton = require('../components/btn-refresh');

import { Icon } from 'semantic-ui-react';
import AddCameraModal from "../components/modal-add-camera";
import Table from './table';

var Toolbar = require('./../ui/toolbar');

module.exports = React.createClass({
	displayName: "Object",

	getInitialState: function() {
		this.getData();

		return {
			mode: '',
			windowTitle: '',
			windowShow: false,
			values: {},
			data: [],
			sortBy: 'Name',
			sortDirection: true,
		}
	},

	// call web server to get data
	getData: function() {
		n.call("object.list", {export: false, query: {PlayerTypeName: 'video'}}, (err, res) => {
			var results=res.body

			const scrubbedData = this.scrubData(results);

			this.setState({data: scrubbedData});
		});
	},

	// take the raw data from the web server and put it into
	// the format we expect
	scrubData: function(rawData, cb) {
		let scrubbedData = rawData.map((object, idx) => {
			let { mediaserver = [] } = object.Relations;
			let { latitude = [0], longitude = [0] } = object.Properties;
			let { Relations = {}, Properties = {} } = object;
			
			return {
				label: object.Label || '',
				name: object.Name || '',
				description: object.Description || '',
				mediaserver: mediaserver[0] || '',
				geo: `${latitude[0] || 0}, ${longitude[0] || 0}`,
				status: '',
				event:  '',
				objectTypeName: object.ObjectTypeName || '',
				relations: Relations,
				properties: Properties,
			}
		});

		if (cb) {
			cb(scrubbedData);
			return;
		}

		return scrubbedData;
	},

	// push one item to the data array, so we don't have to call
	// the entire data set all over again
	addData: function(rawData) {
		this.scrubData([rawData], (scrubbedData = []) =>  {
			this.setState( {
				data: this.state.data.concat(scrubbedData[0]) 
			});
		});
	},

	// sort data onClick of table headers, be sure that data-sortField in th
	// is an exact match to the data you're sorting
	sortData: function(e) {
		const field = e.target.dataset.sortfield || '';
		const sortDirection = this.state.sortDirection;

		const sortedData = this.state.data.sort((objectA, objectB) => {
			const obj1 = objectA[field];
			const obj2 = objectB[field];
			let sortVal = 0;

			if (obj1 < obj2) {
				sortVal = 1;
			} else if (obj1 > obj2) {
				sortVal = -1; 
			}
			if (sortVal !== 0 && sortDirection === true) {
				sortVal = sortVal * -1;
			}
			return sortVal;
		});

		this.setState({ data: sortedData, sortDirection: !this.state.sortDirection });
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
		this.state.data[idx].checked = true;

		this.setState({
			mode: 'edit',
			windowTitle: 'Edit Object',
			windowShow: true,
			values: this.state.data[idx],
			data: this.state.data,
		}, function() {
			this.forceUpdate();
			this.refs.objectWindow.show();
		});
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
		return (
			<div id="camera-list-module">
				<div id="live-wrapper" className="layout-fit" ref="wrapper" style={{background: "#e2e2e2"}}>
					<div className="ui segments">
						<div className="ui segment">
							<div className="ui equal width grid">
								<div className="equal width row module-header">
									<div className="column module-header-label">
										<Icon name="video-camera" className="video-camera-icon" size="large" style={{color: "#2c405a", paddingLeft: "0"}}>
											<span className="SOP-List" style={{paddingLeft: "5px"}}>Cameras</span>
										</Icon>
									</div>
									<div className="column module-header-btn-group" style={{textAlign: "right"}}>
										<AddCameraModal addData={this.addData} />
										<UploadButton />
										<RefreshButton refresh={this.getData} />
									</div>
								</div>
							</div>
							<Table 
								data={this.state.data} 
								headers={[
									{ label: '', keyName: '' }, // match keyName to this.state.data field name (be careful of caps)
									{ label: 'NAME', keyName: 'name', sortable: true },
									{ label: 'LABEL', keyName: 'label', sortable: true },
									{ label: 'MD', keyName: 'mediaserver', sortable: true },
									{ label: 'GEO', keyName: 'geo' },
									{ label: 'STATUS', keyName: 'status' },
									{ label: 'EVENT', keyName: 'event' },
									{},
								]}
								sorter={this.sortData} 
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});