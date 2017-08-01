var _forEach = require('lodash/forEach');
var LevelItem = require('./levelItem');

module.exports = React.createClass({
  displayName: 'LevelTable',
  getInitialState: function() {
    return {
      values: this.props.values
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      values: nextProps.values
    })
  },

  handleChangeLevel: function(level, type, value) {
    //...
    this.state.values[level][type] = value;
  },

  _removeClass: function(name) {
    var el = ReactDOM.findDOMNode(this.refs.form);
    el.getElementsByTagName('form')[0].classList.remove(name);
  },

  _renderLevel: function(_values) {

    var self = this;
    var levelItems = [];

    _forEach(_values, function(item, index) {
      
      levelItems.push(
        <LevelItem
          key={index}
          level={index}
          label={item.Label}
          blink={item.Blink}
          color={item.Color}
          onChange={self.handleChangeLevel}
        />
      )
    });

    return levelItems
  },
  
  componentDidMount: function() {
    this._removeClass('segment'); // remove form boxing line
  },

  render: function() {

    return (

      <n.Form
        ref="form"
        onFieldChange={this.handleFieldChange}
        layout="float"
      >
        <table className="ui celled table">
          <thead>
            <tr
              style={{
                display: "inline-block"
              }}
            >
              <th style={{padding: "11px 17.5px"}}>Level</th>
              <th style={{padding: "11px 44.5px"}}>Label</th>
              <th style={{padding: "11px 18px"}}>Blink</th>
              <th style={{padding: "11px 63.5px"}}>Color</th>
            </tr>
          </thead>
          <tbody
            style={{
              display: "block",
              height: 300,
              overflow: "scroll"
            }}
          >
            {this._renderLevel(this.state.values)}
          </tbody>
        </table>

      </n.Form>
    );
  }
});



    //
    // <n.Panel
    //   height={505}
    //   style={{overflow: 'scroll'}}
    // >
    // </n.Panel>