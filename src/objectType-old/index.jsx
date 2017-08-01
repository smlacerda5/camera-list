var DetailPanel = require('./detail');
var ListPanel = require('./listPanel')();

module.exports = React.createClass({
	displayName: "Object Type",

	getInitialState: function() {
		this.objectTypeList = [];
        this.toList=[];
        this.fromList=[];
		return {
			values: {}
		}
	},

	handleSelect: function(plugin, value) {
		console.log("selected");
		console.log(value.dataItem);
		this.setState({
			values: value.dataItem,
		});
	},

	handleClickNewBtn: function() {
		this.setState({
			values: {}
		});

		this.refs.listPanel.refs.grid.scrollTop();
		this.refs.listPanel.refs.grid.clearSelection();
	},

	handleClickCopyBtn: function() {
		var self = this;
		var values = JSON.parse(JSON.stringify(this.state.values));
		if (values.Name.trim() == '') return n.notification.info('Select the item you want to copy first');
		var listPanel = this.refs.listPanel;
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
		while (checkNameExist(listPanel.data.list, compareName)) {
			compareName = (count == 1) ? targetCopyName : targetCopyName + count;
		}
		values.Name = (count > 1) ? targetCopyName + count : targetCopyName;


		listPanel.upsert(values);

		this.refs.listPanel.refs.grid.scrollTop();

		listPanel.saveChanges({}, function() {
			console.log("saveChanges done");
			//self.refs.listPanel.fetch();
		});
	},

	handleClickDelete: function() {
		var self = this;
		var selected = this.refs.listPanel.refs.grid.getSelected();

		if (selected.length == 0) {
            return  n.notification.info('Select the item you want to remove first');
		}

		var Names = [];
		for (var k in selected) {
			var item = selected[k];
			Names.push(item.Name);
		}

        var confirmMessage = 'Are you sure you want to remove ' + Names.length +' of Object Types?';
		n.msg.confirm('Remove Object Type', confirmMessage, function(_approve) {
			console.log("result: " + _approve);
			if (_approve) {
				self.refs.listPanel.refs.grid.scrollTop();

				n.call("objectType.remove", {Name: Names},
					function(_err, _res) {
						console.log(_res);
						self.refs.listPanel.fetch();
					}
				);
			}
		});
	},

	handleClickExport: function() {
		n.call("objectType.list", {export: true}, function(err, res) {

			var fileName = "ObjectType.json";
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
		if (res.statusCode == 200) {
			n.notification.info('Import Success');
			this.refs.listPanel.fetch();
		} else {
			n.msg.alert('Import Fail', res.body.Message);
		}
	},

	handleSave: function(_values) {
		var self = this;
		this.refs.listPanel.upsert(_values);
		this.refs.listPanel.saveChanges({}, function() {
            self.refs.listPanel.fetch();
		});
	},

	dataBinder: function(items) {
		var self = this;
		console.log("dataBinder:", items);
		var newObjectTypeList = [];
        
		for (var k in items) {
			newObjectTypeList.push(items[k].Name);
		}
		if (newObjectTypeList.length != 0 && this.objectTypeList.length == 0) {
			this.objectTypeList = newObjectTypeList;
			console.log("replace objectTypeList");
			setTimeout(function() {
				self.setState({});
			}, 100);
		}
	},

	updateRuleStatus: function() {
		var self = this;
		n.call("ruleStatus.list", {export: true}, function(err, res) {
			self.ruleStatus = {};    
			for (var k in res.body) {
				self.ruleStatus[res.body[k].name] = res.body[k];
			}
			self.updateRuleStatusCondition();
		});
	},

	updateRuleStatusCondition: function() {
		var self = this;
		n.call("ruleStatusCondition.list", {export: true}, function(err, res) {
			self.ruleStatusConditionList = [];
			self.ruleStatusCondition = {};
			console.log("self.ruleStatus", self.ruleStatus);
			for (var k in res.body) {
				self.ruleStatusConditionList.push(res.body[k].Name);
				self.ruleStatusCondition[res.body[k].Name] = res.body[k];
				for (var k2 in self.ruleStatusCondition[res.body[k].Name].Conditions) {
					var condition = self.ruleStatusCondition[res.body[k].Name].Conditions[k2];
					if (condition.Status) {
						console.log("condition.Status", condition.Status);
						condition.Status = {
							"status": condition.Status,
							"weight": self.ruleStatus[condition.Status].weight
						};
						console.log(res.body[k].Name, k2);
					}
				}
			}
			console.log("updateRuleStatusCondition: ", self.ruleStatusCondition);
			self.setState((self.state) ? self.state.values : {});
		});
	},

	handleSearch() {
		this.refs.listPanel.refs.grid.scrollTop();
	},

	componentWillMount: function() {
		this.updateRuleStatus();
	},

	componentDidUpdate: function() {
		console.log("componentDidUpdate");
	},

	render: function() {
        console.log("************************************");
        console.log(this.state.values);
		return (
			<div className="layout-fit" ref="wrapper">
				<n.FlexLayout direction="horizontal">
					<n.Box flex={3} className="layout-fit">
						<n.FlexLayout >
							<ListPanel
								title="Object Type"
								selectable="multiple row"
								flex={1}
								rowCheckable={true}
								columns={[
									{field: 'Name', title: 'Name'},
									{field: 'Description', title: 'Description'}
								]}
								ref="listPanel"
								searchField="Name"
								onSearch={this.handleSearch}
								onCellClick={this.handleSelect}
								dataBinder={this.dataBinder}
								buttons={[
									<n.Button text="New" onClick={this.handleClickNewBtn}/>,
									<n.Button text="Copy" onClick={this.handleClickCopyBtn}/>,
									<n.Button text="Remove" onClick={this.handleClickDelete}/>,
									<div key="sepaarate"
									     style={{height: "100%", background: "#ddd", width: 1, margin: "0 0.6em 0 0.3em"}}/>,
									<n.FileUpload
										text="Import"
										protocol="socket"
										url="objectType.upsert"
										ui="primary"
										onSuccess={this.handleSuccessImport}
									/>,
									<n.Button text="Export" ui="primary" onClick={this.handleClickExport}/>
								]}
							/>
						</n.FlexLayout>
					</n.Box>

					<n.Panel flex={2} fit={true} title="Detail">
						<n.FlexLayout direction="vertical">
							<DetailPanel
								flex={1}
								values={this.state.values}
								objectTypeList={this.objectTypeList}
                                toList={this.toList}
                                fromList={this.fromList}
								ruleStatusConditionList={this.ruleStatusConditionList}
								ruleStatusCondition={this.ruleStatusCondition}
								onSave={this.handleSave}
                            
							/>
						</n.FlexLayout>
					</n.Panel>
				</n.FlexLayout>
			</div>
		);
	}
});
