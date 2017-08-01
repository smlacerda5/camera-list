require('../../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            focusState: 0
        };
    },
    onDragEnter: function(e) {
        this.props.dragInfo.count++;
        this.setState({focusState: 2});
    },
    onDragOver: function(e) {
        e.preventDefault();
    },
    onDragLeave: function(e) {
        this.props.dragInfo.count--;
        this.setState({focusState: 0});
    },
    onDrop: function(e) {
        if(this.props.onDrop != null)
            this.props.onDrop(e);
        this.setState({focusState: 0});
    },
    render: function() {
        var className = 'metric';
        if(this.state.focusState == 2)
            className += ' dragover';
        return (
            <div className={className} style={this.props.style} onDragEnter={this.onDragEnter} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}/>
        )
    }
});