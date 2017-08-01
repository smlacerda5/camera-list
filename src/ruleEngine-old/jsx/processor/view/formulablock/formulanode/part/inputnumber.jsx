require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value,
            width: 0
        };
    },
    componentDidMount: function(e) {
        this.refs.inputBox.focus();
        this.updateWidth();
    },
    componentDidUpdate: function(prevProps, prevState) {
        this.updateWidth();
    },
    updateWidth: function() {
        var newWidth = this.refs.placeholder.scrollWidth + 16;
        if(this.state.width != newWidth)
            this.setState({value:this.state.value, width:newWidth});
    },
    onBlur: function(e) {
        if(this.props.onChange != null)
            this.props.onChange(this.refs.inputBox.value);
    },
    onKeyDown: function(e) {
        if(e.keyCode != 13)
            this.setState({value:this.refs.inputBox.value, width:this.state.width});
        else
            if(this.props.onChange != null)
                this.props.onChange(this.refs.inputBox.value);
    },
    render: function() {
        return (
            <span style={{position:'relative'}}>
                <span ref='placeholder' className={this.props.className} style={{position:'absolute', left:'0', top:'0', zIndex:-1}} >{this.state.value}</span>
                <input type='number' ref='inputBox' className={this.props.className} style={{width:this.state.width}} onBlur={this.onBlur} onKeyDown={this.onKeyDown} defaultValue={this.state.value}/>
            </span>
        )
    }
});