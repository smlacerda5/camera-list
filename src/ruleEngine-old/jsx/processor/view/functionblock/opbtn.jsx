require('../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onClick: function() {
        this.props.dplBuilder.assignFormula('op', this.props.op);
    },
    render: function() {
        return (
            <button className='operator-btn' style={{position:'relative', width:'46%', height:'40px', margin:'1%'}} onClick={this.onClick}>{this.props.op}</button>
        )
    }
});
