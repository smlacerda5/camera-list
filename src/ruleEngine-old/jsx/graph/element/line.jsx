var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');

module.exports = React.createClass({
    getInitialState: function() {
        this.start = { x: 0, y: 0 };
        this.end = { x: 0, y: 0 };
        return {
        };
    },
    render: function() {
        var markerID = 'url(#' + this.props.markerID + ')';
        var lsx = this.start.x, lsy = this.start.y, lex = this.end.x, ley = this.end.y;
        var csx = this.props.start.x, csy = this.props.start.y, cex = this.props.end.x, cey = this.props.end.y;
        this.start = { x: csx, y: csy };
        this.end = { x: cex, y: cey};

        return (
            <Motion defaultStyle={{sx: lsx, sy: lsy, ex: lex, ey: ley }} style={{sx: spring(csx), sy: spring(csy), ex: spring(cex), ey: spring(cey)}} >
                {value => <path markerEnd={markerID} d={'M' + value.sx + ',' + value.sy + ' L' + value.ex + ',' + value.ey} stroke="#999999" strokeWidth={2} fill="none" /> }
            </Motion>
        );
    }
});
