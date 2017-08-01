require('../../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function(e) {
        this.refs.inputBox.focus();
        this.refs.inputBox.setSelectionRange(0, this.refs.inputBox.value.trim().length);
    },
    onBlur: function(e) {
        if(this.props.onChange != null)
            this.props.onChange(this.refs.inputBox.value.trim());
    },
    onKeyDown: function(e) {
        if(e.keyCode == 13)
            if(this.props.onChange != null)
                this.props.onChange(this.refs.inputBox.value.trim());
    },
    render: function() {
        return <input ref='inputBox' className={this.props.className} onBlur={this.onBlur} onKeyDown={this.onKeyDown} defaultValue={this.props.value}/>
    }
});