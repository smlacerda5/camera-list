var OneWayDropNode = require('../../../common/element/dropnodeoneway');
var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
var OP = require('./../part/op');
var InputString = require('../part/inputstring');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.dragInfo = { count: 0 };
        return {
            dropBlock: false,
            dropMode: false,
            modify: 0
        };
    },
    onDragStart: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.dplBuilder.configController.setDragControl(this.props.control);
        this.setState({dropBlock: true, dropMode: this.state.dropMode, modify: this.state.modify});
    },
    onDragEnd: function(e) {
        this.dragInfo.count = 0;
        this.setState({dropBlock: false, dropMode: this.state.dropMode, modify: this.state.modify});
    },
    onDragEnter: function(e) {
        if(BlockTool.getAssignableList(this.props.control.config).indexOf(this.props.dplBuilder.configController.dragControl[0].config.type) > -1) {
            e.preventDefault();
            this.setState({dropBlock: this.state.dropBlock, dropMode: true, modify: this.state.modify});
        }
        this.dragInfo.count++;
    },
    onDragLeave: function(e) {
        this.dragInfo.count--;
        if(this.dragInfo.count <= 0)
            this.setState({dropBlock: this.state.dropBlock, dropMode: false, modify: this.state.modify});
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
    onSelect: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.keyActionHandler.selectNode(this.props.control);
    },
    onStartModify: function(e) {
        this.setState({dropBlock: this.state.dropBlock, dropMode: this.state.dropMode, modify: 1});
    },
    onEndModify: function(newValue) {
        this.props.control.setPath(newValue);
        this.setState({dropBlock: this.state.dropBlock, dropMode: this.state.dropMode, modify: 0});
    },
    render: function() {
        var className ='formula ref';
        
        var index = this.props.dplBuilder.configController.isExist(this.props.control);
        if(index >= 0) {
            this.props.dplBuilder.configController.setControl(this.props.control, index);
            className += ' selected';
        }

        var valueComponent = null;
        if(this.state.modify == 1) {
            valueComponent = <InputString className='formula ref value' onChange={this.onEndModify} value={this.props.control.getPath()} keyActionHandler={this.props.keyActionHandler}/>
        }
        else {
            var value = this.props.control.getPath();
            if(value == null || value.length <= 0) value = '\u00A0\u00A0';
            valueComponent = <span className='formula ref value' onClick={this.onStartModify}>{value}</span>;
        }

        return (
            <span className={className} draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onClick={this.onSelect}>
                <span className='formula-font-small' style={{position:'relative', top:'2px'}}>&nbsp;ref&nbsp;</span>
                {this.props.formulaFactory.create(0, 0, this.props.control.config.left, this.props.control, this.props.dplBuilder, false, this.props.keyActionHandler)}
                {valueComponent}
                {this.props.index != 0 ? <OP control={this.props.control}/> : null}
                <div onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} style={{position:'absolute', left:'0', top:'0', width:'16px', height:'100%'}}>
                    {this.state.dropMode ? <OneWayDropNode onDrop={this.onDropLeft} dragInfo={this.dragInfo} /> : null}
                </div>
                {this.state.dropBlock ? <div style={{position:'absolute', left:'16px', top:'0', right:0, height:'100%'}}/> : null}
            </span>
        )
    }
});
