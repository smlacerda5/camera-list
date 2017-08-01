var StatusDetail = require('./detail');
var StatusPanel = require('./myStatusConditionPanel')();

module.exports = React.createClass({
	displayName: "Status Rule",

	getInitialState: function() {
		return {
			mode: 'update',
			windowTitle: '',
			windowShow: false,
			values: {},
		}
	},

	handleSelect: function(plugin, value) {
		console.log("selected");
		console.log(value.dataItem);
		this.setState({
			mode: 'update',
			windowTitle: '',
			values: value.dataItem,
			windowShow: false
		});
	},

	handleClickNewBtn: function() {
		this.setState({
			mode: 'new',
			windowTitle: '',
			values: {Type: 'boolean'},
			windowShow: false
		});

		this.refs.ruleStatusList.refs.grid.scrollTop();
		this.refs.ruleStatusList.refs.grid.clearSelection();
	},

	handleClickCopyBtn: function() {
		var self = this;
		var values = JSON.parse(JSON.stringify(this.state.values));
		if (self.state.mode === 'new') return;
		if (values.Name.trim() == '') return n.notification.info('Select the item you want to copy first');
		var ruleStatusList = this.refs.ruleStatusList;
		var targetCopyName = values.Name + "_Copy";
		var count = 1;

		function checkNameExist(_list, _name) {
			var isExist = false;

			for (var i = 0; i < _list.length; i++) {
				if (_list[i].Name == _name) {
					isExist = true;
					count++;
					break;
				}
			}
			return isExist;
		}

		var compareName = targetCopyName;
		while (checkNameExist(ruleStatusList.data.list, compareName)) {
			compareName = (count == 1) ? targetCopyName : targetCopyName + count;
		}

		values.Name = (count > 1) ? targetCopyName + count : targetCopyName;
		ruleStatusList.upsert(values);
		this.refs.ruleStatusList.refs.grid.scrollTop();
		ruleStatusList.saveChanges({}, function() {
			console.log("saveChanges done");
			self.refs.ruleStatusList.fetch();
		});
	},

	handleClickDelete: function() {
		var self = this;
		var selected = this.refs.ruleStatusList.refs.grid.getSelected();

		if (selected.length == 0) {
            return  n.notification.info('Select the item you want to remove first');
		}

		var Names = [];
		for (var k in selected) {
			var item = selected[k];
			Names.push(item.Name);
		}

		var confirmMessage = 'Are you sure you want to remove ' + Names.length + ' of Status Rules?';
		n.msg.confirm('Remove Status Rule', confirmMessage, function(_approve) {
			console.log("result: " + _approve);
			if (_approve) {
				self.refs.ruleStatusList.refs.grid.scrollTop();

				n.call("ruleStatusCondition.remove", {Names: Names},
					function(_err, _res) {
						console.log(_res);
						self.refs.ruleStatusList.fetch();
						self.setState({values: {}});
					}
				);
			}
		});
		//console.log(this.refs.ruleStatusList);
		//console.log(this.refs.ruleStatusList.refs.grid.getSelected());
		/*
		 var checked = this.refs.ruleStatusList.refs.grid.getChecked();
		 var Names = [];
		 for(var k in checked)
		 {
		 var item = checked[k];
		 Names.push(item.Name);
		 }
		 console.log(Names);
		 */
	},

	handleClickExport: function() {
		n.call("ruleStatusCondition.list", {export: true}, function(err, res) {
			console.log(res);
			var fileName = "ruleStatusCondition.json";
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
		console.log(res);
		// console.log('import  : ', res);
		if (res.statusCode == 200) {
			n.notification.info('Import Success');
			//this.refs.ruleStatusList.fetch();
		} else {
			n.msg.alert('Import Fail', res.body.Message);
		}
	},

	handleSave: function(_values) {
		var self = this;
		this.refs.ruleStatusList.upsert(_values);
		this.refs.ruleStatusList.saveChanges({}, function() {
			self.fetch();
		});
		this.setState({
			mode: 'update',
			values: {}
		})
	},

	handleSearch() {
		this.refs.ruleStatusList.refs.grid.scrollTop();
	},

	isNameExist: function(objName) {
		var result = false;
		var listData = this.refs.ruleStatusList.data.list;
		listData.map((item)=> {
			if (item.Name == objName) {
				result = true;
			}
		});
		return result;
	},

	render: function() {
		return (
			<div className="layout-fit status-rule" ref="wrapper">
				<n.FlexLayout direction="horizontal">
					<n.Box flex={1} className="layout-fit">
						<n.FlexLayout >
							<StatusPanel
								title="Status Rule"
								selectable="multiple row"
								flex={1}
								rowCheckable={true}
								columns={[
									{field: 'Name', title: 'Name'},
									{field: 'Type', title: 'Type'},
								]}
								ref="ruleStatusList"
								searchField="Name"
								onSearch={this.handleSearch}
								onCellClick={this.handleSelect}
								buttons={[
									<n.Button text="New" onClick={this.handleClickNewBtn}/>,
									<n.Button text="Copy" onClick={this.handleClickCopyBtn}/>,
									<n.Button text="Remove" onClick={this.handleClickDelete}/>,
									<div key="sepaarate"
									     style={{height: "100%", background: "#ddd", width: 1, margin: "0 0.6em 0 0.3em"}}/>,
									<n.FileUpload
										text="Import"
										protocol="socket"
										url="ruleStatusCondition.upsert"
										ui="primary"
										onSuccess={this.handleSuccessImport}
									/>,
									<n.Button text="Export" ui="primary" onClick={this.handleClickExport}/>
								]}
							/>
						</n.FlexLayout>
					</n.Box>

					<n.Panel flex={1} fit={true} title="Status Condition Detail">
						<n.FlexLayout direction="vertical">
							<StatusDetail
								ref="statusDetail"
								flex={1}
								mode={this.state.mode}
								values={this.state.values}
								onSave={this.handleSave}
								isNameExist={this.isNameExist}
							/>
						</n.FlexLayout>
					</n.Panel>
				</n.FlexLayout>
			</div>
		);
	}
});
