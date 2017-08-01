require('../../../../css/jobdetail.css');
require('../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function() {
        this.props.dplBuilder.selectFormula('condition', null);
    },
    render: function () {
        var className = 'no-carrot metric-condition-btn';
        if(this.props.dplBuilder.dpl.error.from != null)
            className += ' error';
        else if (this.props.dplBuilder.formulaControl.type == 'condition')
            className += ' selected';

        return (
            <button className={className} style={{position:'absolute', left:'0', bottom:'0', marginLeft:'5px', marginBottom:'5px', padding:'5px'}} onClick={this.onClick}>
                <n.Icon icon='filter' size='large' />
            </button>
        );
    }
});