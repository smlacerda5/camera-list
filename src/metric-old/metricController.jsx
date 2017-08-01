var MetricPanel = require('./metricPanel');

var _forEach = require('lodash/forEach');
var _isEmpty = require('lodash/isEmpty');

module.exports = React.createClass({
  displayName: 'MetricViewController',
  getInitialState: function() {
    return {
      moduleConfig: this.props.moduleConfig || {},
      mode: this.props.mode,
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      moduleConfig: nextProps.moduleConfig,
      mode: nextProps.mode,
    });
  },

  handleChange: function(_comp, type, name) {


    // Todo...
    var defaultMetric = getDefaultMetric();

    _forEach(defaultMetric, function(metric, _type) {
      if (type == _type) {
        // console.log('this.state.moduleConfig.Metric   : ', this.state.moduleConfig.Metric);
        this.state.moduleConfig.Metric[name] = metric;
        this.setState({
          moduleConfig: this.state.moduleConfig
        })
      }
    }.bind(this));
  },

  _renderMetricList: function(_moduleConfig) {

    var metricList = [];

    if(_isEmpty(_moduleConfig)) return metricList;

    _forEach(_moduleConfig.Metric, function(metric, name) {
      metricList.push(
        <div key={"wrap" + name} style={{padding:10}}>
          <MetricPanel
            mode={this.state.mode}
            name={name}
            metric={metric}
            onChange={this.handleChange}
          />
        </div>
      );
    }.bind(this));

    return metricList;
  },

  render: function() {

    // console.log('render metric control  :  ', this.state.moduleConfig);

    return (
      <div className="layout-fit scrollable-y">
        <div style={{margin: '0 auto'}}>
          {this._renderMetricList(this.state.moduleConfig)}
        </div>
      </div>
    );
  }
});


function getDefaultMetric() {
  return {
    "unknown": {
      "DataType": "unknown"
    },
    "boolean": {
      "DataType": "boolean",
      "Config": {
        "true": 5,
        "false": 1
      }
    },
    "double": {
      "DataType": "double",
      "Config": [
        {
          "Limit": -50,
          "Status": 1
        },
        {
          "Limit": 100,
          "Status": 3
        },
        {
          "Limit": null,
          "Status": 5
        }
      ]
    },
    "string": {
      "DataType": "string",
      "Config": {
        "Value0": null,
        "Type0": "default",
        "Status0": 0,
        "Value1": "Compare_1",
        "Type1": "static",
        "Status1": 5,
        "Value2": "Compare_2",
        "Type2": "static",
        "Status2": 7,
        "Value3": "Compare_3",
        "Type3": "regex",
        "Status3": 8
      }
    },
    "datetime": {
      "DataType": "datetime",
      "Config": [
        {
          "Type": "default",
          "Value": "2016/03/04 16:09:00",
          "Status": 0
        },
        {
          "Type": "now",
          "Value": "-30m -2h",
          "Status": 3
        },
        {
          "Type": "today",
          "Value": "+12h",
          "Status": 7
        },
        {
          "Type": "this week",
          "Value": "+3d",
          "Status": 5
        },
        {
          "Type": "this month",
          "Value": "-3M",
          "Status": 3
        },
        {
          "Type": "this year",
          "Value": "-1y",
          "Status": 0
        },
        {
          "Type": "static",
          "Value": "2016/03/04 16:09:00",
          "Status": 0
        }
      ]
    }
  }
}