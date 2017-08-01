var ReactMotion = require('react-motion');
console.log(ReactMotion);
var Motion = require('react-motion/lib/Motion');
var spring = require('react-motion/lib/spring');
require('../../../../css/jobnode.css');

// note : ���� ES6�� ������ �ʿ��ϰų�, Ȥ�� react ������ ������ ���� ������ ����Ҷ�,
//        ���� ������ ������Ʈ �Ļ����(react mixin, mixin, prototype, ES6 extend �䳻) ���ٴ�
//        decorating�� �ξ� �ڿ������� ���� �߻� ������ ���� �Ǵ� �Ǳ⿡ �� ����� ���� �Ǿ����ϴ�.
//        ��Ÿ�� Ȥ�� �Ļ� ���۰� ���õ� ������ ��� property�� ���� �մϴ�.
module.exports = React.createClass({
    getInitialState: function() {
        return {
            info: this.props.info,
            lastpos: {
                x: 0,
                y: 0,
            },
            mouse: {
                x: 0,
                y: 0
            },
            drag: false,
        };
    },
    onMouseDown: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);

        var element = this.refs.TypeGenerator;
        var info = this.state.info;
        info.x = element.offsetLeft;
        info.y = element.offsetTop;
        info.hw = element.offsetWidth / 2;
        info.hh = element.offsetHeight / 2;
        this.setState({ info: info, lastpos: this.state.lastpos, mouse:{ x: e.pageX, y: e.pageY,  }, drag: true });
    },
    onMouseUp: function(){
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);

        var lastpos = this.state.lastpos;
        lastpos.x = this.state.info.x;
        lastpos.y = this.state.info.y;

        this.setState({ info: this.state.info, lastpos: lastpos, mouse: this.state.mouse, drag: false });
        //ActionRequester.update(this.props.info);
    },
    onMouseMove: function(e) {
        var mouse = this.state.mouse;
        this.state.info.x = (this.state.info.x + (e.pageX - mouse.x));
        this.state.info.y = (this.state.info.y + (e.pageY - mouse.y));
        this.setState({ info: this.state.info, lastpos: this.state.lastpos, mouse:{ x: e.pageX, y: e.pageY,  }, drag: true });
    },
    render: function() {
        if(this.state.drag)
        {
            var currentpos = this.state.info;
            return <div ref='TypeGenerator' className={this.props.type} style={{ left: currentpos.x , top: currentpos.y }}>{this.props.info.name}</div>
        }

        return <div ref='TypeGenerator' className={this.props.type + '-generator'} onMouseDown={this.onMouseDown} >{this.props.info.name}</div>
    }
});