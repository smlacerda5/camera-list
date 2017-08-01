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
      metric: this.props.metric,
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      metric: nextProps.metric
    })
  },
  
  handleChangeSelect: function(comp, val) {
    this.props.onChange(this, val, this.props.name);
  },

  _renderMetric: function(_metric) {

    // console.log('_metric.Config    : ', _metric.Config);

    var metric;
    switch (_metric.DataType) {
      // case ''
      case 'unknown': metric = <Unchangeable />; break;
      case 'boolean': metric = <Bool config={_metric.Config} mode={this.props.mode} />; break;
      case 'double': metric = <Dbl config={_metric.Config} mode={this.props.mode} />; break;
      case 'string': metric = <Str config={_metric.Config} mode={this.props.mode} />; break;
      // case 'datetime': metric = <Datetime />; break;
    }
    return metric;
  },

  render: function() {

    // console.log('this.state.metric   : ', this.state.metric);

    return (
      <n.Panel
        ui="small"
        title={this.props.name}
        style={{margin: '0 auto 5px'}}
      >

        <n.Select
          key="select"
          label="type"
          width={190}
          labelWidth={80}
          options={[ "unknown", "boolean", "double", "string", "datetime" ]}
          value={this.state.metric.DataType}
          onChange={this.handleChangeSelect}
          style={{marginBottom: 10}}
          readOnly={this.props.mode == VIEW_MODE}
        />

        {this._renderMetric(this.state.metric)}

      </n.Panel>
    )
  }
});