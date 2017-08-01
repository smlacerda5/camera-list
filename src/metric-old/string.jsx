var VIEW_MODE = 'view';
var EDIT_MODE = 'edit';
var NEW_MODE = 'new';

module.exports = React.createClass({
  displayName: 'String',
  getInitialState: function() {
    return {
      values: this.props.config
    }
  },

  /*------------ handler ------------*/
  handleChange: function(comp, val) {
    this.state.values[comp.props.name] = val;
  },
  handleClick: function() {

    var values = this.state.values;
    var lastIndex = this._getChildPair(values).length / 3;

    values['Value'+ lastIndex] = '';
    values['Type'+ lastIndex] = 'static';
    values['Status'+ lastIndex] = 0;

    this.setState({
      values: values
    })
  },

  /*------------------------------------*/
  _renderChild: function(values) {
    var child = this._getChildPair(values);

    var ren = [];
    var size = child.length/3;
    for (var i = 0; i < size; i++) {
      ren.push(
        <div style={{display: 'flex'}} key={i}>
          {child.splice(0, 3)}
        </div>
      );
    }

    return ren;
  },
  _getChildPair: function(values) {
    var child = [];
    for (var key in values) {
      var label = key.replace(/[0-9]/g, '');

      switch (label) {
        case 'Value':
          child.push(
            <n.TextField
              style={{flex: 1}}
              key={key}
              width="100%"
              labelWidth={80}
              layout="float"
              value={values[key]}
              name={key}
              onChange={this.handleChange}
              readOnly={(this.props.mode == VIEW_MODE)}
            />
          );
          break;
        case 'Type':
          child.push(
            <n.Select
              style={{flex: 1, marginLeft: 5, width: "40px"}}
              key={key}
              layout="float"
              value={values[key]}
              name={key}
              options={['default', 'static', 'regex']}
              onChange={this.handleChange}
              readOnly={(this.props.mode == VIEW_MODE)}
            />
          );
          break;
        case 'Status':
          child.push(
            <n.NumberField
              style={{flex: 1}}
              key={key}
              label={label}
              width="100%"
              labelWidth={80}
              layout="float"
              value={values[key]}
              name={key}
              onChange={this.handleChange}
              readOnly={(this.props.mode == VIEW_MODE)}
            />
          );
          break;
      }

    }
    return child;
  },
  _renderAddBtn: function() {
    if (this.props.mode !== VIEW_MODE) {
      return (
        <n.Button
          ui="circular"
          icon={"plus"}
          onClick={this.handleClick}
        />
      );
    }
    return <div></div>;
  },

  /*------------------------------------*/
  render: function(){

    var values = this.state.values;

    return (
      <n.Form
        ref="form"
        labelWidth={70}
      >

        {this._renderChild(values)}

        {this._renderAddBtn()}

      </n.Form>
    );
  }
});