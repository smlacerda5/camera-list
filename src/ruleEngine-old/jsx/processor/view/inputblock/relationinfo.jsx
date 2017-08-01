var RenameNode = require('../common/element/renamenode');
require('../../../../css/metrictable.css');
require('../../../../css/global.css');

// note : ��Ÿ�ӿ� ���� ��ȭ�� ���� ���� table�� ������ �ڵ��� ���� ����

module.exports = React.createClass({
    getInitialState: function() {
        // todo : ���� ������ �ڵ�
        var to = this.props.config.alias.to;
        var from = this.props.config.alias.from;
        this.props.config.alias = {
            to: to && to.length > 0 ? to : this.props.config.name,
            from: from && from.length > 0 ? from : this.props.dplBuilder.getProcessorName()
        };
        return {
            modifyTarget: 0
        };
    },
    onFromClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.setState({modifyTarget:1});
    },
    onToClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.setState({modifyTarget:2});
    },
    onFromChange: function(newAlias) {
        this.props.dplBuilder.formatControl.from.updateAlias(this.props.config.id, newAlias, this.props.config.alias.to);
        this.setState({modifyTarget:0});
    },
    onToChange: function(newAlias) {
        this.props.dplBuilder.formatControl.from.updateAlias(this.props.config.id, this.props.config.alias.from, newAlias);
        this.setState({modifyTarget:0});
    },
    render: function() {
        var processorName = this.props.dplBuilder.getProcessorName();
        var inputJobName = this.props.config.name;

        var fromContent = [];
        fromContent.push(<p key='fromP'>{this.props.config.alias.from}</p>);
        if(this.state.modifyTarget == 1)
            fromContent.push(<RenameNode key='fromInput' className='metric rename' onChange={this.onFromChange} value={this.props.config.alias.from}/>);

        var toContent = [];
        toContent.push(<p key='toP'>{this.props.config.alias.to}</p>);
        if(this.state.modifyTarget == 2)
            toContent.push(<RenameNode key='toInput' className='metric rename' onChange={this.onToChange} value={this.props.config.alias.to}/>);

        return (
            <table className='metric-table' style={{height:'100%'}}>
                <tbody><tr>
                    <td className='metric-table-td'><div className='metric key'><p>{processorName + '←' + inputJobName}</p></div></td>
                        <td className='metric-table-td'><div className='metric value' onClick={this.onFromClick}>
                        {fromContent}
                        </div></td>
                    </tr>
                    <tr>
                        <td className='metric-table-td'><div className='metric key'><p>{processorName + '→' + inputJobName}</p></div></td>
                        <td className='metric-table-td'><div className='metric value' onClick={this.onToClick}>
                        {toContent}
                        </div></td>
                    </tr>
                </tbody>
            </table>
        )
    }
});
