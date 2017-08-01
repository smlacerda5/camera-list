var BlockTool = require('../../../dplbuilder/formulacontrol/blocktype/blocktool');
var BlockType = require('../../../dplbuilder/formulacontrol/blocktype/blocktype');
var JsonTool = require('../../../util/jsontools');
var FormulaFactory = require('../formulafactory');

require('../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onDragStart: function(type, e) {
        var targetControl = this.refs[type].props.control;
        targetControl.config = JsonTool.deepClone(targetControl.config);
        this.props.dplBuilder.configController.setDragControl(targetControl);
    },
    onClick: function(e) {
        if(this.props.dplBuilder.configController != null) {
            var self = this;
            var newConfig = JsonTool.clone(this.refs[e.target.getAttribute('value')].props.control.config);
            this.props.dplBuilder.configController.firstOperandNode.control.set(newConfig);
            for(var i = 0; i < this.props.dplBuilder.configController.leafControl.length; i++) {
                if(!this.props.dplBuilder.configController.firstOperandNode.control.compare(this.props.dplBuilder.configController.leafControl[i])) {
                    if(this.props.dplBuilder.configController.leafControl[i].pop) this.props.dplBuilder.configController.trashControl.set(this.props.dplBuilder.configController.leafControl[i].pop());
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
    render: function() {
        var self = this;
        return (
            <div className='formula-left-panel'> {
                BlockTool.getAssignableList(this.props.dplBuilder.configController.leafControl[0].config).map(function(type, index) {
                    if(type == BlockType.REF) return null;
                    return (
                        <div className='formula-panel-item align-center' key={index}>
                            <div style={{position:'relative', display:'inline-block'}} draggable={true} onDragStart={self.onDragStart.bind(self, type)}>
                                {FormulaFactory.createDefault(type, self.props.dplBuilder)}
                                <div id={index} style={{position:'absolute', left:'-8px', top:'-3px', right:'-2px', bottom:'-5px'}} value={type} onClick={self.onClick}/>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
});
