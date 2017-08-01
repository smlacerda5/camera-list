require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    onClick: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        if(this.props.onClick != null) this.props.onClick(e);
    },
    render: function() {
        return (
            <span className='formula-container blank' style={{position:'relative'}}>&nbsp;</span>
        )
    }
});