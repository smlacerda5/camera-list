var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');
require('../../../../css/jobnode.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.lastPosition = {x: this.props.config.startX, y: this.props.config.startY};
        this.hh = 0;
        this.hw = 0;
        return {
            mounted: false,
        };
    },
    componentDidMount: function() {
        this.hw = this.refs.jobBase.offsetWidth / 2;
        this.hh = this.refs.jobBase.offsetHeight / 2;
        this.setState({mounted: true});
    },
    dragStart: function(e) {
        e.dataTransfer.setData('FromData', 'add' + ':_:_:' + this.props.info.type + ':_:_:' + this.props.info.name);
    },
    render: function() {
        if(!this.state.mounted)
            return <div ref='jobBase' key={this.props.info.name} className={this.props.type} style={{ left: this.lastPosition.x, top: this.lastPosition.y }} >{this.props.info.name}</div>

        var margin = this.props.config.margin;
        var hw = this.hw, hh = this.hh;
        var currentX = margin + hw, currentY = margin + this.props.config.lastTop + hh;
        this.props.config.lastTop += (margin + (hh * 2));

        return (
            <Motion defaultStyle={{left: this.lastPosition.x - hw, top: this.lastPosition.y - hh, width: hw * 2, height: hh * 2}} style={{left: spring(currentX - hw), top: spring(currentY - hh), width: hw * 2, height: hh * 2}}>
                {value => <div ref='jobBase' key={this.props.info.name} className={this.props.type} style={value} draggable='true' onDragStart={this.dragStart}>{this.props.info.name}</div> }
            </Motion>
        );
    }
});