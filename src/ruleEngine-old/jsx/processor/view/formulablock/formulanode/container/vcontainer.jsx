var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
var OneWayDropNode = require('../../../common/element/dropnodeoneway');
var BlankArea = require('../block/blankarea');
require('../../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.dragInfo = { count: 0 };
        return {
            dropMode: false,
        };
    },
    onDragEnter: function(e) {
        if (!this.props.dplBuilder.configController.assignableCheck(this.props.control)) return;
        var assignableCheck = BlockTool.getAssignableList(this.props.control.config).indexOf(this.props.dplBuilder.configController.dragControl[0].config.type);
        if(assignableCheck > -1) {
            e.preventDefault();
            this.setState({dropMode: true});
        }
        else this.setState({dropMode: false});
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
        this.props.keyActionHandler.selectNode(this.props.control);
        this.setState({dropMode: false});
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.keyActionHandler.selectNode(this.props.control);
    },
    render: function() {
        var className = 'formula-container';

        var index = this.props.dplBuilder.configController.isExist(this.props.control);
        if(index >= 0) {
            this.props.dplBuilder.configController.setControl(this.props.control, index);

            if(this.props.isRoot) className += ' selected root';
            className += ' selected';
        }

        else {
            if(this.props.isRoot) className += ' normal root';
        }

        var innerComponents = [];
        var self = this;
        this.props.control.config.container.map(function(config, index) {
            innerComponents.push(self.props.formulaFactory.create(index, index, config, self.props.control, self.props.dplBuilder, false, self.props.keyActionHandler));
        })

        if(innerComponents.length <= 0)
            innerComponents.push(<BlankArea key='blankarea' onClick={this.onClick}/>);

        return (
            <div className={className} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onClick={this.onClick}>
                {this.state.dropMode ? <OneWayDropNode onDrop={this.onDrop} dragInfo={this.dragInfo} /> : null}
                {innerComponents}
            </div>
        )
    }
});