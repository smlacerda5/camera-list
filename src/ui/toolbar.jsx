var _ = require('lodash');
var React = require('react');

module.exports = React.createClass({

  displayName: 'AdminToolbar',

  getDefaultProps: function() {
    return {children: []}
  },
  getInitialState: function() {
    return {title: this.props.title || 'title'}
  },

  _renderChildren: function() {
    var title = (
      <div key="title" className="item title">
        <h5 style={{color: "#1b92ee"}}>{this.props.title}</h5>
      </div>
    );
    var children = [];
    this.props.children.forEach(function(item, index) {
      children.push(<div key={index} className="item"> {item} </div>)
    });

    return _.concat(title, <div key="wrap" style={{display: "inline-flex", marginLeft: "auto"}}>{children}</div>);
  },

  render: function() {

    return (
      <div
        className="ui small menu toolbar"
        style={{
          display: "flex",
          borderTop: 0,
          borderRight: 0,
          borderLeft: 0,
          boxShadow: "none"
        }}
      >

        {this._renderChildren()}
      </div>
    )
  }
});