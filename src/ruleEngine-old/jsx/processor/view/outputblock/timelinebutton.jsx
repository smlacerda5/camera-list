require('../../../../css/jobdetail.css');
require('../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function() {
        this.props.dplBuilder.selectFormula('timeline', null);
    },
    render: function () {
        var className = 'no-carrot metric-condition-btn';
        if (this.props.dplBuilder.formulaControl.type == 'timeline')
            className += ' selected';

        return (
            <button className={className} style={{position:'absolute', right:'0', bottom:'0', marginRight:'5px', marginBottom:'5px', padding:'5px'}} onClick={this.onClick}>
                <n.Icon icon='clock-o' size='large' />
            </button>
        );
    }
});
