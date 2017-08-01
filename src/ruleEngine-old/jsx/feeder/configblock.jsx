require('../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onChange: function(e) {
        this.props.configBuilder.setConfigValue(this.props.configKey, e.target.value.trim());
    },
    onBlur: function(e) {
        if(this.props.onChange != null)
            this.props.onChange(this.refs.inputBox.value.trim());
    },
    onKeyDown: function(e) {
        if(e.keyCode != 13)
            this.setState({value:this.refs.inputBox.value, width:this.state.width});
        else
        if(this.props.onChange != null)
            this.props.onChange(this.refs.inputBox.value.trim());
    },
    render: function() {
        return <input ref='inputBox' className='metric input' onChange={this.onChange} onBlur={this.onBlur} onKeyDown={this.onKeyDown} defaultValue={this.props.configBuilder.getConfigValue(this.props.configKey)}/>
    }
});