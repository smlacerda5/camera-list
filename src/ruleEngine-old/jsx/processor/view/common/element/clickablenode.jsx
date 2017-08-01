require('../../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            focusState: 0
        };
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        if('onClick' in this.props) {
            this.props.onClick(this.props.config.path);
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
    render: function() {
        var style;

        switch (this.state.focusState)
        {
            case 1: style = "metric mouseover"; break;
            case 2: style = "metric dragover"; break;
            case 0:default: style = "metric value"; break;
        }

        var value = this.props.config.value;
        if(value == null) value = 'null';
        else if(typeof value != 'string') value = value.toString();

        return (
            <div
                ref='jobBase' key={this.props.config.path} className={style} style={{width:'100%', height:'100%', top:'0', bottom:'0'}}
                onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                { value }
            </div>
        )
    }
});