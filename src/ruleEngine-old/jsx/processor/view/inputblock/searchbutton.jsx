require('../../../../css/jobdetail.css');
require('../../../../css/global.css');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onClick: function(e) {
        if(this.props.onClick != null)
            this.props.onClick(e);
    },
    render: function () {
        return (
            <button className={'no-carrot metric-condition-btn'} style={{position:'absolute', left:'0', bottom:'0', marginLeft:'5px', marginBottom:'5px', padding:'5px'}} onClick={this.onClick}>
                <n.Icon icon='search-plus' size='large' />
            </button>
        );
    }
});