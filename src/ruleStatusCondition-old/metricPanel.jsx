var Unchangeable =  require('./unchangeable');
var Bool = require('./bool');
var Int = require('./int');
var Dbl = require('./double');
var Str = require('./string');
var Datetime = require('./datetime');

var VIEW_MODE = 'view';

module.exports = React.createClass({
  displayName: 'MetricPanel',
  getInitialState: function() {
    return {
      values: this.props.conditions,
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      values: nextProps.conditions
    })
  },
  _renderCondition: function(values) {

    // console.log('_metric.Config    : ', _metric.Config);

    console.log("this.props.StatusType", this.props.StatusType);
    console.log("value:", values);

    var comp;
    switch (this.props.StatusType) {
      case 'boolean': comp = <Bool ref="boolean" values={values} mode={this.props.mode} ruleStatusList={this.props.ruleStatusList}/>; break;
      case 'double': comp = <Dbl ref="double" values={values} mode={this.props.mode} ruleStatusList={this.props.ruleStatusList}/>; break;
      case 'string': comp = <Str ref="string" values={values} mode={this.props.mode} ruleStatusList={this.props.ruleStatusList}/>; break;
      default : comp = <div></div>; break;
    }
    return comp;
  },
  getValues: function()
  {
    return this.refs[this.props.StatusType].getValues();
  },
  render: function() {

    console.log('this.state.values   : ', this.state.values);

    return (
      <n.Box>

        {this._renderCondition(this.state.values)}

      </n.Box>
    )
  }
});
