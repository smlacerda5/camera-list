module.exports = React.createClass({
  displayName: 'LevelItem',
  getInitialState: function() {
    return {
      level: this.props.level,
      label: this.props.label,
      color: this.props.color,
      blink: this.props.blink
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      level: nextProps.level,
      label: nextProps.label,
      color: nextProps.color,
      blink: nextProps.blink
    });
  },

  //handler
  handleChangeLabel: function(comp, value) {
    this.setState({
      label: value
    });
    this.props.onChange(this.props.level, 'Label', value)
  },
  handleChangeBlink: function(comp, value, oldValue, checked) {
    this.setState({
      blink: checked
    });
    this.props.onChange(this.props.level, 'Blink', checked)
  },
  handleChangeColor: function(comp, value) {
    this.setState({
      color: value
    });
    this.props.onChange(this.props.level, 'Color', value)
  },

  componentDidMount: function() {},
  render: function() {
    return (
      <tr>
        <td>
          <n.NumberField
            width={46}
            value={this.state.level}
            readOnly={true}
            disabled={true}
          />
        </td>
        <td>
          <n.TextField
            width={100}
            value={this.state.label}
            onChange={this.handleChangeLabel}
          />
        </td>
        <td>
          <n.Toggle
            width={46}
            checked={this.state.blink}
            onChange={this.handleChangeBlink}
          />
        </td>
        <td>
          <n.ColorField
            width={108}
            value={this.state.color}
            onChange={this.handleChangeColor}
          />
        </td>
      </tr>
    );
  }  
});