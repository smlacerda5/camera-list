require('../../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var value = this.props.config.value;
        if(value == null) value = 'null';
        else if(typeof value != 'string') value = value.toString();

        return (
            <div
                ref='jobBase' key={this.props.config.path} className='metric value' style={{width:'100%', height:'100%', top:'0', bottom:'0'}}>
                <p>{ value }</p>
            </div>
        )
    }
});