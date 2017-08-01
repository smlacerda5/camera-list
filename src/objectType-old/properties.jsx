var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';
var NEW_MODE = 'new';

module.exports = React.createClass({
  displayName: 'Relations',
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
    if (values != undefined)
    {
      var keys = Object.keys(values);
      for(var idx in keys)
      {
        var key = keys[idx];
        var type = values[key].Type;
        var val = values[key].Default;
        result.push({
          'Name':key,
          'Type':type,
          'Value':val
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
      'Name':'',
      'Type':'Text',
      'Values':[]
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
      <tr key={values.Name+Math.floor(Date.now())}>
        <td>
          <n.TextField
            style={{flex: 1}}
            key={"Name_"+idx}
            itemIndex = {idx}
            width="100%"
            labelWidth={80}
            layout="float"
            value={values.Name}
            name="Name"
            onChange={this.handleChange}
            readOnly={true}
            disabled={true}
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
      var Type = this.state.values[idx].Type;
      var Value = this.state.values[idx].Value;
      result[Name] = {
        Type:Type,
        Default:Value
      }
    }
    return result;
  },
  /*------------------------------------*/
  render: function(){
    return (
      <n.Panel title="Properties" collapsible={true} ui="property">
      <div>
        <table className="ui celled table unstackable">
          <thead>
            <tr>
              <th width="100%">Name</th>
            </tr>
          </thead>
          <tbody>
          {this._renderChild(this.state.values)}
          </tbody>
        </table>
        </div>
      </n.Panel>
    );
  }
});
