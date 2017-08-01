require('../../../../css/metrictable.css');

// note : macro parameter 구현 추가 되어야 함
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
            <button className='operator-btn' style={{position:'relative', width:'100%', height:'40px', margin:'3px 0px 3px 0px'}} onClick={this.onClick}>{this.props.op}</button>
        )
    }
});
