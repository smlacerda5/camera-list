require('../../../../../css/global.css');
require('../../../../../css/metrictable.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    resizeContent: function(size) {

    },
    onChange: function(e) {
        this.props.formulaControl.setStatusRule(e.target.value);
        this.setState({});
    },
    render: function() {
        return (
            <div className='formula-layout-root'>
                <span className='formula-layout-left'>
                    <select size='3' ref='ruleConditionSelector' className='formula-left-panel' onChange={this.onChange} value={this.props.formulaControl.getStatusRuleName()}>
                        {this.props.formulaControl.getStatusRuleList().map(function(key) { return <option key={key} value={key}>{key}</option>; })}
                    </select>
                </span>
                <span className='formula-layout-middle'>
                </span>
            </div>
        )
    }
});
