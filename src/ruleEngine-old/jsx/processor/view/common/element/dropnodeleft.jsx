var DropNode = require('./dropnode');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onDropLeft: function(e) {
        if (this.props.onDropLeft != null)
            this.props.onDropLeft(e);
    },
    render: function() {
        return (
            <div style={{position:'absolute', width:'100%', height:'100%', left:'0', top:'0'}}>
                <DropNode style={{position:'absolute', left:'0', top:'0', width:'50%', height:'100%'}} onDrop={this.onDropLeft} dragInfo={this.props.dragInfo}/>
            </div>
        )
    }
});