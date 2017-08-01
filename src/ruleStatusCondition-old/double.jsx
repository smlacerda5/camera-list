var _ = require('lodash');
var ComboBox = require('./combobox');

module.exports = React.createClass({
	displayName: 'Double',

	getInitialState: function() {
		var values = this.props.values;
        var status = (this.props.ruleStatusList.length > 0)? this.props.ruleStatusList[0] : "";
		if (!values || values.length == 0) {
			values = [{
				'LeftThresold': '0',
				'LeftOperation': '<=',
				'RightOperation': '<',
				'RightThresold': '100',
				'Status': status
			}];
			this.rowNumberList = [1];
		}

		return {
			values: values
		}
	},

	componentWillReceiveProps: function(nextProps) {
		var values = nextProps.values;
        var status = (this.props.ruleStatusList.length > 0)? this.props.ruleStatusList[0] : "";
		if (!values || values.length == 0) {
			values = [{
				'LeftThresold': '0',
				'LeftOperation': '<=',
				'RightOperation': '<',
				'RightThresold': '100',
				'Status': status
			}];
			this.rowNumberList = [1];
		}

		this.setState({
			values: values
		})
	},

	handleChange: function(comp, val) {
		var values = this.state.values;

		if (comp.props.name === "Priority") {
			var item = this.state.values[comp.props.itemIndex];
			values.splice(comp.props.itemIndex, 1);
			values.splice(val - 1, 0, item);
			this.setState({
				values: values
			});
			comp.refs.text.innerText = this.rowNumberList[comp.props.itemIndex];
			comp.refs.menu.children[comp.props.itemIndex].setAttribute('class', 'item active selected');
			comp.refs.menu.children[val - 1].setAttribute('class', 'item');
		} else {
			console.log("rulePanel :", this.refs.rulePanel);
			this.state.values[comp.props.itemIndex][comp.props.name] = val;
			var LeftOperation = this.state.values[comp.props.itemIndex]["LeftOperation"];
			var RightOperation = this.state.values[comp.props.itemIndex]["RightOperation"];
			if ((LeftOperation === "==" && RightOperation !== "") ||
					((LeftOperation === ">" || LeftOperation === ">=") && (RightOperation === "<" || RightOperation === "<=")) ||
					((LeftOperation === "<" || LeftOperation === "<=") && (RightOperation === ">" || RightOperation === ">="))) {
				this.refs.rulePanel.children[comp.props.itemIndex].children[4].children[0].getElementsByTagName('div')[1].style.borderColor = "red";
			} else {
				this.refs.rulePanel.children[comp.props.itemIndex].children[4].children[0].getElementsByTagName('div')[1].style.borderColor = "";
			}
		}
	},

	handleClickAdd: function(comp) {
		var values = this.state.values;
        var status = (this.props.ruleStatusList.length > 0)? this.props.ruleStatusList[0] : "";
		values.push({
			'LeftThresold': '',
			'LeftOperation': '<=',
			'RightOperation': '<',
			'RightThresold': '',
			'Status': status
		});

		this.updateRowNumberList();
		this.setState({
			values: values
		})
	},

	componentWillMount: function() {
		this.updateRowNumberList();
	},

	updateRowNumberList: function() {
		this.rowNumberList = [];
		for (var n = 0; n < this.state.values.length; n++) this.rowNumberList.push(n + 1);
	},

	handleClickRemove: function(comp) {
		var values = this.state.values;
		values.splice(comp.props.itemIndex, 1);
		this.updateRowNumberList();
		this.setState({values: values});
	},

	_renderRow(values, idx) {
        this.updateRowNumberList();
		return (
			<tr key={idx}>
				<td>
					<ComboBox key={"Priority_" + idx} width="100%" options={this.rowNumberList} name="Priority" value={this.rowNumberList[idx]}
					          itemIndex={idx} onChange={this.handleChange}/>
				</td>
				<td>
					<n.TextField key={"LeftThresold_" + idx} width="100%" name="LeftThresold" value={values.LeftThresold || "0"}
					             itemIndex={idx} onChange={this.handleChange} style={{marginBottom: '10px'}}/>
				</td>
				<td>
					<ComboBox key={"LeftOperation_" + idx} width="100%" options={["<", "<=", "==", "!=", ">=", ">"]}
					          name="LeftOperation" value={values.LeftOperation} itemIndex={idx} onChange={this.handleChange}/>
				</td>
				<td></td>
				<td>
					<ComboBox key={"RightOperation_" + idx} width="100%" options={["", "<", "<=", "==", "!=", ">=", ">"]}
					          name="RightOperation" value={values.RightOperation} itemIndex={idx} onChange={this.handleChange}/>
				</td>
				<td>
					<n.TextField key={"RightThresold_" + idx} width="100%" name="RightThresold"
					             value={values.RightThresold || "0"} itemIndex={idx} onChange={this.handleChange}
					             style={{marginBottom: '10px'}}/>
				</td>
				<td>
					<ComboBox key={"Status_" + idx} width="100%" options={this.props.ruleStatusList} name="Status"
					          value={values.Status} itemIndex={idx} onChange={this.handleChange}/>
				</td>
				<td>
					<n.Button
						key={"MinusBtn_" + idx}
						style={{marginLeft: 0}}
						ui="circular"
						icon={"minus"}
						itemIndex={idx}
						onClick={this.handleClickRemove}
					/>
				</td>
			</tr>
		);
	},

	_renderChild: function(values) {
		var comps = [];

		//console.log("_renderChild:", values.length, values);

		for (var i = 0; i < values.length; i++) {
			comps.push(this._renderRow(values[i], i));
		}
		return comps
	},

	getValues: function() {
		return this.state.values;
	},

	render: function() {
		return (
			<table className="ui celled table unstackable" style={{fontSize: '0.9em', marginLeft: 10, marginRight: 10, width: '97%'}}>
				<thead style={{textAlign: "center"}}>
				<tr>
					<th width="40px">Priority</th>
					<th width="20%">Threshold</th>
					<th width="10%">Operation</th>
					<th width="30px">Value</th>
					<th width="10%">Operation</th>
					<th width="20%">Threshold</th>
					<th width="20%">Status</th>
					<th width="5%">&nbsp;</th>
				</tr>
				</thead>
				<tbody ref="rulePanel">
				{this._renderChild(this.state.values)}
				<tr>
					<td colSpan="8">
						<n.Button
							key="Circular_Plus"
							ui="circular secondary"
							style={{float: "right"}}
							icon={"plus"}
							onClick={this.handleClickAdd}
						/>
					</td>
				</tr>
				</tbody>
			</table>
		)
	}
});
