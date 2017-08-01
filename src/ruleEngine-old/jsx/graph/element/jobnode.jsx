var ContextMenu = require('../panel/contextmenu');
var ActionRequester = require('../../data/dispatcher/actionrequester');
var RemoveBtn = require('../button/removebtn');
require('../../../css/jobnode.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.mouseUpHandler = null;
        return {
        };
    },
    onMouseOver: function() {
        this.refs.contextmenu.show();
    },
    onMouseLeave: function() {
        this.refs.contextmenu.hide();
    },
    onMouseUp: function(e) {
        if(this.mouseUpHandler != null) {
            clearTimeout(this.mouseUpHandler);
            this.mouseUpHandler = null;
            ActionRequester.openJobDetail({name: this.props.info.name, type: this.props.type, position: { x: e.pageX, y: e.pageY }});
        }
        else {
            this.mouseUpHandler = setTimeout(() => {
                this.mouseUpHandler = null;
            }, 400);
        }
    },
    render: function() {
        this.props.style.lineHeight = this.props.style.r;
        return (
            <div onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} >
                <ContextMenu key='contextmenu' ref='contextmenu' style={this.props.style} menuRadius={14} ><RemoveBtn key='removebtn' name='X' info={this.props.info} /></ContextMenu>
                <div ref='jobBase' key={'node_' + this.props.info.name} title={this.props.info.name} className={'job ' + this.props.type} style={this.props.style} onMouseUp={this.onMouseUp} >
                    {this.props.info.name}
                </div>
            </div>
        )
    }
});