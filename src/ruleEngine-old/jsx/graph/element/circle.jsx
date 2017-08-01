var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        return <circle cx={this.props.cx} cy={this.props.cy} r={this.props.cr} stroke='#BBBBBB' strokeWidth='2' fill='none'/>
    }
});
