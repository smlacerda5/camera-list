var StatusDetail = require('./detail');
var StatusPanel = require('./myStatusPanel')();

module.exports = React.createClass({
	displayName: "Status",

	getInitialState: function() {
		return {
			mode: 'update',
			windowTitle: '',
			windowShow: false,
			values: {},
            usingRule:""
		}
	},

	componentDidMount:function(){
		this.getUsingStatus();
	},

	getUsingStatus: function(){
        var me = this;
        var usingRuleArray = [];
        n.call('ruleStatusCondition.list',{},function(_err, _res){
            _.forEach(_res.body, function(item){
                _.forEach(item.Conditions, function(obj){
                    usingRuleArray.push(obj.Status);
                })
            });
            me.setState({'usingRule':_.uniq(usingRuleArray)});
        });
	},

	isNameExist: function(value) {
		var nameExist = false;
		var statusList = this.refs.ruleStatusList.data.list;
		statusList.map((item)=> {
			if (item.name == value) {
				nameExist = true;
			}
		});
		return nameExist;
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
			values: {},
			windowShow: false
		});

		this.refs.ruleStatusList.refs.grid.scrollTop();
		this.refs.ruleStatusList.refs.grid.clearSelection();
	},

	handleClickCopyBtn: function() {
		var self = this;
		var values = JSON.parse(JSON.stringify(this.state.values));
		if (values.name.trim() == '') return n.notification.info('Select the item you want to copy first');
		var ruleStatusList = this.refs.ruleStatusList;
		var targetCopyName = values.name + "_Copy";
		var count = 1;

		function checkNameExist(_list, _name) {
			var isExist = false;

			for (var i = 0; i < _list.length; i++) {
				if (_list[i].name == _name) {
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
			if(_.includes(self.state.usingRule, item.name)){
                n.notification.info('Status "'+ item.name +'" is in use by Status Rules');
                return;
			}
			Names.push(item.name);
		}

		var confirmMessage = 'Are you sure you want to remove ' + Names.length + ' of Statuses?';
		n.msg.confirm('Remove Status', confirmMessage, function(_approve) {
			console.log("result: " + _approve);
			if (_approve) {
				self.refs.ruleStatusList.refs.grid.scrollTop();
				n.call("ruleStatus.remove", {Names: Names},
					function(_err, _res) {
						console.log(_res);
						self.refs.ruleStatusList.fetch();
						self.setState({
							mode: 'update',
							windowTitle: '',
							values: {},
							windowShow: false
						});
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
		n.call("ruleStatus.list", {export: true}, function(err, res) {
			var fileName = "RuleStatus.json";
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
			this.refs.ruleStatusList.fetch();
		} else {
			n.msg.alert('Import Fail', res.body.Message);
		}
	},

	handleSearch() {
		this.refs.ruleStatusList.refs.grid.scrollTop();
	},

	handleSave: function(_values) {
		var self = this;
		_values.name = _values.name.trim();
		this.refs.ruleStatusList.upsert(_values);
		this.refs.ruleStatusList.saveChanges({}, function() {
			//self.fetch();
			self.setState({
				mode: 'update',
				windowTitle: '',
				values: {},
				windowShow: false
			});
		});
	},

	render: function() {
		return (
			<div className="layout-fit" ref="wrapper">
				<n.FlexLayout direction="horizontal">
					<n.Box flex={3} className="layout-fit">
						<n.FlexLayout >
							<StatusPanel
								title="Status"
								selectable="multiple row"
								flex={1}
								rowCheckable={true}
								columns={[
									{field: 'name', title: 'Name'},
									{field: 'label', title: 'Label'},
									{field: 'weight', title: 'Weight'},
									{field: 'blink', title: 'Blink'},
									{field: 'color', title: 'Color'},
									{field: 'comment', title: 'Description'}
								]}
								ref="ruleStatusList"
								searchField="name"
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
										url="ruleStatus.upsert"
										ui="primary"
										onSuccess={this.handleSuccessImport}
									/>,
									<n.Button text="Export" ui="primary" onClick={this.handleClickExport}/>
								]}
							/>
						</n.FlexLayout>
					</n.Box>

					<n.Panel flex={2} fit={true} title="Status Detail">
						<n.FlexLayout direction="vertical">
							<StatusDetail
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
