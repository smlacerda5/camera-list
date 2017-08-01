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

        if(this.props.config.isLeaf) {
            var statusStyle = { background: 'gray' };
            var attr = this.props.config.attr;
            if(attr != null) {
                var status = this.props.dplBuilder.statusRule.getStatus(attr.status);
                if(status != null) {
                    statusStyle.background = status.color;
                }
            }
            return (
                <div className={this.props.className}>
                    <p style={{paddingRight:'30px'}}>{value}</p>
                    <span className='metric-attribute-readonly' style={statusStyle}><div className='disable'/></span>
                </div>
            )
        }
        else {
            return(
                <div className={this.props.className}>
                    <p>{value}</p>
                </div>
            )
        }
    }
});
