var KeyType = require('../../../../dplbuilder/formulacontrol/editevent/keytype');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.cp = [ '<=', '<', '==', '!=', '>', '>=' ]
        return {
        };
    },
    onChange: function(e) {
        this.props.control.setCP(e.target.value);
        if(this.props.onUpdate != null)
            this.props.onUpdate();
    },
    render: function() {
        var disabled = this.props.keyActionHandler ? this.props.keyActionHandler.keyState === KeyType.NONE ? false : true : false;
        return (
            <select ref='ruleConditionSelector' className='formula logic selector cp' onChange={this.onChange} value={this.props.control.getCP()} disabled={disabled}>
                {this.cp.map(function(key) { return <option key={key} value={key}>{key}</option>; })}
            </select>
        )
    }
});
