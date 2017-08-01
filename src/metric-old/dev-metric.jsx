var Bool = require('./bool');
var Int = require('./int');
var Double = require('./double');
var Str = require('./string');
var Slider = require('./slider(deprecated)');
var DateTime = require('./datetime');

var PluginObject = require('@plugin/object')();
var PluginObjectType = require('@plugin/object-type');

var _map = require('lodash/map');

module.exports = React.createClass({
  displayName: 'Metric',

  getDefaultProps: function() {
    return {
      values: _getLevel()
    };
  },
  getInitialState: function() {
    return {
      metricType: 'datetime',
      metricItem: React.createElement(DateTime),
    };
  },
  handleChangeSelect: function(comp, value) {
    var item;
    switch(value) {
      case 'boolean': item = Bool; break;
      case 'int': item = Int; break;
      case 'string': item = Str; break;
      case 'slider': item = Slider; break;
      case 'datetime': item = DateTime; break;
    }

    this.setState({
      metricType: value,
      metricItem: React.createElement(item)
    });
  },

  _renderLevel: function(_values) {

    return _map(_values, function(item, index) {
      console.log('arg  : ', arguments)
      return (
        <div>
          <n.TextField
            label="Level"
            layout="float"
            width={120}
            value={index}
          />
          <n.TextField
            label="Label"
            layout="float"
            width={200}
            value={item.Label}
          />
          <n.Toggle
            label="Blink"
            layout="float"
            width={160}
            value={item.Blink}
          />
          <n.ColorField
            label="Color"
            layout="float"
            width={220}
            value={item.Color}
          />
        </div>
      )
    })
  },
  componentDidMount: function() {

    console.log('this.refs.form   :', this.refs.form);
    console.log('this.refs.form   :', this.refs.form);
    console.log('this.refs.form   :', this.refs.form);
  },
  render: function() {

    return (

      <n.FlexLayout direction="horizontal">
        <n.Box flex={1}>
          <PluginObjectType
            title="hihi"
            columns={[{field:'Name',title:'Name'}]}
          />
        </n.Box>
        <n.Box flex={1}>
          <PluginObject
            columns={[{field:'Name',title:'Name'},{field:'ObjectTypeName',title:'Type'}]}
          />
        </n.Box>


      </n.FlexLayout>
    );
  }
}); 

//
//
// values={this.props.values}
// childConfig={[
// { type: "Text", label: "Level", name: "level", layout: "float", width:120 },
// { type: "Text", label: "Label", name: "Label", layout: "float", width:200 },
// { type: "Toggle", label: "Blink", name: "Blink", layout: "float", width:160 },
// { type: "Color", label: "Color", name: "Color", layout: "float", width:220 }
// ]}


function _getLevel() {
  return [
    {
      "Label": "label_0",
      "Color": "#0010400",
      "Blink": false
    },
    {
      "Label": "label_1",
      "Color": "#0DF700",
      "Blink": false
    },
    {
      "Label": "label_2",
      "Color": "#1AEA00",
      "Blink": false
    },
    {
      "Label": "label_3",
      "Color": "#27DD00",
      "Blink": false
    },
    {
      "Label": "label_4",
      "Color": "#34D000",
      "Blink": false
    },
    {
      "Label": "label_5",
      "Color": "#41C300",
      "Blink": false
    },
    {
      "Label": "label_6",
      "Color": "#4EB600",
      "Blink": false
    },
    {
      "Label": "label_7",
      "Color": "#5BA900",
      "Blink": false
    },
    {
      "Label": "label_8",
      "Color": "#689C00",
      "Blink": false
    },
    {
      "Label": "label_9",
      "Color": "#758F00",
      "Blink": false
    },
    {
      "Label": "label_10",
      "Color": "#828200",
      "Blink": false
    },
    {
      "Label": "label_11",
      "Color": "#8F7500",
      "Blink": false
    },
    {
      "Label": "label_12",
      "Color": "#9C6800",
      "Blink": false
    },
    {
      "Label": "label_13",
      "Color": "#A95B00",
      "Blink": false
    },
    {
      "Label": "label_14",
      "Color": "#B64E00",
      "Blink": false
    },
    {
      "Label": "label_15",
      "Color": "#C34100",
      "Blink": false
    },
    {
      "Label": "label_16",
      "Color": "#D03400",
      "Blink": false
    },
    {
      "Label": "label_17",
      "Color": "#DD2700",
      "Blink": false
    },
    {
      "Label": "label_18",
      "Color": "#EA1A00",
      "Blink": false
    },
    {
      "Label": "label_19",
      "Color": "#F70D00",
      "Blink": false
    }
  ]
};