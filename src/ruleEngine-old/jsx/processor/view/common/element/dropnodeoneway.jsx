var DropNode = require('./dropnode');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onDrop: function(e) {
        if (this.props.onDrop != null)
            this.props.onDrop(e);
    },
    render: function() {
        return (
            <div style={{position:'absolute', width:'100%', height:'100%', left:'0', top:'0'}}>
                <DropNode style={{position:'absolute', left:'0', top:'0', width:'100%', height:'100%'}} onDrop={this.onDrop} dragInfo={this.props.dragInfo}/>
            </div>
        )
    }
});