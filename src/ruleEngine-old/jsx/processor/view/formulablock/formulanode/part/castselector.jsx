var KeyType = require('../../../../dplbuilder/formulacontrol/editevent/keytype');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onChange: function(e) {
        this.props.control.setCast(this.props.formulaControl.getCastValue(e.target.value));
        if(this.props.onUpdate != null)
            this.props.onUpdate();
    },
    render: function() {
        var disabled = this.props.keyActionHandler ? this.props.keyActionHandler.keyState === KeyType.NONE ? false : true : false;
        return (
            <select ref='ruleConditionSelector' className='formula func selector func' onChange={this.onChange} value={this.props.formulaControl.getCastName(this.props.control.getCast())} disabled={disabled}>
                {this.props.formulaControl.getCastList().map(function(key) { return <option key={key} value={key}>{key}</option>; })}
            </select>
        )
    }
});
