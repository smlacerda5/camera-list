var OneWayDropNode = require('../../../common/element/dropnodeoneway');
var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
var Func = require('../../../../dplbuilder/formulacontrol/block/func');
var VContainer = require('../../../../dplbuilder/formulacontrol/blockcontainer/vcontainer');
var CastSelector = require('../part/castselector');
var OP = require('../part/op');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
    this.dragInfo = { count: 0 };
        return {
            dropBlock: false,
            dropMode: false
        };
    },
    onDragStart: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.dplBuilder.configController.setDragControl(this.props.control);
        this.setState({dropBlock: true, dropMode: this.state.dropMode});
    },
    onDragEnd: function(e) {
        this.dragInfo.count = 0;
        this.setState({dropBlock: false, dropMode: this.state.dropMode});
    },
    onDragEnter: function(e) {
        if(BlockTool.getAssignableList(this.props.control.config).indexOf(this.props.dplBuilder.configController.dragControl[0].config.type) > -1) {
            e.preventDefault();
            this.setState({dropMode: true, modify: this.state.modify});
        }
        this.dragInfo.count++;
    },
    onDragLeave: function(e) {
        this.dragInfo.count--;
        if(this.dragInfo.count <= 0)
            this.setState({dropMode: false});
    },
    onDropLeft: function(e) {
        var self = this;
        if(this.props.dplBuilder.configController.isDragged(this.props.control) === -1) {
            this.props.dplBuilder.configController.dragControl.forEach(function (control) {
                self.props.control.pushBefore(control.pop());
            });
            if(this.props.dplBuilder.configController.dragControl.length === 1) {
                this.props.dplBuilder.configController.selectSingleNode(this.props.dplBuilder.configController.dragControl[0]);
            }
        }
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.keyActionHandler.selectNode(this.props.control);
    },
    onUpdate: function(name) {
        // note : validate ���� �ޱ� �� parameter ����
        this.setState({});
    },
    render: function() {
        var className ='formula func';

        var index = this.props.dplBuilder.configController.isExist(this.props.control);
        if(index >= 0) {
            this.props.dplBuilder.configController.setControl(this.props.control, index);
            className += ' selected';
        }

        var self = this;
        return (
            <span className={className} draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onClick={this.onClick}>
                <span className='formula-font-small' style={{position:'relative', top:'2px'}}>cast</span>
                {this.props.formulaFactory.create(0, 0, this.props.control.config.params[0], this.props.control, this.props.dplBuilder, false, this.props.keyActionHandler)}
                <span className='formula-font-small' style={{position:'relative', top:'2px'}}>to</span>
                <CastSelector control={this.props.control} formulaControl={this.props.dplBuilder.formulaControl} onUpdate={this.onUpdate} keyActionHandler={this.props.keyActionHandler}/>
                {this.props.index != 0 ? <OP control={this.props.control}/> : null}
                <div onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} style={{position:'absolute', left:'0', top:'0', width:'16px', height:'100%'}}>
                    {this.state.dropMode ? <OneWayDropNode onDrop={this.onDropLeft} dragInfo={this.dragInfo} /> : null}
                </div>
                {this.state.dropBlock ? <div style={{position:'absolute', left:'16px', top:'0', right:0, height:'100%'}}/> : null}
            </span>
        )
    }
});
