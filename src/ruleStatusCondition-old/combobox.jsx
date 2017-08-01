module.exports = React.createClass({
  displayName: 'ComboBox',
  getInitialState: function() {
    var options = this.props.options;
    var value = this.props.value;
    var label = this.props.label;

    return {
      options: options,
      value: value,
      label: label
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var options = nextProps.options;
    var value = nextProps.value;
    var label = nextProps.label;

    this.setState({
      options: options,
      value: value,
      label: label
    })
  },
  onClickItem: function(comp, val) {
    var item = comp.currentTarget;
    if (this.selectedItem != item)
    {
      if (this.selectedItem) {
        this.selectedItem.className="item";
      }

      var value = item.getAttribute('data-value');
      console.log(item, value);
      item.className="item active selected";
      this.selectedItem = item;
      this.refs.text.innerText = item.innerText;
      this.props.onChange(this, value);
    }
  },
  onClick: function(item) {
    if (this.dropdown_opened)
    {
      this.dropdown_opened=false;
      this.refs.comboBox.className = "ui dropdown selection n-dropdown";
      this.refs.menu.className = "menu transition hidden";
    }
    else {
      this.dropdown_opened=true;
      this.refs.comboBox.className = "ui dropdown selection n-dropdown active visible";
      this.refs.menu.className = "menu transition visible";
    }
    console.log("okokok");
  },
  onBlur: function(item) {
    this.onClick(item);
  },
  componentDidMount: function() {
    for(var idx = 0; idx < this.refs.menu.children.length; idx++)
    {
      var item = this.refs.menu.children[idx];
      if (item.className === "item active selected") this.selectedItem = item;
    }
  },
  renderChild: function() {
    var children = [];
    console.log("combobox value:", this.state.value);
    for(var idx in this.state.options)
    {
      var item=this.state.options[idx];
      if (this.state.value === item)
      {
        //item active selected
        children.push(<div className= 'item active selected' data-value={item} onClick={this.onClickItem}>{item}</div>);
      } else {
        children.push(<div className= 'item' data-value={item} onClick={this.onClickItem}>{item}</div>);
      }
    }
    return children;
  },
  renderLabel: function() {
    if (this.state.label)
    {
      return (<div className= 'ui label' style= {{"width": "150px"}}>{this.state.label}</div>);
    } else {
      return (<div></div>);
    }
  },
  render: function() {
    return (
      <div
        className= 'ui labeled input right  n-select'
        style= {{"marginBottom": "10px", "width": "100%"}}
        >
        {this.renderLabel()}
        <div
          className= 'ui dropdown selection n-dropdown'
          style= {{"flex": "1 1 0%", "minWidth": "auto", "width": "auto"}}
          onClick = {this.onClick}
          ref="comboBox"
        >
          <div className= 'text' ref="text">{this.state.value}</div>
          <i className= 'dropdown icon'></i>
          <div
            className= 'menu'
            ref="menu"
          >
            {this.renderChild()}
          </div>
      </div>
    </div>
    );
  }
});
