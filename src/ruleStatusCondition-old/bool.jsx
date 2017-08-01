var VIEW_MODE = 'view';

module.exports = React.createClass({
  displayName: 'Bool',
  getInitialState: function() {
    return {
      values: (this.props.values)?this.props.values[0]:null,
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.values){
      this.setState({
        values: nextProps.values[0]
      })
    }
  },
  componentWillMount: function() {
    if (!this.state || !this.state.values)
    {
      this.setState({
        values: {
          'True':'Normal',
          'False':'Normal'
        }
      })
    }
  },
  getValues: function()
  {
    return [this.refs.form.getValues()];
  },
  render: function() {
    return (
      <div>
        <n.Form values={this.state.values} ref="form" labelWidth={150}>
          <n.Select
            key="select"
            label="True"
            name="True"
            width="100%"
            options={this.props.ruleStatusList}
            style={{marginBottom: 10}}
          />
          <n.Select
            key="select"
            label="False"
            name="False"
            width="100%"
            options={this.props.ruleStatusList}
            style={{marginBottom: 10}}
          />
        </n.Form>
      </div>
    )
  }
});
