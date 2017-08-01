require('../../../css/jobnode.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            info: this.props.info,
        };
    },
    dragStart: function(e) {
        // note : drop�� �����ؾ� �ϴ� �����͵��� �������� ��� json stringify�� ����
        e.dataTransfer.setData('JobGraph', 'generate' + ':_:_:' + this.props.type + ':_:_:' + this.props.moduleName);
    },
    render: function() {
        return <div style={{position:'relative', marginBottom:'10px', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', whiteSpace: 'nowrap', width: '100%'}} draggable='true' onDragStart={this.dragStart}>{this.props.moduleName}</div>
    }
});
