var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
var CP = require('./../part/cp');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            dropBlock: false
        };
    },
    onDragStart: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.dplBuilder.configController.setDragControl(this.props.control);
        this.setState({dropBlock: true});
    },
    onDragEnd: function(e) {
        this.setState({dropBlock: false});
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.keyActionHandler.selectNode(this.props.control);
    },
    render: function() {
        var className ='formula logic';

        var index = this.props.dplBuilder.configController.isExist(this.props.control);
        if(index >= 0) {
            this.props.dplBuilder.configController.setControl(this.props.control, index);
            className += ' selected';
        }

        return (
            <span className={className} draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onClick={this.onClick}>
                {this.props.formulaFactory.create(0, 0, this.props.control.config.left, this.props.control, this.props.dplBuilder, false, this.props.keyActionHandler)}
                <CP control={this.props.control} keyActionHandler={this.props.keyActionHandler}/>
                {this.props.formulaFactory.create(1, 0, this.props.control.config.right, this.props.control, this.props.dplBuilder, false, this.props.keyActionHandler)}
                {this.state.dropBlock ? <div style={{position:'absolute', left:'0', top:'0', width:'100%', height:'100%'}}/> : null}
            </span>
        )
    }
});
