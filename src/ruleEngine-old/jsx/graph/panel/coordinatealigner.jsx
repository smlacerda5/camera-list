var Circular = require('./alignlogic/circular');
var Vertical = require('./alignlogic/vertical');
var Horizontal = require('./alignlogic/horizontal');

// todo : V/H align ������ ¥���� group edge ���� �κ� �߰� ���־�� ��.
// todo : �� �۾��� ��ġ�� ���� �� �Ű� ����� ��
// todo : feeder �Ʒ� ��ġ�� �׷� ������ ���� ������ ��������..
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