var RenameNode = require('../common/element/renamenode');
var ThreeWayDropNode = require('../common/element/dropnodethreeway.jsx');
require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.pathString = JSON.stringify(this.props.config.path);
        this.dragInfo = { count: 0 };
        return {
            focusState: 0,
            modify: 0
        };
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.setState({focusState: this.state.focusState, modify: 1});
    },
    onMouseDown: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
    },
    onMouseOver: function(e) {
        this.setState({focusState: 1, modify: this.state.modify});
    },
    onMouseLeave: function(e) {
        this.setState({focusState: 0, modify: this.state.modify});
    },
    onDragEnter: function(e) {
        e.preventDefault();
        this.dragInfo.count++;
        this.setState({focusState: 2, modify: this.state.modify});
    },
    onDragLeave: function(e) {
        this.dragInfo.count--;
        if(this.dragInfo.count <= 0)
            this.setState({focusState: 0, modify: this.state.modify});
    },
    onDragStart: function(e) {
        e.dataTransfer.setData('OutputKey', this.pathString);
    },
    getDropData: function(e) {
        var dropData = e.dataTransfer.getData('OutputKey');
        if(dropData && (this.pathString != dropData)) {
            var selectFrom = JSON.parse(dropData);
            if(Array.isArray(selectFrom)) {
                return selectFrom;
            }
        }
        return null;
    },
    onDropUp: function(e) {
        var dropData = this.getDropData(e);
        if(dropData != null) {
            this.props.dplBuilder.formatControl.select.moveToUp(dropData, this.props.config.path);
            this.props.dplBuilder.selectFormula('', null);
        }

        this.setState({focusState: 0, modify: this.state.modify});
    },
    onDropDown: function(e) {
        var dropData = this.getDropData(e);
        if(dropData != null) {
            this.props.dplBuilder.formatControl.select.moveToDown(dropData, this.props.config.path);
            this.props.dplBuilder.selectFormula('', null);
        }

        this.setState({focusState: 0, modify: this.state.modify});
    },
    onDropRight: function(e) {
        var dropData = this.getDropData(e);
        if(dropData != null) {
            this.props.dplBuilder.formatControl.select.moveToRight(dropData, this.props.config.path);
            this.props.dplBuilder.selectFormula('', null);
        }

        this.setState({focusState: 0, modify: this.state.modify});
    },
    onRename: function(newName) {
        if(newName.length != 0) {
            this.props.dplBuilder.formatControl.select.rename(this.props.config.path, newName);
            this.props.dplBuilder.selectFormula('', null);
        }

        this.setState({focusState: this.state.focusState, modify: 0});
    },
    onRemove: function(e) {
        this.props.dplBuilder.formatControl.select.remove(this.props.config.path);
        this.props.dplBuilder.selectFormula('', null);
    },
    render: function() {
        var className = 'metric key';
        var draggable = true;
        var value = this.props.config.value;

        var innerContent = [];
        innerContent.push(<p key='key'>{value}</p>);

        if(this.state.modify == 1) {
            innerContent.push(<RenameNode key='input' className='metric rename' onChange={this.onRename} value={value}/>);
            draggable = false;
        }
        else {
            switch (this.state.focusState) {
                case 1:
                    className += " mouseover";
                    innerContent.push(<div key='button' className='metric-remove-btn' style={{position:'absolute', left:'0', top:'4px'}} onClick={this.onRemove}>x</div>);
                    break;
                case 2:
                    innerContent.push(<ThreeWayDropNode key='dropnode' onDropUp={this.onDropUp} onDropDown={this.onDropDown} onDropRight={this.onDropRight} dragInfo={this.dragInfo} />);
                    break;
            }
        }

        return (
            <div
                className={className} draggable={draggable}
                onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
                onDragStart={this.onDragStart} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave}>
                    {innerContent}
            </div>
        )
    }
});
