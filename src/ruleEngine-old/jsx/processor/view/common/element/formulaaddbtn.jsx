require('../../../../../css/metrictable.css');
require('../../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onClick: function(e) {
        if(this.props.onNew != null)
            this.props.onNew();
    },
    render: function() {
        return <div className='metric-add-btn' style={{lineHeight:'23px', height:'26px', marginTop: this.props.topMargin ? this.props.topMargin : '0px'}} onClick={this.onClick}>+</div>
    }
});
