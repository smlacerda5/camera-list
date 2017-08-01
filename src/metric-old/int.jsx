var VIEW_MODE = 'view';

module.exports = React.createClass({
  displayName: 'Integer',
  getInitialState: function() {
    return {
      values: this.props.config
    }
  },

  /*------------ handler ------------*/
  handleChange: function(comp, val) {
    this.state.values[comp.props.name] = val;
  },
  handleClickAdd: function() {
    console.log('state : ', this.state.values);

    var values = this.state.values;
    var lastIndex = this._getChildPair(values).length / 2;

    values['Limit'+ lastIndex] = 0;
    values['Status'+ lastIndex] = 0;

    this.setState({
      values: values
    })
  },

  /*------------------------------------*/
  _renderChild: function(values) {
    var child = this._getChildPair(values);

    var ren = [];
    var size = child.length/2;
    for (var i = 0; i < size; i++) {
      ren.push(
        <div style={{display: 'flex'}} key={i}>
          {child.splice(0, 2)}
        </div>
      );
    }

    return ren;
  },
  _getChildPair: function(values) {

    var child = [];
    for (var key in values) {
      var label = key.replace(/[0-9]/g, '');

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
          disabled={(values[key] == null)}
          readOnly={(this.props.mode == VIEW_MODE)}
        />
      );
    }

    return child;
  },
  _renderAddBtn: function() {
    if (this.props.mode !== VIEW_MODE) {
      return (
        <n.Button ui="circular" icon="plus" onClick={this.handleClickAdd}/>
      )
    };
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