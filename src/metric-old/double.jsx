var _ = require('lodash');

module.exports = React.createClass({
  displayName: 'Double',
  getInitialState: function() {
    var defaultValue = [
      // { "Limit": -50, "Status": 1 },
      // { "Limit": 100, "Status": 3 },
      { "Limit": null, "Status": 5 }
    ]
    return {
      values: this.props.config || defaultValue
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      values: nextProps.config
    })
  },

  handleChangeValue: function(comp, value, oldValue) {
    var values = this.state.values;

    if(_.isNumber(comp.props.limitIndex)) {
      values[comp.props.limitIndex].Limit = value;
    }

    if (_.isNumber(comp.props.statusIndex)){
      values[comp.props.statusIndex].Status = value;
    }

    this.setState({ values: values });

  },
  handleClickAdd: function(comp) {
    var values = this.state.values
    values.splice(comp.props.addIndex, 0, {"Limit": 0, "Status": 0})
    this.setState({ values: values });
  },
  handleClickRemove: function(comp) {
    var values = this.state.values
    values.splice(comp.props.removeIndex, 1)
    this.setState({ values: values });
  },
  _renderDot: function() {
    var style = {
      width: 5,
      height: 2,
      background: "#b6b6b6",
      position: "absolute",
      right: -11,
      top: -18,
    }
    return (
      <div style={{position: "relative"}}>
        <div style={style}></div>
      </div>
    );
  },
  _renderArrow: function(direction) {
    var style = {
      width: 0,
      height: 0,
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      zIndex: 1,
      position: "absolute",
      left: -15
    };
    switch (direction){
      case "top": _.assign(style, {borderBottom: "5px solid #b6b6b6", top: -28,}); break
      case "bottom": _.assign(style, {borderTop: "5px solid #b6b6b6", bottom: -28,}); break
    };
    return (
      <div style={{position: "relative"}}>
        <div style={style}></div>
      </div>
    );
  },
  _renderRemoveBtn: function(_index) {
    if( (_index + 1) == (this.state.values.length) ) return;

    return (
      <n.Button
        ui="circular"
        icon={"minus"}
        removeIndex={_index}
        onClick={this.handleClickRemove}
      />
    )
  }
  ,
  _renderLimit: function(_value, _index) {

    var field = _.isNumber(_value) ? <n.NumberField width="100%" limitIndex={_index} value={_value} onChange={this.handleChangeValue} /> : <n.TextField width={"100%"} readOnly={true} value={"null"} />

    return (
      <tr key={'limit' + _index}>
        <td>
          {field}
          {_.isNumber(_value) ? this._renderDot() : ''}
        </td>
        <td style={{borderLeft: "2px solid #b6b6b6", borderTop: 0}}>
          {_.isNumber(_value) ? '' : this._renderArrow('bottom')}
        </td>
      </tr>
    )
  },
  _renderStatus: function(_value, _index) {

    return (
      <tr key={'status' + _index}>
        <td></td>
        <td style={{borderLeft: "2px solid #b6b6b6", borderTop: 0}}>
          <n.NumberField width="100%" statusIndex={_index} value={_value} onChange={this.handleChangeValue} />
        </td>
        <td
          rowSpan="2"
          style={{maxWidth: 102}}
        >
          <n.Button
            ui="circular"
            icon={"plus"}
            addIndex={_index}
            onClick={this.handleClickAdd}
            style={{marginLeft: 5}}
          />
          {this._renderRemoveBtn(_index)}
        </td>
      </tr>
    )
  },
  _renderDbl: function(_config) {

    var self = this;
    var result = []

    _.forEach(_config, function(val, index) {
      result.push(self._renderStatus(val.Status, index));
      result.push(self._renderLimit(val.Limit, index));
    });

    return result;
  },
  render: function() {

    // console.log('this.state.values  : ', this.state.values)

    return (
      <table className="ui celled table unstackable">
        <thead style={{textAlign: "center"}}>
          <tr>
            <th>Limit</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><n.TextField width={"100%"} readOnly={true} value={"null"} /></td>
            <td style={{borderLeft: "2px solid #b6b6b6"}}>
              {this._renderArrow("top")}
            </td>
            <td></td>
          </tr>

          {this._renderDbl(this.state.values)}

        </tbody>
      </table>
    )
  }
});


function getData() {
  return {
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
    }
  }
}
