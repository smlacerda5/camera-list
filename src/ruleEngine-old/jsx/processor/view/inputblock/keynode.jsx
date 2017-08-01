var RefControl = require('../../dplbuilder/formulacontrol/block/ref');
var BlockType = require('../../dplbuilder/formulacontrol/blocktype/blocktype')
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            focusState: 0
        };
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        if(this.props.dplBuilder.configController != null) {
            var self = this;
            var newConfig = RefControl.createConfig(this.props.tableConfig.id, this.props.config.path);
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
    onMouseDown: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
    },
    onMouseOver: function(e) {
        this.setState({focusState: 1});
    },
    onMouseLeave: function(e) {
        this.setState({focusState: 0});
    },
    render: function() {
        var className = 'metric key';

        if(this.state.focusState == 1)
            className += " mouseover";

        return (
            <div
                ref='jobBase' key={this.props.config.path} className={className}
                onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                    <p>{ this.props.config.value }</p>
            </div>
        )
    }
});
