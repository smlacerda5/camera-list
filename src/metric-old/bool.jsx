var VIEW_MODE = 'view';

module.exports = React.createClass({
  displayName: 'Bool',
  render: function() {
    return (
      <div>
        <n.Form
          ref="form"
          labelWidth={150}
          values={this.props.config}
          childConfig={[
            { type: "Number", label: "true", name: "true", readOnly: (this.props.mode == VIEW_MODE) },
            { type: "Number", label: "false", name: "false", readOnly: (this.props.mode == VIEW_MODE) }
          ]}
        />
      </div>
    )
  }
});