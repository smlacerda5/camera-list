var Circular = require('./alignlogic/circular');
var Vertical = require('./alignlogic/vertical');
var Horizontal = require('./alignlogic/horizontal');

// todo : V/H align 행위시 짜투리 group edge 묶는 부분 추가 해주어야 함.
// todo : 위 작업시 배치도 조금 더 신경 써줘야 함
// todo : feeder 아래 배치로 그룹 단위로 쭉쭉 내려도 괜찮을듯..
module.exports = React.createClass({
    getInitialState: function() {
        return {
        }
    },
    render: function(){
        this.props.modeConfig.extra = {};
        switch (this.props.modeConfig.align)
        {
            case 'H':
                Horizontal.Align(this.props.modeConfig, this.props.drawConfig.radius);
                break;
            case 'V':
                Vertical.Align(this.props.modeConfig, this.props.drawConfig.radius);
                break;
            case 'C':
            default:
                Circular.Align(this.props.modeConfig, this.props.drawConfig.radius);
        }

        return this.props.children;
    }
});