var OneWayDropNode = require('../../../common/element/dropnodeoneway');
var JsonTool = require('../../../../util/jsontools');
var BlockType = require('../../../../dplbuilder/formulacontrol/blocktype/blocktype');
var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
require('../../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.dragInfo = { count: 0 };
        return {
            dropMode: false,
        };
    },
    onDragEnter: function(e) {
        e.preventDefault();
        this.setState({dropMode: true});
        this.dragInfo.count++;
    },
    onDragLeave: function(e) {
        this.dragInfo.count--;
        if(this.dragInfo.count <= 0)
            this.setState({dropMode: false});
    },
    onDrop: function(e) {
        var self = this;
        this.props.dplBuilder.configController.dragControl.forEach(function (control){
            self.props.control.set(control.pop());
        });
        this.props.dplBuilder.configController.initialize();
        this.setState({dropMode: false});
        this.props.dplBuilder.configController.validate();
    },
    onTrashClick: function(config, e) {
        if(BlockTool.getAssignableList(this.props.dplBuilder.configController.leafControl[0].config).indexOf(config.type) < 0) return;
        if(this.props.dplBuilder.configController.leafControl != null) {
            var self = this;
            var newConfig = JsonTool.deepClone(config);
            this.props.dplBuilder.configController.firstOperandNode.control.set(newConfig);
            for(var i = 0; i < this.props.dplBuilder.configController.leafControl.length; i++) {
                if(!this.props.dplBuilder.configController.firstOperandNode.control.compare(this.props.dplBuilder.configController.leafControl[i])) {
                    if(this.props.dplBuilder.configController.leafControl[i].pop) this.props.control.set(this.props.dplBuilder.configController.leafControl[i].pop());
                    else if(this.props.dplBuilder.configController.leafControl[i].config.type === BlockType.VCONTAINER) {
                        var targetContainer = Object.assign([], this.props.dplBuilder.configController.leafControl[i].config.container);
                        targetContainer.forEach(function (config) {
                            self.props.dplBuilder.configController.trashControl.set(config);
                            self.props.dplBuilder.configController.leafControl[i].remove(config);
                        });
                    }
                }
            }
            if (this.props.dplBuilder.configController.leafControl[0].config.type === BlockType.VCONTAINER || this.props.dplBuilder.configController.leafControl[0].config.type === BlockType.CCONTAINER)
                this.props.dplBuilder.configController.selectSingleNode(this.props.dplBuilder.configController.firstOperandNode.control);
            else
                this.props.dplBuilder.configController.selectByConfig(newConfig);
            this.props.dplBuilder.configController.validate();
        }
    },
    onTrashDragStart: function(index, e) {
        var targetControl = this.refs[index].props.control;
        targetControl.config = JsonTool.deepClone(targetControl.config);
        this.props.dplBuilder.configController.setDragControl(targetControl);
    },
    onTrashDragEnd: function(e) {
        this.dragInfo.count = 0;
        this.setState({dropMode: false});
    },
    render: function() {
        var className = 'formula-container normal root';

        var targetContainer = this.props.control.config.container;
        var innerComponents = [];
        for(var index = targetContainer.length - 1; index >= 0; index--) {
            var targetConfig = targetContainer[index];
            innerComponents.push(
                <div className='formula-panel-item align-left' key={index}>
                    <div style={{position:'relative', display:'inline-block'}} draggable={true} onDragStart={this.onTrashDragStart.bind(this, index)} onDragEnd={this.onTrashDragEnd} >
                        {this.props.formulaFactory.create(index, 0, targetConfig, this.props.control, this.props.dplBuilder, false)}
                        <div id={index} style={{position:'absolute', left:'-8px', top:'-3px', right:'-2px', bottom:'-5px'}} onClick={this.onTrashClick.bind(this, targetConfig)}/>
                    </div>
                </div>
            );
        }

        return (
            <div className={className} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} >
                {innerComponents}
                {this.state.dropMode ? <OneWayDropNode onDrop={this.onDrop} dragInfo={this.dragInfo} /> : null}
            </div>
        )
    }
});