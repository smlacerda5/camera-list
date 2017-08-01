var RefControl = require('../../dplbuilder/formulacontrol/block/ref');
var AttrNode = require('../common/element/attrnode');
var BlockType = require('../../dplbuilder/formulacontrol/blocktype/blocktype')
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            focusState: 0
        };
    },
    onValueClick: function(e) {
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
    onAttrClick: function(path) {
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
    onDragStart: function(e) {
        e.dataTransfer.setData('JoinData', JSON.stringify({id: this.props.tableConfig.id, path: this.props.config.path}));
    },
    onDragOver: function(e) {
        e.preventDefault();
        this.setState({focusState: 2});
    },
    onDragLeave: function(e) {
        this.setState({focusState: 0});
    },
    onDrop: function(e) {
        var dropData = JSON.parse(e.dataTransfer.getData('JoinData'));

        // note : self join�� advanced mode������ ���� �� ���� (������ �Ǽ� Ȥ�� ���� ���ɼ��� �ʹ� ����)
        if('id' in dropData && 'path' in dropData)
            if(this.props.tableConfig.id != dropData.id)
                this.props.dplBuilder.formatControl.from.join(this.props.tableConfig.id, this.props.config.path, dropData.id, dropData.path);

        this.setState({focusState: 0});
    },
    render: function() {
        var className = 'metric value';

        switch (this.state.focusState)
        {
            case 1: className += " mouseover"; break;
            case 2: className += " dragover"; break;
        }

        var value = this.props.config.value;
        if(value == null) value = 'null';
        else if(typeof value != 'string') value = value.toString();

        return (
            <div
                ref='jobBase' key={this.props.config.path} className={className} draggable='true'
                onClick={this.onValueClick} onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
                onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
                <p style={{paddingRight: '40px'}}>{value}</p>
                <AttrNode onClick={this.onAttrClick} enableTableClick={true} tableConfig={this.props.tableConfig} config={this.props.config} dplBuilder={this.props.dplBuilder} />
            </div>
        )
    }
});
