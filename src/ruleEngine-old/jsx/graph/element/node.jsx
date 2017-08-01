var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');
var JobNode = require('./jobnode');

module.exports = React.createClass({
    getInitialState: function() {
        this.lastpos = {
            x: 0,
            y: 0
        };
        return {
        };
    },
    render: function() {
        var r = this.props.info.r;
        var w = r * 2, h = r * 2;
        var startLeft = this.lastpos.x - r, startTop = this.lastpos.y - r;
        var currentLeft = this.props.info.x - r, currentTop = this.props.info.y - r;
        this.lastpos = { x: this.props.info.x, y: this.props.info.y };

        return (
            <Motion defaultStyle={{left: startLeft, top: startTop, width: w, height: h}} style={{left: spring(currentLeft), top: spring(currentTop), width: w, height: h}}>
                {value => <JobNode type={this.props.type} info={this.props.info} style={value} /> }
            </Motion>
        );
    }
});