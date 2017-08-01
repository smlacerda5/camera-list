var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';
var NEW_MODE = 'new';

module.exports = React.createClass({
  displayName: 'Metrics',
  getInitialState: function() {
    return {
      values: this.updateValues(this.props.values)
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      values: this.updateValues(nextProps.values)
    });
  },
  updateValues: function(values)
  {
    var result = [];
    if (!values || values.length == 0)
    {
      result = [{
        'Name':'Sample1',
        'Value':''
      }];
    } else {
      var keys = Object.keys(values);
      for(var idx in keys)
      {
        var key = keys[idx];
        var val = values[key].StatusConditionName;
        result.push({
          'Name':key,
          'Value':(val)?val:''
        })
      }
    }

    return result;
  },
  /*------------ handler ------------*/
  handleChange: function(comp, val) {
    console.log(comp, val);
    this.state.values[comp.props.itemIndex][comp.props.name] = val;
  },
  handleAddBtnClick: function() {
    var values = this.state.values;

    values.push({
      'Name':'Sample1',
      'Value':'Sample2'
      });

    this.setState({
      values: values
    })
  },
  handleClickRemove: function(comp) {
    console.log("Remove => " + comp.props.itemIndex);
    var values = this.state.values;
    console.log("handleClickRemove:", values);
    values.splice(comp.props.itemIndex, 1);
    /*var strNum = (comp.props.removeIndex<10)?('0'+comp.props.removeIndex):comp.props.removeIndex;
    delete values["Value_" + strNum];
    delete values["Type_" + strNum];
    delete values["Status_" + strNum];*/
    console.log("handleClickRemove:", values);
    this.setState({ values: values });
  },
  /*------------------------------------*/
  _renderChild: function(values) {
    var comps = [];
    console.log("_renderChild:", values.length, values);
    for(var i=0; i<values.length; i++)
    {
      comps.push(
        this._getChildPair(values[i], i)
      );
    }
    return comps
  },
  _getChildPair: function(values, idx) {
    var child = [];
    console.log("_getChildPair : ", values);
    return (
    <tr key={idx}>
      <td>
      <n.TextField
        style={{flex: 1}}
        width="100%"
        key={"Name_"+idx}
        itemIndex = {idx}
        labelWidth={80}
        layout="float"
        value={values.Name}
        name="Name"
        onChange={this.handleChange}
        readOnly={(this.props.mode == VIEW_MODE)}
      />
      </td>
      <td>
      <n.Select
        style={{flex: 1, marginLeft: 5, width: "40px"}}
        width="100%"
        key={"Value_"+idx}
        itemIndex = {idx}
        layout="float"
        value={values.Value}
        name="Value"
        options={this.props.ruleStatusConditionList}
        onChange={this.handleChange}
        readOnly={(this.props.mode == VIEW_MODE)}
      />
      </td>
      <td>
      <n.Button
        style={{marginLeft: 10}}
        width="100%"
        key={"AddBtn_"+idx}
        ui="circular"
        icon={"minus"}
        itemIndex={idx}
        onClick={this.handleClickRemove}
        disabled={(this.props.mode == VIEW_MODE)}
      />
      </td>
    </tr>
    );
  },
  getValues: function()
  {
    var result = {};
    for(var idx in this.state.values)
    {
      var Name = this.state.values[idx].Name;
      var Value = this.state.values[idx].Value;
      result[Name] = Value;
    }
    return result;
  },
  /*------------------------------------*/
  render: function(){

    //      <div style={{display:"block", height:"300px", overflowY:"auto"}}>

    return (
      <n.Panel title="Metrics" collapsible={true}>
      <div>
        <table className="ui celled table unstackable">
          <thead>
            <tr>
              <th width="45%">Name</th>
              <th width="45%">Type</th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
          {this._renderChild(this.state.values)}
          <tr>
            <td colSpan="3">
              <n.Button
                key="Circular_Plus"
                ui="circular"
                icon={"plus"}
                onClick={this.handleAddBtnClick}
              />
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      </n.Panel>
    );
  }
});
