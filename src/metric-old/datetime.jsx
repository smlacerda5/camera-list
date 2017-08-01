// var RangeBar = require('elessar');
// var moment = require('moment');

// require('./../../node_modules/elessar/elessar.css');

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
  componentDidMount: function() {
    // var el = ReactDOM.findDOMNode(this);
    // console.log('el   :', el);
    //
    // var range = new RangeBar({
    //   min: moment().startOf('day').format('LLLL'),
    //   max: moment().startOf('day').add(1, 'day').format('LLLL'),
    //   valueFormat: function(ts) {
    //     return moment(ts).format('LLLL');
    //   },
    //   valueParse: function(date) {
    //     return moment(date).valueOf();
    //   },
    //   values: [
    //     [
    //       moment().startOf('day').format('LLLL'),
    //       // moment().startOf('day').add(1, 'hours').format('LLLL')
    //     ],
    //     [
    //       moment().startOf('day').add(1.5, 'hours').format('LLLL'),
    //       // moment().startOf('day').add(3.5, 'hours').format('LLLL')
    //     ],
    //     [
    //       moment().endOf('day').subtract(1.5, 'hours').format('LLLL'),
    //       // moment().endOf('day').subtract(1, 'minute').format('LLLL')
    //     ],
    //   ],
    //   label: function(a){return JSON.stringify(a)},
    //   snap: 1000 * 60 * 15,
    //   minSize: 1000 * 60 * 60,
    //   bgLabels: 4,
    // });
    // $(el).html(range.$el[0]);

    // $(ReactDOM.findDOMNode(this)).prepend(RangeBar({
    //   // min: moment().startOf('day').format('LLLL'),
    //   // max: moment().startOf('day').add(1, 'day').format('LLLL'),
    //   min: 0,
    //   max: 100,
    //   valueFormat: function(ts) {
    //     console.log('ts  : ', ts);
    //     return ts;
    //     // return moment(ts).format('LLLL');
    //   },
    //   valueParse: function(date) {
    //     console.log('date  : ', date);
    //     return date;
    //     // return moment(date).valueOf();
    //   },
    //   values: [
    //
    //   ],
    //   label: function(a){
    //     console.log('a  : ', a);
    //     return JSON.stringify(a)
    //   },
    //   vertical: false,
    //   snap: 1,
    //   minSize: 20,
    // }).$el);
  },
  render: function() {
    return (
      <div></div>
    );
  }
});




var cColor = ["#a6e4ff", "#6acf64", "#2b8c48", "#00aa6f", "#f77a7a"]
var colors = ["#FCBD7E","#EB9F71","#E6817C"];

