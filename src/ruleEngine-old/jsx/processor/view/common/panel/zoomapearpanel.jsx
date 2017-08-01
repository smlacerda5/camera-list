var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');
require('../../../../../css/jobdetail.css');
require('../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.position = { x:0, y:0, w:0, h:0 };
        return {
            mode: 0
        };
    },
    close: function() {
        this.setState({mode: 1});
    },
    render: function() {
        this.position.x = this.props.modeConfig.config.position.x;
        this.position.y = this.props.modeConfig.config.position.y;
        this.position.w = this.props.width;
        this.position.h = this.props.height;

        var sl, st, ss, el, et, es;

        if(this.state.mode == 0) {
            sl = this.position.x; st = this.position.y; ss = 0.0; el = 0; et = 0; es = 1.0;
        }
        else {
            sl = 0; st = 0; ss = 1.0;  el = this.position.w / 2; et = this.position.h / 2; es = 0.0;
        }

        return (
            <Motion
                defaultStyle={{left: sl, top: st, scale:ss}}
                style={{left: spring(el), top: spring(et), scale: spring(es)}}>
                {value => {
                    return <div className='detail-body no-carrot' style={{width:'100%', height:'100%', transform: `translate(${value.left}px, ${value.top}px) scale(${value.scale})`, transformOrigin: 'top left'}}>{this.props.children}</div>
                }}
            </Motion>
        );
    }
});
