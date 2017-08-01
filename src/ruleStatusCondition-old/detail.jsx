var MetricPanel = require('./metricPanel');
var Toolbar = require('./../ui/toolbar');
var ComboBox = require('./combobox');

var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';

module.exports = React.createClass({
	displayName: 'StatusCondition Detail',
	getInitialState: function() {
		return {
			values: this.props.values,
			btnDisabled: true
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.values.Name != undefined) {
			if (nextProps.values.Name != '') {
				this.setState({
					btnDisabled: false,
					values: nextProps.values
				});
			}
		} else {
			this.setState({
				btnDisabled: true,
				values: nextProps.values
			});
		}
	},
	handleClickSave: function() {
		var isValid = true;
		var formValues = this.state.values;
		if (formValues.Name.trim() == '') {
			isValid = false;
			this.refs.objTypeName.setError(true, 'Please insert the name of Object Type');
			return;
		}
		if (formValues.Type == undefined) {
			isValid = false;
			this.refs.comBox_objType.setError(true, 'Please select one of Types');
			return;
		}

		if (this.props.mode != 'update') {
			let isNameExist = this.props.isNameExist(formValues.Name);
			if (isNameExist) {
				isValid = false;
				this.refs.objTypeName.setError(true, 'The name "' + formValues.Name + '" already exists');
				return;
			}
		}
		if (!isValid) return;

		//console.log(this.refs.form.getValues());
		//this.props.onSave(this.refs.form.getValues());
		//var values = this.refs.config.getValues();

		formValues.Conditions = this.refs.config.getValues();
		console.log("handleClickSave:", formValues);


		switch (formValues.Type) {
			case "double":
				for (var idx in formValues.Conditions) {
					var LeftOperation = formValues.Conditions[idx].LeftOperation;
					var RightOperation = formValues.Conditions[idx].RightOperation;
					if (
						(LeftOperation === "==" && RightOperation !== "") ||
						( (LeftOperation === ">" || LeftOperation === ">=") && (RightOperation === "<" || RightOperation === "<=") ) ||
						( (LeftOperation === "<" || LeftOperation === "<=") && (RightOperation === ">" || RightOperation === ">=") )
					) {
						n.notification.error('Operation pair is not correct!');
						return;
					}
					if(formValues.Conditions[idx].Status === ""){
                        n.notification.error('Status Rule must have a Rule');
                        return;
					}
				}
				break;
			case "string":
				break;
			case "boolean":
				break;
		}

		this.props.onSave(formValues);
		this.setState({btnDisabled: true});
	},
	// handleClickNewBtn: function() {
	//   this.setState({values:{Type:'', Conditions:[]}});
	// },
	componentWillMount: function() {
		var self = this;
		n.call("ruleStatus.list", {export: true}, function(err, res) {

			console.log("Just Once Called");
			self.ruleStatusList = [];
			for (var k in res.body) {
				self.ruleStatusList.push(res.body[k].name);
			}
			self.setState((self.state) ? self.state.values : {});
		});
	},
	componentDidUpdate: function() {

	},
	handlComBoxChange: function(comp, val) {
		console.log("Detail Changed: ", comp, "val:", val);
		var values = this.state.values;
		values.Type = val;
		this.setState({values: values});
	},
	handleTxtNameChange: function(_comp, _value) {
		var me = this;
		var stateVal = this.state.values;
		if (stateVal.Name != undefined) {
			let isNameExist = me.props.isNameExist(stateVal.Name.trim());
			if(isNameExist){
				me.refs.objTypeName.setError(true, 'The name "'+ stateVal.Name +'" already exists.');
			}else{
				me.refs.objTypeName.setError(false);
			}
			if (stateVal.Name != '' && !isNameExist) this.setState({btnDisabled: false});
		}
	},
	render: function() {
		return (
			<n.FlexLayout direction="vertical">
				<n.Form ref="form" values={this.state.values} readOnlyAll={false}>
					<n.TextField
						ref="objTypeName"
						label="Name"
						name="Name"
						width="100%"
						required={true}
						readOnly={this.props.mode == 'update' ? true : false}
						onChange={this.handleTxtNameChange}
					/>
					<ComboBox
						ref="comBox_objType"
						label="Type"
						name="Type"
						value={this.state.values.Type}
						options={["boolean", "double", "string"]}
						onChange={this.handlComBoxChange}
						readOnly={this.props.mode == 'update' ? true : false}
					/>
				</n.Form>
				<MetricPanel
					ref="config"
					mode={EDIT_MODE}
					name="Conditions"
					StatusType={this.state.values.Type}
					conditions={this.state.values.Conditions}
					ruleStatusList={this.ruleStatusList}
				/>

				<div style={{marginTop: 13}}>
					<n.Button
						text="Save"
						onClick={this.handleClickSave}
						style={{float: "right", marginRight: '11px' }}
						disabled={this.state.btnDisabled}
						ui="primary"
					/>
				</div>
			</n.FlexLayout>
		)
	}
});
