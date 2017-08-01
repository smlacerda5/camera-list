// var MultiSlider = require('./../library/multi-slider');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      values: [10,10,10,10,10]
    };
  },

  onChange: function (values) {
    this.setState({
      values: values
    });
  },
  render: function() {
    var cColor = ["#a6e4ff", "#6acf64", "#2b8c48", "#00aa6f", "#f77a7a"]
    var colors = ["#FCBD7E","#EB9F71","#E6817C"];
    return (
      <div>
        <pre><code>values={JSON.stringify(this.state.values)} colors={JSON.stringify(colors)}</code></pre>
      </div>
    );
  }
});
        // <MultiSlider
        //   colors={cColor}
        //   values={this.state.values}
        //   // defaultValues={[1, 2, 3]}
        //   onChange={this.onChange}
        // />
