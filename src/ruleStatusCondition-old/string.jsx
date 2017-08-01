var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';
var NEW_MODE = 'new';

module.exports = React.createClass({
  displayName: 'String',
  getInitialState: function() {
    var values = this.props.values;
    if (!values || values.length == 0)
    {
      values = [{
        'Value':'default',
        'Type':'default',
        'Status':'NORMAL'
      }];
    }

    return {
      values: values
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var values = nextProps.values;
    if (!values || values.length == 0)
    {
      values = [{
        'Value':'default',
        'Type':'default',
        'Status':'NORMAL'
      }];
    }

    this.setState({
      values: values
    });
  },
  /*------------ handler ------------*/
  handleChange: function(comp, val) {
    console.log(comp, val);
    this.state.values[comp.props.itemIndex][comp.props.name] = val;
  },
  handleClick: function() {
    var values = this.state.values;

    values.push({
        'Value':'',
        'Type':'static',
        'Status':'NORMAL'
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
        <div style={{display: 'flex'}} key={i}>
          {this._getChildPair(values[i], i)}
        </div>
      );
    }
    return comps
  },
  _getChildPair: function(values, idx) {
    var child = [];
    console.log("_getChildPair : ", values);
    var ValueKey = "Value_"+idx;
    var TypeKey = "Type_"+idx;
    var StatusKey = "Status_"+idx;
    var AddBtnKey = "AddBtn_"+idx;
    child.push(
      <n.TextField
        style={{flex: 1}}
        key={ValueKey}
        itemIndex = {idx}
        width="100%"
        labelWidth={80}
        layout="float"
        value={values.Value}
        name="Value"
        onChange={this.handleChange}
        readOnly={(this.props.mode == VIEW_MODE) || values.Value === 'default'}
      />
    );
    child.push(
      <n.Select
        style={{flex: 1, marginLeft: 5, width: "40px"}}
        key={TypeKey}
        itemIndex = {idx}
        layout="float"
        value={values.Type}
        name="Type"
        options={['static', 'regex']}
        onChange={this.handleChange}
        readOnly={(this.props.mode == VIEW_MODE) || values.Value === 'default'}
      />
    );
    child.push(
      <n.Select
        style={{flex: 1, marginLeft: 5, width: "40px"}}
        key={StatusKey}
        itemIndex = {idx}
        width={100}
        layout="float"
        name="Status"
        value={values.Status}
        onChange={this.handleChange}
        options={this.props.ruleStatusList}
      />
    );
    child.push(
      <n.Button
        style={{marginLeft: 10}}
        key={AddBtnKey}
        ui="circular"
        icon={"minus"}
        itemIndex={idx}
        onClick={this.handleClickRemove}
        disabled={(this.props.mode == VIEW_MODE) || values.Value === 'default'}
      />
    );
    return child;
  },
  _renderAddBtn: function() {
    if (this.props.mode !== VIEW_MODE) {
      return (
        <div width="100%">
          <n.Button
            ui="circular secondary"
            width="35px"
            style={{float: "right"}}
            icon={"plus"}
            onClick={this.handleClick}
          />
        </div>
      );
    }
    return <div></div>;
  },
  getValues: function()
  {
    return this.state.values;
  },
  /*------------------------------------*/
  render: function(){
    return (
      <n.Form ref="form" labelWidth={70}>
        {this._renderChild(this.state.values)}
        {this._renderAddBtn()}
      </n.Form>
    );
  }
});
