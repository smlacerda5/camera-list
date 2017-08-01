var OneWayDropNode = require('../../../common/element/dropnodeoneway');
var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
var OP = require('./../part/op');
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
        if(this.props.keyActionHandler) this.props.keyActionHandler.selectNode(this.props.control);
    },
    onAddClick: function(e) {
        if(!this.props.keyActionHandler) return;
        this.props.dplBuilder.configController.selectSingleNode(this.props.control);
        this.props.control.addWhenThen();
    },
    onDelClick: function(index) {
        if(!this.props.keyActionHandler) return;
        this.props.dplBuilder.configController.selectSingleNode(this.props.control);
        this.props.control.delWhenThen(index);
    },
    render: function() {
        var className ='formula logic';

        var index = this.props.dplBuilder.configController.isExist(this.props.control);
        if(index >= 0) {
            this.props.dplBuilder.configController.setControl(this.props.control, index);
            className += ' selected';
        }

        var self = this;
        var innerComponents = [];
        var whenthen = this.props.control.config.whenthen;
        whenthen.map(function(config, index) {
            innerComponents.push(
                <div key={index} className='formula-logic-title'>
                    { whenthen.length <= 1 ? null :
                        <div className='formula-logic-button del' style={{position:'absolute', left:'-20px', top:'10px', zIndex:'1'}} onClick={self.onDelClick.bind(self, index)}>-</div>}
                    <span>
                        <div>
                            { index == 0 ? <span>&nbsp;&nbsp;if</span> : <span>else if</span>}
                            {self.props.formulaFactory.create(index, index, config.when, self.props.control, self.props.dplBuilder, false, self.props.keyActionHandler)}
                        </div>
                        <div>
                            <span>then</span>
                            {self.props.formulaFactory.create(index, index, config.then, self.props.control, self.props.dplBuilder, false, self.props.keyActionHandler)}
                        </div>
                    </span>
                </div>
            );
        });

        innerComponents.push(
            <div key={innerComponents.length} className='formula-logic-title'>
                <div className='formula-logic-button add' style={{position:'absolute', left:'-20px', top:'10px', zIndex:'1'}} onClick={self.onAddClick}>+</div>
                <span>
                    <span>else</span>
                    {self.props.formulaFactory.create(innerComponents.length, innerComponents.length, this.props.control.config.elsethen, this.props.control, this.props.dplBuilder, false, this.props.keyActionHandler)}
                </span>
            </div>
        );

        return (
            <span className={className} draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} style={{paddingLeft:'30px'}} onClick={this.onClick}>
                {innerComponents}
                {this.props.index != 0 ? <OP control={this.props.control}/> : null}
                <div onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} style={{position:'absolute', left:'0', top:'0', width:'25px', height:'100%'}}>
                    {this.state.dropMode ? <OneWayDropNode onDrop={this.onDropLeft} dragInfo={this.dragInfo} /> : null}
                </div>
                {this.state.dropBlock ? <div style={{position:'absolute', left:'25px', top:'0', right:0, height:'100%'}}/> : null}
            </span>
        )
    }
});
