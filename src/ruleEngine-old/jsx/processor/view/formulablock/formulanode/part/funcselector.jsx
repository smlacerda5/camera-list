var KeyType = require('../../../../dplbuilder/formulacontrol/editevent/keytype');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount() {
        this.$ruleConditionSelector = $(this.refs.ruleConditionSelector);
        this.$option = $(this.refs.optionWidth);
    },
    componentDidUpdate(prevProps, prevState) {
        this.$ruleConditionSelector.width(this.$option.width());
    },
    onChange: function(e) {
        this.props.control.setFunc(e.target.value);
        if(this.props.onUpdate != null)
            this.props.onUpdate();
    },
    render: function() {
        var disabled = this.props.keyActionHandler ? this.props.keyActionHandler.keyState === KeyType.NONE ? false : true : false;
        return (
            <span>
                <select ref='ruleConditionSelector' style={{width: 70}} className='formula func selector func' onChange={this.onChange} value={this.props.control.getFunc()} disabled={disabled}>
                    {this.props.formulaControl.getFunctionList().map(function(key) { return <option key={key} value={key}>{key}</option>; })}
                </select>
                <select ref='optionWidth' style={{display: 'none'}}>
                    <option>{this.props.control.getFunc()}</option>
                </select>
            </span>
        )
    }
});
