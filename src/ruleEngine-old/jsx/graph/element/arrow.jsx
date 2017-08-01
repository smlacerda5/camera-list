var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var w = 8;
        var hw = w/2;
        return (
            <marker id={this.props.markerID} markerWidth={w} markerHeight={w} refX={this.props.right + w} refY={hw} orient='auto' >
                <path d={'M0,0 L' + w + ',' + hw + ' L0,' + w + ' Z'} fill="#999999"/>
            </marker>
        );
    }
});
