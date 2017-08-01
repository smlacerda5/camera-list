var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');

// note : 자식으로 2개의 div만 받을 수 있음.
// note : side panel과 기본 동작은 동일
// note : 현재 left mode만 지원

module.exports = React.createClass({
    getInitialState: function() {
        this.originLeft = this.props.leftWidth == null ? 20 : this.props.leftWidth;
        var initMode = this.props.initMode == null ? false : this.props.initMode;
        var initialLeft = initMode ? this.originLeft : 0;
        return {
            start: initialLeft,
            end: initialLeft
        };
    },
    hide: function() {
        this.setState({start: 0, end: this.originLeft});
    },
    show: function() {
        this.setState({start: this.state.end, end: 0});
    },
    toggle: function() {
        if(this.state.end == 0)
            this.hide();
        else
            this.show();
    },
    render: function() {
        return (
            <div style={{position:'relative', width:'100%', height:'100%'}}>
                <Motion defaultStyle={{left: this.state.start}} style={{left: spring(this.state.end)}}>
                { value =>
                    <div style={{display: 'block', position:'absolute', width:'100%', top:'0', bottom: '0'}}>
                        <div style= {{display: 'inline', position:'absolute', left: -value.left, width: this.originLeft, height: '100%'}}>
                            {this.props.children[0]}
                        </div>
                        <div style= {{display: 'inline', position:'absolute', left: (this.originLeft - value.left),  width: '100%' , height: '100%'}}>
                            {this.props.children[1]}
                        </div>
                    </div>
                }
                </Motion>
            </div>
        );
    }
});